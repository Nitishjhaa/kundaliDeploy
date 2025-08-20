const swe = require('swisseph');
const moment = require('moment-timezone');

swe.swe_set_ephe_path(__dirname + '/ephe');

function calculateAscendant(dobString, timeString, timezone,latitude,longitude) {
  return new Promise((resolve, reject) => {
    const istTime = moment.tz(`${dobString} ${timeString}`, timezone);
    const utcTime = istTime.clone().utc();
    const year = utcTime.year();
    const month = utcTime.month() + 1;
    const day = utcTime.date();
    const hour = utcTime.hour() + utcTime.minute() / 60 + utcTime.second() / 3600;

    // const latitude = 28.6139;
    // const longitude = 77.2090;

    const jd = swe.swe_julday(year, month, day, hour, swe.SE_GREG_CAL);

    swe.swe_houses(jd, latitude, longitude, 'P', (result) => {
      if (!result || !result.ascendant) {
        return reject("Error calculating Ascendant.");
      }

      const tropicalAsc = result.ascendant;
      const ayanamsa = swe.swe_get_ayanamsa(jd);

      let siderealAsc = tropicalAsc - ayanamsa;
      if (siderealAsc < 0) siderealAsc += 360;

      resolve({
        ascendant: siderealAsc.toFixed(2), 
      });
    });
  });
}


module.exports = calculateAscendant;