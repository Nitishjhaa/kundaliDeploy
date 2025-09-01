// kundaliResponce.js — Full controller, Swiss Ephemeris for planets + YOUR calculateAscendant for lagna

const moment = require('moment-timezone');
const swe = require('swisseph');

const {
  zodiacFromDegrees,
  houseOfPlanet,
  getNakshatra,
  getRashiSwami
} = require('../utils/astrology');

const {
  checkManglik,
  cheakMool,
  chandalYoga,
  kaalSarpYog,
  grahanYog,
  pitruRin,
  matruRin
} = require('../utils/Dosh');

const { getPanchangDetails } = require('../utils/panchang');
const { findNakshatraByNumber } = require('../controller/findNakshatra');
const { findLagan } = require('../controller/findLagan');
const { findKaalSarpDataByName } = require('../controller/findKaalsarpYog');
const {
  findInfoAboutSunInNakshatra,
  findInfoAboutMoonInNakshatra,
  findInfoAboutMercuryInNakshatra,
  findInfoAboutVenusInNakshatra,
  findInfoAboutMarsInNakshatra,
  findInfoAboutJupiterInNakshatra,
  findInfoAboutSaturnInNakshatra,
  findInfoAboutRahuInNakshatra,
  findInfoAboutKetuInNakshatra
} = require('../controller/FindNakInPlanets');

const { getChandraData } = require('../utils/chanderKundali');
const { getNavamsaChart } = require('../utils/navmashKundali');
const calculateDashaTree = require('../utils/dasha');
const { DateTime } = require('luxon');

// ✅ Use your perfected ascendant util (calculateLagan)
const calculateAscendant = require('../utils/calculateLagan');

const { getSunData } = require('../utils/sunKundali');
const { getHouseLordsWithPositions } = require('../utils/lagneshAndOtherGrah');
const { getLatLon } = require('../utils/getLat&Lon');
const { getDrishtiFromHouses, analyzeAscendantAndPlanets, allOtherYogas } = require('../utils/yogas');
const { getAshubhPlanetRemedies, kaalSarpYogaRemidies } = require('../utils/getRemedies');
const { preditionOnDate } = require('../utils/preditionOnDate');
const { calculatePlanetHouses } = require('../utils/grahNumber');
const { sunWithOtherPlanets } = require('../utils/sunWithOtherPlanet');
const { rashiFaladesh } = require('../utils/rashiPredition');
const { gemForLagan } = require('../utils/gemsForLagan');
const { getGhaatChakraByRashi } = require('../utils/ghaatChakar');
const calculateMoolankAndBhagyank = require('../utils/moolankAndBhagyank');



// ----------------------------------
// Swiss Ephemeris setup
// ----------------------------------
swe.swe_set_ephe_path(__dirname + '/ephe');
swe.swe_set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);

const FLAGS_SID = swe.SEFLG_SWIEPH | swe.SEFLG_SIDEREAL | swe.SEFLG_SPEED;
const FLAGS_TROP = swe.SEFLG_SWIEPH | swe.SEFLG_SPEED;

const RASHIS = [
  "Mesha","Vrishabha","Mithuna","Karka","Simha","Kanya",
  "Tula","Vrischika","Dhanu","Makara","Kumbha","Meena"
];

const NAKS = [
  "Ashwini","Bharani","Krittika","Rohini","Mrigashirsha","Ardra","Punarvasu",
  "Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra",
  "Swati","Vishakha","Anuradha","Jyeshtha","Moola","Purva Ashadha","Uttara Ashadha",
  "Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"
];

const PLANETS = {
  Sun: swe.SE_SUN,
  Moon: swe.SE_MOON,
  Mars: swe.SE_MARS,
  Mercury: swe.SE_MERCURY,
  Jupiter: swe.SE_JUPITER,
  Venus: swe.SE_VENUS,
  Saturn: swe.SE_SATURN,
  Rahu: swe.SE_MEAN_NODE,
  Ketu: swe.SE_MEAN_NODE // compute as opposite of Rahu
};

const norm360 = x => (x % 360 + 360) % 360;

function toDMS(deg) {
  const d = Math.floor(deg);
  const mFloat = (deg - d) * 60;
  const m = Math.floor(mFloat);
  const s = ((mFloat - m) * 60);
  return { d, m, s: +s.toFixed(2) };
}

function anshToDMSStr(anshDeg) {
  let d = Math.floor(anshDeg);
  let mFloat = (anshDeg - d) * 60;
  let m = Math.floor(mFloat);
  let s = Math.round((mFloat - m) * 60);
  if (s === 60) { s = 0; m += 1; }
  if (m === 60) { m = 0; d += 1; }
  if (d === 30) { d = 29; m = 59; s = 59; }
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d)}:${pad(m)}:${pad(s)}`;
}

function rashiIndex(lon) { return Math.floor(norm360(lon) / 30); }
function ansh(lon) { return norm360(lon) % 30; }

function nakshatraPada(lon) {
  const EPS = 1e-7;
  const totalMin = norm360(lon) * 60 + EPS;
  const nakIndex = Math.floor(totalMin / 800);        // 13°20' = 800'
  const pada = Math.floor((totalMin % 800) / 200) + 1; // 3°20'  = 200'
  return { nakshatra: NAKS[nakIndex], nakIndex, nakPada: pada };
}

function jdFromLocal(d, t, tz) {
  const m = moment.tz(`${d} ${t}`, tz).utc();
  const hour = m.hour() + m.minute()/60 + m.second()/3600;
  return swe.swe_julday(m.year(), m.month()+1, m.date(), hour, swe.SE_GREG_CAL);
}

function sweCalcPromised(jd, body, flags) {
  return new Promise((res, rej) => {
    swe.swe_calc_ut(jd, body, flags, out => {
      if (out && out.error) return rej(out.error);
      return res(out);
    });
  });
}

// ----------------------------------
// Calculate planets (tropical + sidereal) AND use YOUR calculateAscendant for lagna
// ----------------------------------
async function calculateAllWithAnsh(dob, time, tz, lat, lon) {
  const JD = jdFromLocal(dob, time, tz);

  // compute planets (tropical + sidereal)
  const rawPlanets = {};
  for (const [name, code] of Object.entries(PLANETS)) {
    const tropOut = await sweCalcPromised(JD, code, FLAGS_TROP);
    const sidOut = await sweCalcPromised(JD, code, FLAGS_SID);

    rawPlanets[name] = {
      tropLon: norm360(tropOut.longitude),
      sidLon: norm360(sidOut.longitude),
      speed: sidOut.speed
    };
  }

  // ensure Ketu = Rahu + 180
  if (rawPlanets.Rahu && rawPlanets.Ketu) {
    rawPlanets.Ketu.sidLon = norm360(rawPlanets.Rahu.sidLon + 180);
    rawPlanets.Ketu.tropLon = norm360(rawPlanets.Rahu.tropLon + 180);
  }

  // -------------------------
  // Use YOUR calculateAscendant util (trusted)
  // -------------------------
  const ascResult = await calculateAscendant(dob, time, tz, lat, lon);
  const asc_sid = parseFloat(ascResult.ascendant); // sidereal ascendant degrees
  const ascZodiac = zodiacFromDegrees(asc_sid);
  const ascZodiacIndex = ascZodiac.index;
  const ascZodiacName = ascZodiac.sign;
  const ascZodiacNumber = ascZodiac.ascendant || ascZodiac.index; // best-effort compatibility

  // build structured results with placements based on YOUR ascendant
  const results = {};
  for (const [name, payload] of Object.entries(rawPlanets)) {
    const L_sid = payload.sidLon;
    const L_trop = payload.tropLon;

    const ri = rashiIndex(L_sid);
    const a = ansh(L_sid);
    const nak = nakshatraPada(L_sid);

    // house placement using ascZodiacIndex (your houseOfPlanet util)
    const placement = houseOfPlanet(L_sid, ascZodiacIndex);

    results[name] = {
      tropical: +L_trop.toFixed(6),
      sidereal: +L_sid.toFixed(6),
      placement,
      anshTropical: +(norm360(L_trop) % 30).toFixed(6),
      anshSidereal: +a.toFixed(6),
      anshDMS: toDMS(a),
      anshStr: anshToDMSStr(a),
      nakshatra: { name: nak.nakshatra, index: nak.nakIndex, pada: nak.nakPada },
      rashi: RASHIS[ri],
      speed: payload.speed
    };
  }

  // Ascendant object (from YOUR util)
  const ascAnsh = ansh(asc_sid);
  const ascNak = nakshatraPada(asc_sid);
  results.Ascendant = {
    longitude: +asc_sid.toFixed(6),
    rashi: RASHIS[rashiIndex(asc_sid)],
    ansh: +ascAnsh.toFixed(6),
    anshDMS: toDMS(ascAnsh),
    anshStr: anshToDMSStr(ascAnsh),
    nakshatra: { name: ascNak.nakshatra, index: ascNak.nakIndex, pada: ascNak.nakPada }
  };

  return { JD, asc_sid, ascZodiac, ascZodiacIndex, ascZodiacName, ascZodiacNumber, results };
}

// ----------------------------------
// Main Controller (keeps all original downstream logic intact)
// ----------------------------------
const kundaliResponce = async (req, res) => {
  const { birthDate, birthTime, timeZone, country, city, gender, fullName } = req.body;
  if (!birthDate || !birthTime || !timeZone || !gender || !city) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    // coordinates
    const coordinates = getLatLon(country, city);
    const lat = coordinates.lat;
    const lon = coordinates.lon;

    // panchang
    const panchangData = getPanchangDetails(birthDate, birthTime, lat, lon);
    const hindiMonths = panchangData.tithi.name;
    const paksha = panchangData.paksha;

    // prediction
    const prediction = preditionOnDate({ birthDate });

    // Swiss Ephemeris + YOUR Ascendant
    const {
      JD,
      asc_sid,
      ascZodiac,
      ascZodiacIndex,
      ascZodiacName,
      ascZodiacNumber,
      results: planetResults
    } = await calculateAllWithAnsh( birthDate, birthTime, timeZone, lat, lon);

    // derive placements & many dependent values as before (using sidereal values)
    const sunSid = planetResults.Sun.sidereal;
    const moonSid = planetResults.Moon.sidereal;
    const mercurySid = planetResults.Mercury.sidereal;
    const venusSid = planetResults.Venus.sidereal;
    const marsSid = planetResults.Mars.sidereal;
    const jupiterSid = planetResults.Jupiter.sidereal;
    const saturnSid = planetResults.Saturn.sidereal;
    const rahuSid = planetResults.Rahu.sidereal;
    const ketuSid = planetResults.Ketu.sidereal;

    const sunPlacement = planetResults.Sun.placement;
    const moonPlacement = planetResults.Moon.placement;
    const mercuryPlacement = planetResults.Mercury.placement;
    const venusPlacement = planetResults.Venus.placement;
    const marsPlacement = planetResults.Mars.placement;
    const jupiterPlacement = planetResults.Jupiter.placement;
    const saturnPlacement = planetResults.Saturn.placement;
    const rahuPlacement = planetResults.Rahu.placement;
    const ketuPlacement = planetResults.Ketu.placement;

    // Nakshatra objects (using your util that expects sidereal degrees)
    const sunNak = getNakshatra(sunSid);
    const moonNak = getNakshatra(moonSid);
    const mercuryNak = getNakshatra(mercurySid);
    const venusNak = getNakshatra(venusSid);
    const marsNak = getNakshatra(marsSid);
    const jupiterNak = getNakshatra(jupiterSid);
    const saturnNak = getNakshatra(saturnSid);
    const rahuNak = getNakshatra(rahuSid);
    const ketuNak = getNakshatra(ketuSid);

    const sunNakName = sunNak.nakName;
    const moonNakName = moonNak.nakName;
    const marsNakName = marsNak.nakName;
    const mercuryNakName = mercuryNak.nakName;
    const jupiterNakName = jupiterNak.nakName;
    const venusNakName = venusNak.nakName;
    const saturnNakName = saturnNak.nakName;
    const rahuNakName = rahuNak.nakName;
    const ketuNakName = ketuNak.nakName;

    // helper values used downstream
    const moonNakIndex = moonNak.nakIndex;
    const moonNakCharan = moonNak.nakPada;

    // find nakshatra DB info & lagan info
    const nakData = await findNakshatraByNumber(moonNakIndex);
    const LaganData = await findLagan(ascZodiacName);
    const ashubhGrah = LaganData.ashubh;
    const maarakGrah = LaganData.maarak;

    // Houses numbers
    const sunHouse = sunPlacement.house;
    const moonHouse = moonPlacement.house;
    const marsHouse = marsPlacement.house;
    const mercuryHouse = mercuryPlacement.house;
    const jupiterHouse = jupiterPlacement.house;
    const venusHouse = venusPlacement.house;
    const saturnHouse = saturnPlacement.house;
    const rahuHouse = rahuPlacement.house;
    const ketuHouse = ketuPlacement.house;

    // get paaye
    const getPaayeByRashi = (moonHouse) => {
      if (moonHouse === 1 || moonHouse === 6 || moonHouse === 11) return "Gold / सोना";
      if (moonHouse === 2 || moonHouse === 5 || moonHouse === 9) return "Silver / चाँदी";
      if (moonHouse === 3 || moonHouse === 7 || moonHouse === 10) return "Copper / ताँबा";
      if (moonHouse === 4 || moonHouse === 8 || moonHouse === 12) return "Iron / लोहा";
    };

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[new Date(birthDate).getUTCDay()];
    const daysInHindi = (dayOfWeek) => {
      switch (dayOfWeek) {
        case "Sunday": return "रविवार";
        case "Monday": return "सोमवार";
        case "Tuesday": return "मंगलवार";
        case "Wednesday": return "बुधवार";
        case "Thursday": return "गुरुवार";
        case "Friday": return "शुक्रवार";
        case "Saturday": return "शनिवार";
        default: return "अमान्य दिन";
      }
    };

    // Remedies, yogas, drishti etc (reuse existing utils)
    const kaalSurpName = kaalSarpYog(sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse);

    const infoOfKaalSurpYog = await findKaalSarpDataByName(kaalSurpName);

    const sunNakPaadInfo = await findInfoAboutSunInNakshatra(sunNak);
    const moonNakPaadInfo = await findInfoAboutMoonInNakshatra(moonNak);
    const marsNakPaadInfo = await findInfoAboutMarsInNakshatra(marsNak);
    const mercuryNakPaadInfo = await findInfoAboutMercuryInNakshatra(mercuryNak);
    const jupiterNakPaadInfo = await findInfoAboutJupiterInNakshatra(jupiterNak);
    const venusNakPaadInfo = await findInfoAboutVenusInNakshatra(venusNak);
    const saturnNakPaadInfo = await findInfoAboutSaturnInNakshatra(saturnNak);
    const rahuNakPaadInfo = await findInfoAboutRahuInNakshatra(rahuNak);
    const ketuNakPaadInfo = await findInfoAboutKetuInNakshatra(ketuNak);

    const remidiesOfKaalSarpYoga = await kaalSarpYogaRemidies(sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse);

    const rashiName = moonPlacement.zodiac;
    const remedy = await getAshubhPlanetRemedies({
      ashubhGrah, maarakGrah, sunHouse, marsHouse, moonHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse
    });

    // navmansh input structure (keep same shape)
    const planetsForNav = {
      sun: { placement: { zodiac: sunPlacement.zodiac }, anshSidereal: planetResults.Sun.anshSidereal },
      moon: { placement: { zodiac: moonPlacement.zodiac }, anshSidereal: planetResults.Moon.anshSidereal },
      mars: { placement: { zodiac: marsPlacement.zodiac }, anshSidereal: planetResults.Mars.anshSidereal },
      mercury: { placement: { zodiac: mercuryPlacement.zodiac }, anshSidereal: planetResults.Mercury.anshSidereal },
      jupiter: { placement: { zodiac: jupiterPlacement.zodiac }, anshSidereal: planetResults.Jupiter.anshSidereal },
      venus: { placement: { zodiac: venusPlacement.zodiac }, anshSidereal: planetResults.Venus.anshSidereal },
      saturn: { placement: { zodiac: saturnPlacement.zodiac }, anshSidereal: planetResults.Saturn.anshSidereal },
      rahu: { placement: { zodiac: rahuPlacement.zodiac }, anshSidereal: planetResults.Rahu.anshSidereal },
      ketu: { placement: { zodiac: ketuPlacement.zodiac }, anshSidereal: planetResults.Ketu.anshSidereal }
    };

    const ascSign = ascZodiac.sign;
    const ascDegrees = asc_sid;

    const navmanshKundaliData = getNavamsaChart(planetsForNav, ascSign, ascDegrees);

    // dasha
    const moonSiderealDeg = moonSid; // full sidereal position of Moon
    const nakshatraIndex = moonNak.nakIndex; // Jyeshtha
    const nakshatraDegree = moonSiderealDeg % 13.333333333; // ⬅️ critical fix

    const birthDateTime = DateTime.fromISO(`${birthDate}T${birthTime}`, { zone: timeZone });

    const planetPositions = {
      Sun: sunHouse,
      Moon: moonHouse,
      Mars: marsHouse,
      Mercury: mercuryHouse,
      Jupiter: jupiterHouse,
      Venus: venusHouse,
      Saturn: saturnHouse,
      Rahu: rahuHouse,
      Ketu: ketuHouse
    };

    const bhaveshWithPosition = getHouseLordsWithPositions(ascZodiacIndex, planetPositions);

    const {
      Lagnesh, LagneshPosition, Dwityesh, DwityeshPosition, Trityesh, TrityeshPosition,
      Chaturthesh, ChaturtheshPosition, Panchamesh, PanchameshPosition, Shashthesh, ShashtheshPosition,
      Saptamesh, SaptameshPosition, Ashtamesh, AshtameshPosition, Navamesh, NavameshPosition,
      Dashmesh, DashmeshPosition, Ekadashesh, EkadasheshPosition, Dwadashesh, DwadasheshPosition
    } = bhaveshWithPosition;

    const bhaavResult = getDrishtiFromHouses({
      sunHouse, marsHouse, moonHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse
    });

    const planetBhaavs = {
      sunRashi: sunHouse, marsRashi: marsHouse, moonRashi: moonHouse,
      mercuryRashi: mercuryHouse, jupiterRashi: jupiterHouse, venusRashi: venusHouse,
      saturnRashi: saturnHouse, rahuRashi: rahuHouse, ketuRashi: ketuHouse
    };

    const grahNumber = calculatePlanetHouses(ascZodiacIndex, planetBhaavs);

    const gems = gemForLagan(ascZodiacIndex);

    const {
      sunRashi, marsRashi, moonRashi, mercuryRashi,
      jupiterRashi, venusRashi, saturnRashi, rahuRashi, ketuRashi
    } = grahNumber;

    const sunDristi = bhaavResult.Sun.purnDrishti;
    const moonDristi = bhaavResult.Moon.purnDrishti;
    const marsDristi = bhaavResult.Mars.purnDrishti;
    const mercuryDristi = bhaavResult.Mercury.purnDrishti;
    const jupiterDristi = bhaavResult.Jupiter.purnDrishti;
    const venusDristi = bhaavResult.Venus.purnDrishti;
    const saturnDristi = bhaavResult.Saturn.purnDrishti;
    const rahuDristi = bhaavResult.Rahu.purnDrishti;
    const ketuDristi = bhaavResult.Ketu.purnDrishti;

    const laganFaladesh = {
      ascZodiacNumber: ascZodiacIndex,
      sunHouse, marsHouse, moonHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse
    };

    const ascAndotherPlanetTatva = analyzeAscendantAndPlanets(laganFaladesh);

    const allOtherYoga = allOtherYogas({
      Lagnesh, Dwityesh, Trityesh, Chaturthesh, Panchamesh, Shashthesh, Saptamesh, Ashtamesh,
      Navamesh, Dashmesh, Ekadashesh, Dwadashesh, LagneshPosition, DwityeshPosition, TrityeshPosition,
      ChaturtheshPosition, PanchameshPosition, ShashtheshPosition, SaptameshPosition, AshtameshPosition,
      NavameshPosition, DashmeshPosition, EkadasheshPosition, DwadasheshPosition,
      sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse,
      sunRashi, marsRashi, moonRashi, mercuryRashi, jupiterRashi, venusRashi, saturnRashi, rahuRashi, ketuRashi,
      birthDate, birthTime, sunDristi, moonDristi, marsDristi, mercuryDristi, jupiterDristi, venusDristi, saturnDristi, rahuDristi, ketuDristi,
      ascZodiacIndex, hindiMonths, paksha
    });

    const sunYuties = sunWithOtherPlanets(sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse);

    const rashiFaladeshdisc = rashiFaladesh(moonRashi);

    const planetRoles = {
      Lagnesh: bhaveshWithPosition.Lagnesh,
      Dwityesh: bhaveshWithPosition.Dwityesh,
      Trityesh: bhaveshWithPosition.Trityesh,
      Chaturthesh: bhaveshWithPosition.Chaturthesh,
      Panchamesh: bhaveshWithPosition.Panchamesh,
      Shashthesh: bhaveshWithPosition.Shashthesh,
      Saptamesh: bhaveshWithPosition.Saptamesh,
      Ashtamesh: bhaveshWithPosition.Ashtamesh,
      Navamesh: bhaveshWithPosition.Navamesh,
      Dashmesh: bhaveshWithPosition.Dashmesh,
      Ekadashesh: bhaveshWithPosition.Ekadashesh,
      Dwadashesh: bhaveshWithPosition.Dwadashesh
    };

    const mahadasha = calculateDashaTree(birthDateTime, nakshatraIndex, nakshatraDegree, planetRoles);

    const ghaatChakar = getGhaatChakraByRashi(moonRashi, gender);
    const calculateMoolankAndBhagyankNumber = calculateMoolankAndBhagyank(birthDate);

    // Final response assembly (keeps existing structure but with precise Swiss Ephemeris values + YOUR Ascendant)
    const result = {
      mahadasha: mahadasha,
      calculateMoolankAndBhagyankNum: calculateMoolankAndBhagyankNumber,
      ghaat: ghaatChakar,
      rashiInfo: rashiFaladeshdisc,
      sunYiti: sunYuties,
      gemsAccordingToLagan: gems,
      yogas: allOtherYoga,
      name: fullName,
      gender: gender,
      utcDateTime: moment.tz(`${birthDate} ${birthTime}`, timeZone).utc().toISOString(),
      julianDay: JD,
      lat: lat,
      lon: lon,
      city: city,
      country: country,
      timeZone: timeZone,
      paaye: getPaayeByRashi(moonHouse),
      panchanga: {
        dateOfBirth: birthDate,
        birthOfTime: birthTime,
        timeZone: timeZone,
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
      localSiderealTime: null, // LST previously computed manually; can be derived if needed
      // Planets (each contains tropical, sidereal, placement, ansh, anshDMS, anshStr, nakshatra, rashi)
      sun: {
        tropical: planetResults.Sun.tropical,
        sidereal: planetResults.Sun.sidereal,
        placement: sunPlacement,
        anshTropical: planetResults.Sun.anshTropical,
        anshSidereal: planetResults.Sun.anshSidereal,
        anshDMS: planetResults.Sun.anshDMS,
        anshStr: planetResults.Sun.anshStr,
        nakshatra: sunNak,
        sunNakPaadInfo,
        sunAscandentNumber: getSunData(ascZodiac.sign, sunHouse)
      },
      moon: {
        tropical: planetResults.Moon.tropical,
        sidereal: planetResults.Moon.sidereal,
        placement: moonPlacement,
        anshTropical: planetResults.Moon.anshTropical,
        anshSidereal: planetResults.Moon.anshSidereal,
        anshDMS: planetResults.Moon.anshDMS,
        anshStr: planetResults.Moon.anshStr,
        nakshatra: moonNak,
        moonNakPaadInfo,
        moonAscandentNumber: getChandraData(ascZodiac.sign, moonHouse),
        rashiPati: getRashiSwami(rashiName),
      },
      mercury: {
        tropical: planetResults.Mercury.tropical,
        sidereal: planetResults.Mercury.sidereal,
        placement: mercuryPlacement,
        anshTropical: planetResults.Mercury.anshTropical,
        anshSidereal: planetResults.Mercury.anshSidereal,
        anshDMS: planetResults.Mercury.anshDMS,
        anshStr: planetResults.Mercury.anshStr,
        nakshatra: mercuryNak,
        mercuryNakPaadInfo
      },
      venus: {
        tropical: planetResults.Venus.tropical,
        sidereal: planetResults.Venus.sidereal,
        placement: venusPlacement,
        anshTropical: planetResults.Venus.anshTropical,
        anshSidereal: planetResults.Venus.anshSidereal,
        anshDMS: planetResults.Venus.anshDMS,
        anshStr: planetResults.Venus.anshStr,
        nakshatra: venusNak,
        venusNakPaadInfo
      },
      mars: {
        tropical: planetResults.Mars.tropical,
        sidereal: planetResults.Mars.sidereal,
        placement: marsPlacement,
        anshTropical: planetResults.Mars.anshTropical,
        anshSidereal: planetResults.Mars.anshSidereal,
        anshDMS: planetResults.Mars.anshDMS,
        anshStr: planetResults.Mars.anshStr,
        nakshatra: marsNak,
        marsNakPaadInfo
      },
      jupiter: {
        tropical: planetResults.Jupiter.tropical,
        sidereal: planetResults.Jupiter.sidereal,
        placement: jupiterPlacement,
        anshTropical: planetResults.Jupiter.anshTropical,
        anshSidereal: planetResults.Jupiter.anshSidereal,
        anshDMS: planetResults.Jupiter.anshDMS,
        anshStr: planetResults.Jupiter.anshStr,
        nakshatra: jupiterNak,
        jupiterNakPaadInfo
      },
      saturn: {
        tropical: planetResults.Saturn.tropical,
        sidereal: planetResults.Saturn.sidereal,
        placement: saturnPlacement,
        anshTropical: planetResults.Saturn.anshTropical,
        anshSidereal: planetResults.Saturn.anshSidereal,
        anshDMS: planetResults.Saturn.anshDMS,
        anshStr: planetResults.Saturn.anshStr,
        nakshatra: saturnNak,
        saturnNakPaadInfo
      },
      rahu: {
        tropical: planetResults.Rahu.tropical,
        sidereal: planetResults.Rahu.sidereal,
        placement: rahuPlacement,
        anshTropical: planetResults.Rahu.anshTropical,
        anshSidereal: planetResults.Rahu.anshSidereal,
        anshDMS: planetResults.Rahu.anshDMS,
        anshStr: planetResults.Rahu.anshStr,
        nakshatra: rahuNak,
        rahuNakPaadInfo
      },
      ketu: {
        tropical: planetResults.Ketu.tropical,
        sidereal: planetResults.Ketu.sidereal,
        placement: ketuPlacement,
        anshTropical: planetResults.Ketu.anshTropical,
        anshSidereal: planetResults.Ketu.anshSidereal,
        anshDMS: planetResults.Ketu.anshDMS,
        anshStr: planetResults.Ketu.anshStr,
        nakshatra: ketuNak,
        ketuNakPaadInfo
      },
      NakshatraInfo: nakData,
      LaganData: LaganData,
      remedies: remedy,
      kaalSarpYogaRemidie: remidiesOfKaalSarpYoga,
      checkManglik: checkManglik(marsHouse),
      mool: cheakMool(moonNakName, moonNakCharan),
      chandalYoga: chandalYoga(jupiterHouse, rahuHouse),
      kaalSarpYog: kaalSurpName,
      grahanYog: grahanYog(sunHouse, moonHouse, rahuHouse, ketuHouse),
      pitruRin: pitruRin(sunHouse, saturnHouse, Dashmesh),
      matruRin: matruRin(moonHouse, saturnHouse, Chaturthesh),
      kaalsurpYogaInfo: infoOfKaalSurpYog,
      navmanshKundaliData: navmanshKundaliData,
      grahoKiDristi: bhaavResult,
      Tatva: ascAndotherPlanetTatva,
      Bhavesh: bhaveshWithPosition,
      predictionBasedOnDayAndMonths: prediction
    };

    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error', detail: err.toString() });
  }
};

module.exports = { kundaliResponce };
