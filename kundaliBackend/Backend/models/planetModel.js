const { planetposition } = require('astronomia');

// Load VSOP87B data files
const Mercury = new planetposition.Planet(require('../vsop87B/vsop87Bmercury.js'));
const Venus = new planetposition.Planet(require('../vsop87B/vsop87Bvenus.js'));
const Earth = new planetposition.Planet(require('../vsop87B/vsop87Bearth.js'));
const Mars = new planetposition.Planet(require('../vsop87B/vsop87Bmars.js'));
const Jupiter = new planetposition.Planet(require('../vsop87B/vsop87Bjupiter.js'));
const Saturn = new planetposition.Planet(require('../vsop87B/vsop87Bsaturn.js'));

module.exports = {
  Mercury,
  Venus,
  Earth,
  Mars,
  Jupiter,
  Saturn
};


// const swe = require('swisseph');
// const moment = require('moment-timezone');

// swe.swe_set_ephe_path(__dirname + '/../ephe'); // Path to ephemeris folder

// function getJulianDay(dob, time, timezone) {
//   const utcTime = moment.tz(`${dob} ${time}`, timezone).utc();
//   const year = utcTime.year();
//   const month = utcTime.month() + 1;
//   const day = utcTime.date();
//   const hour = utcTime.hour() + utcTime.minute() / 60 + utcTime.second() / 3600;
//   return swe.swe_julday(year, month, day, hour, swe.SE_GREG_CAL);
// }

// function calculatePlanet(jd, planetConst) {
//   return new Promise((resolve, reject) => {
//     swe.swe_calc_ut(jd, planetConst, swe.SEFLG_SWIEPH, (res) => {
//       if (res.error) return reject(res.error);

//       const tropical = res.longitude;
//       const ayanamsa = swe.swe_get_ayanamsa(jd);
//       let sidereal = tropical - ayanamsa;
//       if (sidereal < 0) sidereal += 360;

//       resolve({
//         tropical: tropical.toFixed(6),
//         sidereal: sidereal.toFixed(6)
//       });
//     });
//   });
// }

// // One function per planet
// async function Mercury(dob, time, timezone = 'Asia/Kolkata') {
//   const jd = getJulianDay(dob, time, timezone);
//   return calculatePlanet(jd, swe.SE_MERCURY);
// }

// async function Venus(dob, time, timezone = 'Asia/Kolkata') {
//   const jd = getJulianDay(dob, time, timezone);
//   return calculatePlanet(jd, swe.SE_VENUS);
// }

// async function Earth(dob, time, timezone = 'Asia/Kolkata') {
//   const jd = getJulianDay(dob, time, timezone);
//   return calculatePlanet(jd, swe.SE_EARTH);
// }

// async function Mars(dob, time, timezone = 'Asia/Kolkata') {
//   const jd = getJulianDay(dob, time, timezone);
//   return calculatePlanet(jd, swe.SE_MARS);
// }

// async function Jupiter(dob, time, timezone = 'Asia/Kolkata') {
//   const jd = getJulianDay(dob, time, timezone);
//   return calculatePlanet(jd, swe.SE_JUPITER);
// }

// async function Saturn(dob, time, timezone = 'Asia/Kolkata') {
//   const jd = getJulianDay(dob, time, timezone);
//   return calculatePlanet(jd, swe.SE_SATURN);
// }

// module.exports = {
//   Mercury,
//   Venus,
//   Earth,
//   Mars,
//   Jupiter,
//   Saturn
// };
