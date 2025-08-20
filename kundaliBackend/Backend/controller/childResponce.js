const moment = require('moment-timezone');
const { moonposition } = require('astronomia');
const { Mercury, Venus, Earth, Mars, Jupiter, Saturn } = require('../models/planetModel');
const { degrees, normalizeDeg, getAnsh, heliocentricToRectangular, geocentricLongitude } = require('../utils/helpers');
const { zodiacFromDegrees, houseOfPlanet, getNakshatra, getRashiSwami } = require('../utils/astrology');
const { checkManglik, cheakMool, kaalSarpYog,} = require('../utils/Dosh');
const { getPanchangDetails } = require('../utils/panchang');
const { findNakshatraByNumber } = require('../controller/findNakshatra');
const { getChandraData } = require('../utils/chanderKundali')
const calculateAscendant = require('../utils/calculateLagan');
const { getSunData } = require('../utils/sunKundali')
const { getLatLon } = require('../utils/getLat&Lon')
const { calculatePlanetHouses } = require('../utils/grahNumber');
const {getNaamAksharInHindi} = require('../utils/nameBasedOnNak')
const { getSixthDayLater } = require('../utils/childBirthRelatedAllFunction')

const childResponce = async (req, res) => {
  //  time is in formet of 24 hours 
  const { birthDate, birthTime, timeZone, country, city, gender, } = req.body;
  if (!birthDate || !birthTime || !timeZone || !gender || !city) {

    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    // getting coordinates
    const coordinates = getLatLon(country, city)

    const chati = getSixthDayLater(birthDate);

    // getting lat and lon
    const lat = coordinates.lat
    const lon = coordinates.lon

    const latitude = lat;
    const longitude = lon;

    // getting panchang data
    const panchangData = getPanchangDetails(birthDate, birthTime, lat, lon);

    // 1. Convert local birth date/time to UTC Date and compute Julian Day.
    const localDateTime = moment.tz(`${birthDate} ${birthTime}`, "YYYY-MM-DD HH:mm", timeZone);
    if (!localDateTime.isValid()) {
      return res.status(400).json({ error: 'Invalid date or time.' });
    }
    const utcDateTime = localDateTime.utc().toDate();
    const JD = utcDateTime.getTime() / 86400000 + 2440587.5;
    // 2. Compute Ascendant (Lagan)
    const IST_OFFSET_HOURS = 5.5;  // IST is UTC+5:30
    const IST_OFFSET_DEGREES = IST_OFFSET_HOURS * 15; // Convert hours to degrees

    let GMST = 280.46061837 + 360.98564736629 * (JD - 2451545.0);
    GMST = normalizeDeg(GMST);
    let LST = normalizeDeg(GMST + parseFloat(lon) + IST_OFFSET_DEGREES);  // Apply IST correction

    const LST_rad = LST * Math.PI / 180;
    const phi_rad = parseFloat(lat) * Math.PI / 180;
    const epsilon = 23.4392911 * Math.PI / 180;

    let asc_rad = Math.atan2(
      Math.sin(LST_rad) * Math.cos(epsilon) + Math.tan(phi_rad) * Math.sin(epsilon),
      Math.cos(LST_rad)
    );

    const resultOfAscandent = await calculateAscendant(birthDate, birthTime, timeZone, latitude, longitude);
    const asc_calc = resultOfAscandent.ascendant;
    const ascZodiac = zodiacFromDegrees(asc_calc);
    const ascZodiacIndex = ascZodiac.index;
    const ascZodiacName = ascZodiac.sign;
    const ascZodiacNumber = ascZodiac.ascendant


    // 3. Use a fixed ayanamsa (e.g., 24°) for tropical → sidereal conversion.
    /**
     * Computes a linear approximation of the Lahiri ayanamsa (in degrees)
     * for a given Julian Day (JD).
    *
    * The reference value at J2000.0 (JD = 2451545.0) is assumed to be 24.0°.
    * The ayanamsa is assumed to increase at a rate of about 0.014° per year.
    *
    * @param {number} JD - The Julian Day.
    * @return {number} The Lahiri ayanamsa in degrees.
    */
    function lahiriAyanamsa(JD) {
      // Calculate the number of years elapsed since J2000.0.
      const yearsSinceJ2000 = (JD - 2451545.0) / 365.2422;
      // Use a linear rate: about 0.014° per year.
      return 24.0 + yearsSinceJ2000 * 0.014;
    }

    const ayanamsa = lahiriAyanamsa(JD);
    // const ayanamsa = 24;

    // 4. Compute Sun's tropical ecliptic longitude.
    const posEarth = Earth.position2000(JD);
    let sunTrop = normalizeDeg(degrees(posEarth.lon) + 180);
    const sunSid = normalizeDeg(sunTrop - ayanamsa);

    // 5. Compute Moon's tropical ecliptic longitude.
    const moonPos = moonposition.position(JD);
    let moonTrop = normalizeDeg(degrees(moonPos.lon));
    const moonSid = normalizeDeg(moonTrop - ayanamsa);

    // 6. Compute geocentric longitudes for Mercury, Venus, Mars, Jupiter, Saturn.
    const mercuryTrop = geocentricLongitude(Mercury, Earth, JD);
    const mercurySid = normalizeDeg(mercuryTrop - ayanamsa);

    const venusTrop = geocentricLongitude(Venus, Earth, JD);
    const venusSid = normalizeDeg(venusTrop - ayanamsa);

    const marsTrop = geocentricLongitude(Mars, Earth, JD);
    const marsSid = normalizeDeg(marsTrop - ayanamsa);

    const jupiterTrop = geocentricLongitude(Jupiter, Earth, JD);
    const jupiterSid = normalizeDeg(jupiterTrop - ayanamsa);

    const saturnTrop = geocentricLongitude(Saturn, Earth, JD);
    const saturnSid = normalizeDeg(saturnTrop - ayanamsa);

    // 7. Compute Rahu (mean lunar node) and Ketu.
    const D = JD - 2451545.0;
    let N_val = 125.04452 - 0.05295377 * D;
    N_val = normalizeDeg(N_val);
    const rahuTrop = N_val;
    const rahuSid = normalizeDeg(rahuTrop - ayanamsa);
    const ketuSid = normalizeDeg(rahuSid + 180);

    // Determining House Placement
    const sunPlacement = houseOfPlanet(sunSid, ascZodiacIndex);
    const moonPlacement = houseOfPlanet(moonSid, ascZodiacIndex);
    const mercuryPlacement = houseOfPlanet(mercurySid, ascZodiacIndex);
    const venusPlacement = houseOfPlanet(venusSid, ascZodiacIndex);
    const marsPlacement = houseOfPlanet(marsSid, ascZodiacIndex);
    const jupiterPlacement = houseOfPlanet(jupiterSid, ascZodiacIndex);
    const saturnPlacement = houseOfPlanet(saturnSid, ascZodiacIndex);
    const rahuPlacement = houseOfPlanet(rahuSid, ascZodiacIndex);
    const ketuPlacement = houseOfPlanet(ketuSid, ascZodiacIndex);

    // 9. Get nakshatra details for each planet.
    const sunNak = getNakshatra(sunSid);
    const moonNak = getNakshatra(moonSid);
    const mercuryNak = getNakshatra(mercurySid);
    const venusNak = getNakshatra(venusSid);
    const marsNak = getNakshatra(marsSid);
    const jupiterNak = getNakshatra(jupiterSid);
    const saturnNak = getNakshatra(saturnSid);
    const rahuNak = getNakshatra(rahuSid);
    const ketuNak = getNakshatra(ketuSid);

    // Name of grah Nakshatra
    const moonNakName = moonNak.nakName;

    // getting ansh of moon
    const anshSidereal = getAnsh(moonSid);

    // planets placement numbers
    const sunHouse = sunPlacement.house;
    const moonHouse = moonPlacement.house;
    const marsHouse = marsPlacement.house;
    const mercuryHouse = mercuryPlacement.house;
    const jupiterHouse = jupiterPlacement.house;
    const venusHouse = venusPlacement.house;
    const saturnHouse = saturnPlacement.house;
    const rahuHouse = rahuPlacement.house;
    const ketuHouse = ketuPlacement.house;

    // getting paaye by rashi
    const getPaayeByRashi = (moonHouse) => {
      if (moonHouse === 1 || moonHouse === 6 || moonHouse === 11) {
        return "Gold / सोना"
      }
      else if (moonHouse === 2 || moonHouse === 5 || moonHouse === 9) {
        return "Silver / चाँदी"
      }
      else if (moonHouse === 3 || moonHouse === 7 || moonHouse === 10) {
        return "Copper / ताँबा"
      }
      else if (moonHouse === 4 || moonHouse === 8 || moonHouse === 12) {
        return "Iron / लोहा"
      }
    };

    // weekday name
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = days[new Date(birthDate).getUTCDay()];
    const daysInHindi = (dayOfWeek) => {
      switch (dayOfWeek) {
        case "Sunday":
          return "रविवार";
        case "Monday":
          return "सोमवार";
        case "Tuesday":
          return "मंगलवार";
        case "Wednesday":
          return "बुधवार";
        case "Thursday":
          return "गुरुवार";
        case "Friday":
          return "शुक्रवार";
        case "Saturday":
          return "शनिवार";
        default:
          return "अमान्य दिन";
      }
    };

    // nakshatra index number and charan
    const moonNakIndex = moonNak.nakIndex;
    const moonNakCharan = moonNak.nakPada;

    // Nakshatra Info
    const nakData = await findNakshatraByNumber(moonNakIndex);

    // kaal-surp yoga name
    const kaalSurpName = kaalSarpYog(sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse);

    // getting rashi name
    const rashiName = moonPlacement.zodiac;

    // ascandent sign and degree 
    const ascSign = ascZodiac.sign
    const ascDegrees = asc_calc

    // dasha
    const moonSiderealDeg = moonSid; // full sidereal position of Moon

    // start function
    const planetBhaavs = {
      sunRashi: sunHouse,
      marsRashi: marsHouse,
      moonRashi: moonHouse,
      mercuryRashi: mercuryHouse,
      jupiterRashi: jupiterHouse,
      venusRashi: venusHouse,
      saturnRashi: saturnHouse,
      rahuRashi: rahuHouse,
      ketuRashi: ketuHouse
    };

    const namakshar = getNaamAksharInHindi(moonNakName)

    // vaarshfal kundali
    // const varshphalInfo = await getVarshphalDetails(
    birthDate, sunSid, ascZodiacIndex, latitude, longitude, timeZone
    // );

    // Prepare the JSON response.
    const result = {
      chatiDate : chati,
      namaksharBasedOnNakshtra : namakshar,
      gender: gender,
      utcDateTime: utcDateTime.toISOString(),
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
      // Ascendant details:
      ascendant: {
        calculated: { degrees: asc_calc, zodiac: ascZodiac.sign },
      },
      localSiderealTime: LST,
      // Sun
      sun: {
        tropical: sunTrop,
        sidereal: sunSid,
        placement: sunPlacement,
        anshTropical: getAnsh(sunTrop),
        anshSidereal: getAnsh(sunSid),
        nakshatra: sunNak,
        sunAscandentNumber: getSunData(ascZodiac.sign, sunHouse)
      },
      // Moon
      moon: {
        tropical: moonTrop,
        sidereal: moonSid,
        placement: moonPlacement,
        anshTropical: getAnsh(moonTrop),
        anshSidereal: getAnsh(moonSid),
        nakshatra: moonNak,
        moonAscandentNumber: getChandraData(ascZodiac.sign, moonHouse),
        rashiPati: getRashiSwami(rashiName),
      },
      // Mercury
      mercury: {
        tropical: mercuryTrop,
        sidereal: mercurySid,
        placement: mercuryPlacement,
        anshTropical: getAnsh(mercuryTrop),
        anshSidereal: getAnsh(mercurySid),
        nakshatra: mercuryNak,
      },
      // Venus
      venus: {
        tropical: venusTrop,
        sidereal: venusSid,
        placement: venusPlacement,
        anshTropical: getAnsh(venusTrop),
        anshSidereal: getAnsh(venusSid),
        nakshatra: venusNak,
      },
      // Mars
      mars: {
        tropical: marsTrop,
        sidereal: marsSid,
        placement: marsPlacement,
        anshTropical: getAnsh(marsTrop),
        anshSidereal: getAnsh(marsSid),
        nakshatra: marsNak,
      },
      // Jupiter
      jupiter: {
        tropical: jupiterTrop,
        sidereal: jupiterSid,
        placement: jupiterPlacement,
        anshTropical: getAnsh(jupiterTrop),
        anshSidereal: getAnsh(jupiterSid),
        nakshatra: jupiterNak,
      },
      // Saturn
      saturn: {
        tropical: saturnTrop,
        sidereal: saturnSid,
        placement: saturnPlacement,
        anshTropical: getAnsh(saturnTrop),
        anshSidereal: getAnsh(saturnSid),
        nakshatra: saturnNak,
      },
      // Rahu & Ketu
      rahu: {
        tropical: rahuTrop,
        sidereal: rahuSid,
        placement: rahuPlacement,
        anshTropical: getAnsh(rahuTrop),
        anshSidereal: getAnsh(rahuSid),
        nakshatra: rahuNak,
      },
      ketu: {
        tropical: ketuSid,
        sidereal: ketuSid,
        placement: ketuPlacement,
        anshTropical: getAnsh(ketuSid),
        anshSidereal: getAnsh(ketuSid),
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
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { childResponce }