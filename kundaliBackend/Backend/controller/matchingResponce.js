// matchingResponce.js — Fixed with Swiss Ephemeris + YOUR calculateLagan ascendant

const moment = require('moment-timezone');
const swe = require('swisseph');

const { zodiacFromDegrees, houseOfPlanet, getNakshatra, getRashiSwami } = require('../utils/astrology');
const { checkManglik } = require('../utils/Dosh');
const { getChandraData } = require('../utils/chanderKundali');
const calculateAscendant = require('../utils/calculateLagan');
const { getSunData } = require('../utils/sunKundali');
const { getLatLon } = require('../utils/getLat&Lon');
const { getAnsh } = require('../utils/helpers');
const { analyzeAscendantAndPlanets } = require('../utils/yogas');
const { findMatchingNakshatra } = require('../utils/matchingResult');

// ---------------------------
// Swiss Ephemeris setup
// ---------------------------
swe.swe_set_ephe_path(__dirname + '/ephe');
swe.swe_set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);

const FLAGS_SID = swe.SEFLG_SWIEPH | swe.SEFLG_SIDEREAL | swe.SEFLG_SPEED;
const FLAGS_TROP = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED;

const PLANETS = {
  Sun: swe.SE_SUN,
  Moon: swe.SE_MOON,
  Mars: swe.SE_MARS,
  Mercury: swe.SE_MERCURY,
  Jupiter: swe.SE_JUPITER,
  Venus: swe.SE_VENUS,
  Saturn: swe.SE_SATURN,
  Rahu: swe.SE_MEAN_NODE,
  Ketu: swe.SE_MEAN_NODE // later opposite Rahu
};

const norm360 = x => (x % 360 + 360) % 360;

function jdFromLocal(dateStr, timeStr, tz) {
  const m = moment.tz(`${dateStr} ${timeStr}`, tz).utc();
  const hour = m.hour() + m.minute() / 60 + m.second() / 3600;
  return swe.swe_julday(m.year(), m.month() + 1, m.date(), hour, swe.SE_GREG_CAL);
}

function sweCalcPromised(jd, body, flags) {
  return new Promise((resolve, reject) => {
    swe.swe_calc_ut(jd, body, flags, out => {
      if (out && out.error) return reject(out.error);
      resolve(out);
    });
  });
}

async function calculatePlanetsAndAscendant(birthDate, birthTime, timeZone, lat, lon) {
  const JD = jdFromLocal(birthDate, birthTime, timeZone);

  // Planets tropical + sidereal
  const raw = {};
  for (const [name, code] of Object.entries(PLANETS)) {
    const trop = await sweCalcPromised(JD, code, FLAGS_TROP);
    const sid = await sweCalcPromised(JD, code, FLAGS_SID);
    raw[name] = {
      tropLon: norm360(trop.longitude),
      sidLon: norm360(sid.longitude),
      speed: sid.speed
    };
  }

  // Ketu opposite Rahu
  if (raw.Rahu && raw.Ketu) {
    raw.Ketu.sidLon = norm360(raw.Rahu.sidLon + 180);
    raw.Ketu.tropLon = norm360(raw.Rahu.tropLon + 180);
  }

  // Trusted ascendant
  const asc = await calculateAscendant(birthDate, birthTime, timeZone, lat, lon);
  const asc_sid = parseFloat(asc.ascendant);
  const ascZodiac = zodiacFromDegrees(asc_sid);
  const ascIndex = ascZodiac.index;

  // Structure placements
  const results = {};
  for (const [name, payload] of Object.entries(raw)) {
    const sid = payload.sidLon;
    const trop = payload.tropLon;
    const placement = houseOfPlanet(sid, ascIndex);
    results[name] = {
      tropical: +trop.toFixed(6),
      sidereal: +sid.toFixed(6),
      placement,
      anshTropical: getAnsh(trop),
      anshSidereal: getAnsh(sid),
      speed: payload.speed,
      nakshatra: getNakshatra(sid)
    };
  }

  return { JD, asc_sid, ascZodiac, ascIndex, results };
}

const matchingResponce = async (req, res) => {
  const { birthDate, birthTime, timeZone, country, city, gender, fullName } = req.body;
  if (!birthDate || !birthTime || !timeZone || !gender || !city) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const { lat, lon } = getLatLon(country, city);
    const localDT = moment.tz(`${birthDate} ${birthTime}`, "YYYY-MM-DD HH:mm", timeZone);
    if (!localDT.isValid()) return res.status(400).json({ error: 'Invalid date or time.' });
    const utcDateTime = localDT.utc().toDate();

    // Planets + Ascendant (Swiss Ephemeris Lahiri)
    const { JD, asc_sid, ascZodiac, ascIndex, results: P } =
      await calculatePlanetsAndAscendant(birthDate, birthTime, timeZone, lat, lon);

    // Houses
    const sunHouse = P.Sun.placement.house;
    const moonHouse = P.Moon.placement.house;
    const marsHouse = P.Mars.placement.house;
    const mercuryHouse = P.Mercury.placement.house;
    const jupiterHouse = P.Jupiter.placement.house;
    const venusHouse = P.Venus.placement.house;
    const saturnHouse = P.Saturn.placement.house;
    const rahuHouse = P.Rahu.placement.house;
    const ketuHouse = P.Ketu.placement.house;

    // Nakshatra info for Moon (matching logic)
    const moonNak = P.Moon.nakshatra;
    const nakName = moonNak.nakName;
    const charanNumber = moonNak.nakPada;

    const matchMatchingResult = findMatchingNakshatra(nakName, charanNumber);
    if (matchMatchingResult?.nakshatara === 'Vishakha' && gender === 'female') {
      matchMatchingResult.nadi = 'मध्य';
    }

    const laganFaladesh = {
      ascZodiacNumber: ascZodiac.index,
      sunHouse, marsHouse, moonHouse, mercuryHouse,
      jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse
    };

    const ascAndotherPlanetTatva = analyzeAscendantAndPlanets(laganFaladesh);

    const rashiName = P.Moon.placement.zodiac;

    // Response
    const result = {
      matchMatchingnakInfo: matchMatchingResult,
      name: fullName,
      gender,
      utcDateTime: utcDateTime.toISOString(),
      lat, lon, city, country, timeZone,
      panchanga: {
        dateOfBirth: birthDate,
        birthOfTime: birthTime,
        timeZone,
      },
      ascendant: {
        calculated: { degrees: asc_sid, zodiac: ascZodiac.sign },
      },
      sun: {
        ...P.Sun,
        sunAscandentNumber: getSunData(ascZodiac.sign, sunHouse)
      },
      moon: {
        ...P.Moon,
        moonAscandentNumber: getChandraData(ascZodiac.sign, moonHouse),
        rashiPati: getRashiSwami(rashiName),
      },
      mercury: P.Mercury,
      venus: P.Venus,
      mars: P.Mars,
      jupiter: P.Jupiter,
      saturn: P.Saturn,
      rahu: P.Rahu,
      ketu: P.Ketu,
      checkManglik: checkManglik(marsHouse),
      Tatva: ascAndotherPlanetTatva,
    };

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error', detail: err.toString() });
  }
};

module.exports = { matchingResponce };
