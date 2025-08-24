const swe = require('swisseph');
const moment = require('moment-timezone');

swe.swe_set_ephe_path(__dirname + '/ephe');
swe.swe_set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0);

const FLAGS = swe.SEFLG_SWIEPH | swe.SEFLG_SIDEREAL | swe.SEFLG_SPEED;

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
  Ketu: swe.SE_MEAN_NODE // set by +180° from Rahu
};

const norm360 = x => (x % 360 + 360) % 360;

function toDMS(deg){
  const d = Math.floor(deg);
  const mFloat = (deg - d) * 60;
  const m = Math.floor(mFloat);
  const s = ((mFloat - m) * 60);
  return { d, m, s: +s.toFixed(2) };
}

// convert 0–30 "ansh" to "DD:MM:SS"
function anshToDMSStr(anshDeg) {
  let d = Math.floor(anshDeg);
  let mFloat = (anshDeg - d) * 60;
  let m = Math.floor(mFloat);
  let s = Math.round((mFloat - m) * 60);

  // handle carry
  if (s === 60) { s = 0; m += 1; }
  if (m === 60) { m = 0; d += 1; }
  if (d === 30) { d = 29; m = 59; s = 59; }

  const pad = n => String(n).padStart(2, '0');
  return `${pad(d)}:${pad(m)}:${pad(s)}`;
}

function rashiIndex(lon){ return Math.floor(norm360(lon) / 30); }
function ansh(lon){ return norm360(lon) % 30; }

function nakshatraPada(lon){
  const EPS = 1e-7;
  const totalMin = norm360(lon) * 60 + EPS;
  const nakIndex = Math.floor(totalMin / 800);        // 13°20' = 800'
  const pada = Math.floor((totalMin % 800) / 200) + 1; // 3°20'  = 200'
  return { nakshatra: NAKS[nakIndex], pada };
}

function jdFromLocal(d, t, tz){
  const m = moment.tz(`${d} ${t}`, tz).utc();
  const hour = m.hour() + m.minute()/60 + m.second()/3600;
  return swe.swe_julday(m.year(), m.month()+1, m.date(), hour, swe.SE_GREG_CAL);
}

function planetSiderealLon(jd, p){
  return new Promise((res, rej)=>{
    swe.swe_calc_ut(jd, p, FLAGS, out => {
      if (out.error) return rej(out.error);
      res(norm360(out.longitude)); // already sidereal due to flags & mode
    });
  });
}

async function calculateAllWithAnsh(dob, time, tz, lat, lon){
  const jd = jdFromLocal(dob, time, tz);
  const results = {};

  // Planets
  for (const [name, code] of Object.entries(PLANETS)){
    let L = await planetSiderealLon(jd, code);
    if (name === 'Ketu') L = norm360(results['Rahu'].longitude + 180);

    const ri = rashiIndex(L);
    const a = ansh(L);

    results[name] = {
      rashi: RASHIS[ri],
      longitude: +L.toFixed(6),   // 0–360 sidereal
      ansh: +a.toFixed(6),        // 0–30 within rashi
      anshDMS: toDMS(a),
      anshStr: anshToDMSStr(a),   // formatted string
      ...nakshatraPada(L)
    };
  }

  // Lagna
  results.Ascendant = await new Promise((res, rej)=>{
    swe.swe_houses(jd, lat, lon, 'P', h => {
      if (!h) return rej('House calc error');
      const L = norm360(h.ascendant);
      const ri = rashiIndex(L);
      const a = ansh(L);
      res({
        rashi: RASHIS[ri],
        longitude: +L.toFixed(6),
        ansh: +a.toFixed(6),
        anshDMS: toDMS(a),
        anshStr: anshToDMSStr(a),
        ...nakshatraPada(L)
      });
    });
  });

  return results;
}

