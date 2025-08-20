const { matchingResponce } = require('./matchingResponce');
const { calculateGunMilanScore } = require('../utils/calculateMilanScore')
const { calculateTaraPoints } = require('../match-matching/tara');
const { getNonCompatibleNakshatrasInHindi, isMutuallyNonCompatible,hasSunSaturnRahuDosha } = require('../utils/nakshatraNonCompatibleMap')


const matchMatchingResponce = async (req, res) => {
  try {
    const { boy, girl } = req.body;

    if (!boy || !girl) {
      return res.status(400).json({ error: "Both boy and girl data are required." });
    }

    const makeFakeReqRes = (data) => {
      const fakeReq = { body: data };
      let jsonResult = null;
      const fakeRes = {
        status: (code) => ({
          json: (data) => {
            jsonResult = { status: code, data };
            return fakeRes;
          },
        }),
        json: (data) => {
          jsonResult = { status: 200, data };
        },
      };
      return { fakeReq, fakeRes, getResult: () => jsonResult.data };
    };

    // Get boy kundali
    const { fakeReq: boyReq, fakeRes: boyRes, getResult: getBoyResult } = makeFakeReqRes(boy);
    await matchingResponce(boyReq, boyRes);
    const boyData = getBoyResult();

    const boykootData = boyData.matchMatchingnakInfo;

    // Get girl kundali
    const { fakeReq: girlReq, fakeRes: girlRes, getResult: getGirlResult } = makeFakeReqRes(girl);
    await matchingResponce(girlReq, girlRes);
    const girlData = getGirlResult();
    const girlkootData = girlData.matchMatchingnakInfo

    const milan = calculateGunMilanScore(boykootData, girlkootData);


    const boyNakshatra = boyData.matchMatchingnakInfo.nakshatara
    const girlNakshatra = girlData.matchMatchingnakInfo.nakshatara

    const boyNon_compatibleNak = getNonCompatibleNakshatrasInHindi(boyNakshatra)
    const girlNon_compatibleNak = getNonCompatibleNakshatrasInHindi(girlNakshatra)

    const taraMilan = calculateTaraPoints(boyNakshatra, girlNakshatra);

    const boyAndGirlCompablity = isMutuallyNonCompatible(boyNakshatra, girlNakshatra)

    // boy sun,saturn and rahu house
    const boysunHouseNumber = boyData.sun.placement.house
    const boysaturnHouseNumber = boyData.saturn.placement.house
    const boyrahuHouseNumber = boyData.rahu.placement.house

    // girl sun,saturn and rahu house
    const girlsunHouseNumber = girlData.sun.placement.house
    const girlsaturnHouseNumber = girlData.saturn.placement.house
    const girlrahuHouseNumber = girlData.rahu.placement.house

    const boyManglikdoshvivad = hasSunSaturnRahuDosha(boysunHouseNumber,boysaturnHouseNumber,boyrahuHouseNumber)
    const girlManglikdoshvivad = hasSunSaturnRahuDosha(girlsunHouseNumber,girlsaturnHouseNumber,girlrahuHouseNumber)


    const totalMinal = milan.totalScore
    const taratotalPoint = taraMilan.points

    const finalPoints = totalMinal + taratotalPoint

    // Prepare match-making response

    return res.json({
      success: true,
      boy: boyData,
      girl: girlData,
      totalgan: milan,
      tara: taraMilan,
      totalMatchMatchingGun: finalPoints,
      boyNon_compatibleNakInfo:boyNon_compatibleNak ,
      girlNon_compatibleNakInfo:girlNon_compatibleNak,
      compablity:boyAndGirlCompablity,
      boysun_saturn_rahuposition:boyManglikdoshvivad,
      girlsun_saturn_rahuposition:girlManglikdoshvivad
    });
  } catch (error) {
    console.error("Match making error:", error);
    return res.status(500).json({ error: "Internal server error in match making." });
  }
};

module.exports = { matchMatchingResponce };
