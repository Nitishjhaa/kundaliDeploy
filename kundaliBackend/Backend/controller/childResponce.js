// childResponce.js — Fixed planets via Swiss Ephemeris + YOUR calculateLagan ascendant (Lahiri)

const moment = require('moment-timezone');
const swe = require('swisseph');

const { zodiacFromDegrees, houseOfPlanet, getNakshatra, getRashiSwami } = require('../utils/astrology');
const { checkManglik, cheakMool, kaalSarpYog } = require('../utils/Dosh');
const { getPanchangDetails } = require('../utils/panchang');
const { findNakshatraByNumber } = require('../controller/findNakshatra');
const { getChandraData } = require('../utils/chanderKundali');
const calculateAscendant = require('../utils/calculateLagan');
const { getSunData } = require('../utils/sunKundali');
const { getLatLon } = require('../utils/getLat&Lon');
const { getNaamAksharInHindi } = require('../utils/nameBasedOnNak');
const { getSixthDayLater } = require('../utils/childBirthRelatedAllFunction');
const { getAnsh } = require('../utils/helpers'); // uses your ansh util

// ---------------------------
// Swiss Ephemeris setup
// ---------------------------
swe.swe_set_ephe_path(__dirname + '/ephe');                 // make sure ephe files are here
swe.swe_set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);            // Lahiri ayanamsa (sidereal)
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
  Ketu: swe.SE_MEAN_NODE // later set opposite of Rahu
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

  // Your trusted ascendant
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
      anshTropical: +(norm360(trop) % 30).toFixed(6),
      anshSidereal: +(norm360(sid) % 30).toFixed(6),
      speed: payload.speed
    };
  }

  return { JD, asc_sid, ascZodiac, ascIndex, results };
}

const childResponce = async (req, res) => {
  const { birthDate, birthTime, timeZone, country, city, gender } = req.body;
  if (!birthDate || !birthTime || !timeZone || !gender || !city) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    // Coords & Panchang
    const { lat, lon } = getLatLon(country, city);
    const panchangData = getPanchangDetails(birthDate, birthTime, lat, lon);

    // Chhathi date
    const chati = getSixthDayLater(birthDate);

    // UTC & ISO
    const localDT = moment.tz(`${birthDate} ${birthTime}`, "YYYY-MM-DD HH:mm", timeZone);
    if (!localDT.isValid()) {
      return res.status(400).json({ error: 'Invalid date or time.' });
    }
    const utcDateTime = localDT.utc().toDate();

    // Planets (Swiss Ephemeris) + Ascendant (your util)
    const {
      JD,
      asc_sid,
      ascZodiac,
      ascIndex,
      results: P
    } = await calculatePlanetsAndAscendant(birthDate, birthTime, timeZone, lat, lon);

    // Placements
    const sunPlacement = P.Sun.placement;
    const moonPlacement = P.Moon.placement;
    const mercuryPlacement = P.Mercury.placement;
    const venusPlacement = P.Venus.placement;
    const marsPlacement = P.Mars.placement;
    const jupiterPlacement = P.Jupiter.placement;
    const saturnPlacement = P.Saturn.placement;
    const rahuPlacement = P.Rahu.placement;
    const ketuPlacement = P.Ketu.placement;

    // Houses
    const sunHouse = sunPlacement.house;
    const moonHouse = moonPlacement.house;
    const marsHouse = marsPlacement.house;
    const mercuryHouse = mercuryPlacement.house;
    const jupiterHouse = jupiterPlacement.house;
    const venusHouse = venusPlacement.house;
    const saturnHouse = saturnPlacement.house;
    const rahuHouse = rahuPlacement.house;
    const ketuHouse = ketuPlacement.house;

    // Nakshatras (sidereal degrees)
    const sunNak = getNakshatra(P.Sun.sidereal);
    const moonNak = getNakshatra(P.Moon.sidereal);
    const mercuryNak = getNakshatra(P.Mercury.sidereal);
    const venusNak = getNakshatra(P.Venus.sidereal);
    const marsNak = getNakshatra(P.Mars.sidereal);
    const jupiterNak = getNakshatra(P.Jupiter.sidereal);
    const saturnNak = getNakshatra(P.Saturn.sidereal);
    const rahuNak = getNakshatra(P.Rahu.sidereal);
    const ketuNak = getNakshatra(P.Ketu.sidereal);

    const moonNakName = moonNak.nakName;
    const moonNakIndex = moonNak.nakIndex;
    const moonNakCharan = moonNak.nakPada;

    // Name letter (Naam Akshar)
    const namakshar = getNaamAksharInHindi(moonNakName);

    // Nakshatra DB info
    const nakData = await findNakshatraByNumber(moonNakIndex);

    // Paaye by Moon house
    const getPaayeByRashi = (h) => {
      if (h === 1 || h === 6 || h === 11) return "Gold / सोना";
      if (h === 2 || h === 5 || h === 9) return "Silver / चाँदी";
      if (h === 3 || h === 7 || h === 10) return "Copper / ताँबा";
      if (h === 4 || h === 8 || h === 12) return "Iron / लोहा";
      return null;
    };

    // Day name
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const dayOfWeek = days[new Date(birthDate).getUTCDay()];
    const daysInHindi = (dow) => ({
      Sunday:"रविवार", Monday:"सोमवार", Tuesday:"मंगलवार", Wednesday:"बुधवार",
      Thursday:"गुरुवार", Friday:"शुक्रवार", Saturday:"शनिवार"
    })[dow] || "अमान्य दिन";

    // Rashi name from Moon placement
    const rashiName = moonPlacement.zodiac;

    // Kaal Sarp name
    const kaalSurpName = kaalSarpYog(
      sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse,
      venusHouse, saturnHouse, rahuHouse, ketuHouse
    );

    // Final JSON
    const result = {
      chatiDate: chati,
      namaksharBasedOnNakshtra: namakshar,
      gender,
      utcDateTime: utcDateTime.toISOString(),
      julianDay: JD,
      lat,
      lon,
      city,
      country,
      timeZone,
      paaye: getPaayeByRashi(moonHouse),
      panchanga: {
        dateOfBirth: birthDate,
        birthOfTime: birthTime,
        timeZone,
        ritu: panchangData.ritu,
        SouthIndiaMonths: panchangData.amantaMonth,
        NorthIndiaMonths: panchangData.purnimantaMonth,
        paksha: panchangData.paksha,
        tithi: panchangData.tithi.name,
        day: daysInHindi(dayOfWeek),
        yoga: panchangData.yoga,
        gan: panchangData.gana,
        guna: panchangData.guna,
      },
      ascendant: {
        calculated: { degrees: asc_sid, zodiac: ascZodiac.sign },
      },
      localSiderealTime: null, // if needed later, compute precisely
      // Sun
      sun: {
        tropical: P.Sun.tropical,
        sidereal: P.Sun.sidereal,
        placement: sunPlacement,
        anshTropical: getAnsh(P.Sun.tropical),
        anshSidereal: getAnsh(P.Sun.sidereal),
        nakshatra: sunNak,
        sunAscandentNumber: getSunData(ascZodiac.sign, sunHouse),
      },
      // Moon
      moon: {
        tropical: P.Moon.tropical,
        sidereal: P.Moon.sidereal,
        placement: moonPlacement,
        anshTropical: getAnsh(P.Moon.tropical),
        anshSidereal: getAnsh(P.Moon.sidereal),
        nakshatra: moonNak,
        moonAscandentNumber: getChandraData(ascZodiac.sign, moonHouse),
        rashiPati: getRashiSwami(rashiName),
      },
      // Mercury
      mercury: {
        tropical: P.Mercury.tropical,
        sidereal: P.Mercury.sidereal,
        placement: mercuryPlacement,
        anshTropical: getAnsh(P.Mercury.tropical),
        anshSidereal: getAnsh(P.Mercury.sidereal),
        nakshatra: mercuryNak,
      },
      // Venus
      venus: {
        tropical: P.Venus.tropical,
        sidereal: P.Venus.sidereal,
        placement: venusPlacement,
        anshTropical: getAnsh(P.Venus.tropical),
        anshSidereal: getAnsh(P.Venus.sidereal),
        nakshatra: venusNak,
      },
      // Mars
      mars: {
        tropical: P.Mars.tropical,
        sidereal: P.Mars.sidereal,
        placement: marsPlacement,
        anshTropical: getAnsh(P.Mars.tropical),
        anshSidereal: getAnsh(P.Mars.sidereal),
        nakshatra: marsNak,
      },
      // Jupiter
      jupiter: {
        tropical: P.Jupiter.tropical,
        sidereal: P.Jupiter.sidereal,
        placement: jupiterPlacement,
        anshTropical: getAnsh(P.Jupiter.tropical),
        anshSidereal: getAnsh(P.Jupiter.sidereal),
        nakshatra: jupiterNak,
      },
      // Saturn
      saturn: {
        tropical: P.Saturn.tropical,
        sidereal: P.Saturn.sidereal,
        placement: saturnPlacement,
        anshTropical: getAnsh(P.Saturn.tropical),
        anshSidereal: getAnsh(P.Saturn.sidereal),
        nakshatra: saturnNak,
      },
      // Rahu
      rahu: {
        tropical: P.Rahu.tropical,
        sidereal: P.Rahu.sidereal,
        placement: rahuPlacement,
        anshTropical: getAnsh(P.Rahu.tropical),
        anshSidereal: getAnsh(P.Rahu.sidereal),
        nakshatra: rahuNak,
      },
      // Ketu
      ketu: {
        tropical: P.Ketu.tropical,
        sidereal: P.Ketu.sidereal,
        placement: ketuPlacement,
        anshTropical: getAnsh(P.Ketu.tropical),
        anshSidereal: getAnsh(P.Ketu.sidereal),
        nakshatra: ketuNak,
      },
      NakshatraInfo: nakData,
      checkManglik: checkManglik(marsHouse),
      mool: cheakMool(moonNakName, moonNakCharan),
      kaalSarpYog: kaalSurpName,
    };

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error', detail: err.toString() });
  }
};

module.exports = { childResponce };
