const { gunScoreTables } = require('./matchMatchingtable');


function calculateGunMilanScore(boyData, girlData) {
  const scores = {
    varna: 0,
    vashya: 0,
    yoni: 0,
    grahaMaitri: 0,
    gana: 0,
    bhakoot: 0,
    nadi: 0
  };

  // Helper to safely get scores from nested tables
  const getScore = (table, boyVal, girlVal) =>
    table?.[boyVal]?.[girlVal] ?? 0;

  scores.varna = getScore(gunScoreTables.varna, boyData.varna, girlData.varna);
  scores.vashya = getScore(gunScoreTables.vashya, boyData.vashya, girlData.vashya);
  scores.yoni = getScore(gunScoreTables.yoni, boyData.yoni, girlData.yoni);
  scores.grahaMaitri = getScore(gunScoreTables.grahaMaitri, boyData.grahaMaitri, girlData.grahaMaitri);
  scores.gana = getScore(gunScoreTables.gana, boyData.gana, girlData.gana);
  scores.bhakoot = getScore(gunScoreTables.bhakoot, boyData.bhakoot, girlData.bhakoot);
  scores.nadi = getScore(gunScoreTables.nadi, boyData.nadi, girlData.nadi);

  // Optional: total score
  const total = Object.values(scores).reduce((sum, val) => sum + val, 0);

  return {
    individualScores: scores,
    totalScore: total
  };
}

module.exports = { calculateGunMilanScore }