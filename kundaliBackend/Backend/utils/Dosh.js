const checkManglik = (marsHouse) => {
    const manglikHouses = [1, 4, 7, 8, 12];
    const isManglik = manglikHouses.includes(marsHouse);

    if (isManglik) {
        return {
            type: "मंगलीक",
            status: "मांगलिक",
            definition: "मांगलिक दोष वैदिक ज्योतिष में तब बनता है जब मंगल ग्रह व्यक्ति की जन्म कुंडली के प्रथम, चतुर्थ, सप्तम, अष्टम या द्वादश भाव में स्थित होता है। यह दोष विवाहिक जीवन पर प्रभाव डाल सकता है। इस स्थिति में जन्म लेने वाले व्यक्ति को 'मांगलिक' कहा जाता है।"
        };
    } else {
        return {
            type: "मंगलीक नहीं",
            status: "की कुंडली में मंगलीक दोष नहीं",
            definition: "जिन लोगों की कुंडली में मंगल ग्रह 1, 4, 7, 8 या 12वें भाव में नहीं होता, उन्हें मांगलिक दोष रहित माना जाता है।"
        };
    }
};


const cheakMool = (moonNakName, charan) => {
    const moolNakshatraDefinitions = {
        "Ashwini,अश्विनी": {
            1: "अश्विनी नक्षत्र के पहले चरण में जन्म लेने पर पिता को कष्ट और धनहानि होती है",
            2: "अश्विनी नक्षत्र के दूसरे चरण में जन्म लेने पर जातक को स्वास्थ्य संबंधित समस्याएँ हो सकती है और ज़्यादा ख़र्चा होता है।",
            3: "अश्विनी नक्षत्र के तीसरे चरण में जन्म व्यक्ति के और पिता को आकस्मिक यात्रा करनी पड़ती है।",
            4: "अश्विनी नक्षत्र के चौथे चरण में जन्म से करियर में बाधाएँ संभव हैं।"
        },
        "Ashlesha,आश्लेषा": {
            1: "आश्लेषा नक्षत्र के पहले चरण में जन्म लेने से जातक को मानसिक तनाव का सामना करना पड़ सकता है।",
            2: "आश्लेषा नक्षत्र के दूसरे चरण में जन्म से पारिवारिक जीवन में कठिनाइयाँ आ सकती हैं।",
            3: "आश्लेषा नक्षत्र के तीसरे चरण में जन्म से माता-पिता के साथ मतभेद हो सकते हैं।",
            4: "आश्लेषा नक्षत्र के चौथे चरण में जन्म से स्वास्थ्य पर विशेष ध्यान देने की आवश्यकता होती है।"
        },
        "Magha,मघा": {
            1: "मघा नक्षत्र के पहले चरण में जन्म से जातक को पिता के साथ संबंधों में समस्या आ सकती है।",
            2: "मघा नक्षत्र के दूसरे चरण में जन्म लेने पर नौकरी में अस्थिरता हो सकती है।",
            3: "मघा नक्षत्र के तीसरे चरण में व्यवसायिक क्षेत्र में समस्याएँ हो सकती हैं।",
            4: "मघा नक्षत्र के चौथे चरण में जातक को संतान पक्ष से परेशानी हो सकती है।"
        },
        "Jyeshtha,ज्येष्ठा": {
            1: "ज्येष्ठा नक्षत्र के प्रथम चरण हो और मंगलवार भी उस दिन हो तो शिशु अपने बड़े भाई या स्त्री-जातक हो तो जेठ आदि के लिए घातक होता है। जन्म से मानसिक दबाव और संघर्ष देखने को मिल सकते हैं।",
            2: "ज्येष्ठा नक्षत्र के द्वितीय चरण में जन्म हो तो बड़े भाई या बहन अथवा मामा, चाचा को घातक, जातक को निर्णय लेने में कठिनाई हो सकती है।",
            3: "ज्येष्ठा नक्षत्र के तीसरे चरण में अगर जन्म हो तो पिता या माता को घातक होता है।।",
            4: "ज्येष्ठा नक्षत्र के चौथे चरण में जन्म हो तो भाग्यवान, परन्तु अपने स्वास्थ्य के लिए हानिकारक होता है।"
        },
        "Mula,मूल": {
            1: "मूल नक्षत्र के पहले चरण में जन्म से जीवन में अचानक परिवर्तन हो सकते हैं।",
            2: "मूल नक्षत्र के दूसरे चरण में व्यक्ति को बार-बार स्थान परिवर्तन का सामना करना पड़ सकता है।",
            3: "मूल नक्षत्र के तीसरे चरण में व्यवसायिक क्षेत्र में समस्याएँ हो सकती हैं।",
            4: "मूल नक्षत्र के चौथे चरण में जातक को संतान पक्ष से परेशानी हो सकती है।"
        },
        "Revati,रेवती": {
            1: "रेवती नक्षत्र के पहले चरण में जन्म लेने से ऐश्वर्यवान और सुखी होता है ",
            2: "रेवती नक्षत्र के दूसरे चरण में जन्म लेने से जातक धनी और अधिकार संपन्न होता है",
            3: "रेवती नक्षत्र के तीसरे चरण में जन्म लेने से सुख और साधनों से युक्त होता है",
            4: "रेवती नक्षत्र के चौथे चरण में जन्म लेने से अनेक प्रकार के कष्ट होते हैं"
        }
    };

    if (moolNakshatraDefinitions[moonNakName]?.[charan]) {
        return {
            status: "गण्डमूल दोष उपस्थित",
            definition: moolNakshatraDefinitions[moonNakName][charan],
        };
    }

    else {
        return {
            status: "गण्डमूल दोष अनुपस्थित",
            definition: ""
        };
    }
};



const chandalYoga = (jupiterHouse, rahuHouse) => {
    if (jupiterHouse === rahuHouse) {
        return "Chandaal-Yog Present"

    } else {
        return "Chandal-Yog Not Present"
    }
}

const grahanYog = (sunHouse, moonHouse, rahuHouse, ketuHouse) => {
    if (
        sunHouse === rahuHouse ||
        sunHouse === ketuHouse ||
        moonHouse === rahuHouse ||
        moonHouse === ketuHouse
    ) {
        return "Grahan Yog Present";
    }
    return "Grahan Yog Not Present";
};

const pitruRin = (sunHouse, saturnHouse, Dashmesh) => {

    if (sunHouse === saturnHouse) {
        return {
            status: "पितृ दोष उपस्थित",
            definition: " सूर्य-शनि की युति या संयुक्त प्रभाव हो तो पितृशाप सूर्य यदि अच्छे भाव में न होकर पाप प्रभाव में हो, तब पितृदोष की स्थिति बनती है। ऐसे में पिता-पुत्र में वैचारिक विरोध, मनोवृत्ति या वैमत्य बना ही रहता है। इनमें से से एक अत्यन्त मानसिक, शारीरिक या आर्थिक संकट से पीड़ित रहता है। दोषी ग्रह की स्थिति अनुसार ऋणात्मक या शापित दोष हो सकता है। यह पिता की मृत्यु के बाद श्राद्ध या पिंडदान की असंभावना से उत्पन्न हो सकता है। पुत्र जब तक पिता को पर्याप्त श्राद्ध आदि न करे, तब तक दानियों में से एक की मृत्यु न हो जाये या पुनर्जन्म का लेना समाप्त न हो जाये, तब तक शांति नहीं होती। इसके उपाय के लिए पिता व पुत्र को दूर या अलग-अलग रहना चाहिए (वैसे अपने कर्त्तव्य पूर्ण करें)। इससे पितृशमन हो जाता है।",
            remedies: ""

        }
    }
    else if (sunHouse === 10 && saturnHouse === 10) {
        return {
            status: "पितृ दोष उपस्थित",
            definition: " सूर्य-शनि की युति या संयुक्त प्रभाव दशम भाव में हो, तो पितृशाप सूर्य यदि अच्छे भाव में न होकर पाप प्रभाव में हो, तब पितृदोष की स्थिति बनती है। ऐसे में पिता-पुत्र में वैचारिक विरोध, मनोवृत्ति या वैमत्य बना ही रहता है। इनमें से से एक अत्यन्त मानसिक, शारीरिक या आर्थिक संकट से पीड़ित रहता है। दोषी ग्रह की स्थिति अनुसार ऋणात्मक या शापित दोष हो सकता है। यह पिता की मृत्यु के बाद श्राद्ध या पिंडदान की असंभावना से उत्पन्न हो सकता है। पुत्र जब तक पिता को पर्याप्त श्राद्ध आदि न करे, तब तक दानियों में से एक की मृत्यु न हो जाये या पुनर्जन्म का लेना समाप्त न हो जाये, तब तक शांति नहीं होती। इसके उपाय के लिए पिता व पुत्र को दूर या अलग-अलग रहना चाहिए (वैसे अपने कर्त्तव्य पूर्ण करें)। इससे पितृशमन हो जाता है।",
            remedies: ""
        }
    }
    else if (sunHouse === 10 && Dashmesh === "Saturn") {
        return {
            status: "पितृ दोष उपस्थित",
            definition: " सूर्य-शनि की युति या संयुक्त प्रभाव दशम भाव में हो, तो पितृशाप सूर्य यदि अच्छे भाव में न होकर पाप प्रभाव में हो, तब पितृदोष की स्थिति बनती है। ऐसे में पिता-पुत्र में वैचारिक विरोध, मनोवृत्ति या वैमत्य बना ही रहता है। इनमें से से एक अत्यन्त मानसिक, शारीरिक या आर्थिक संकट से पीड़ित रहता है। दोषी ग्रह की स्थिति अनुसार ऋणात्मक या शापित दोष हो सकता है। यह पिता की मृत्यु के बाद श्राद्ध या पिंडदान की असंभावना से उत्पन्न हो सकता है। पुत्र जब तक पिता को पर्याप्त श्राद्ध आदि न करे, तब तक दानियों में से एक की मृत्यु न हो जाये या पुनर्जन्म का लेना समाप्त न हो जाये, तब तक शांति नहीं होती। इसके उपाय के लिए पिता व पुत्र को दूर या अलग-अलग रहना चाहिए (वैसे अपने कर्त्तव्य पूर्ण करें)। इससे पितृशमन हो जाता है। लेकिन आपकी कुंडली में यह आंशिक है, इसलिए इसका प्रभाव कम होगा।",
            remedies: ""
        }
    }
    else {
        return { status: "पितृ दोष अनुपस्थित" }
    }
}
const matruRin = (moonHouse, saturnHouse, Chaturthesh) => {

    if (moonHouse === saturnHouse) {
        return {
            status: "मातृ दोष उपस्थित",
            definition: "चन्द्र-शनि की युति या संयुक्त प्रभाव हो तो मातृऋण का सूचक है। ऐसे में माता के साथ वैचारिक विरोध, मतभेद या वैमनस्य रहता है। साथ रहने पर माता या पुत्र में से कोई एक शारीरिक, मानसिक या आर्थिक रूप से पीड़ित रहता है। पारिवारिक प्रेम की वृद्धि तथा उन्नति बाधित होते हैं। दोनों में से एक की मृत्यु होने तक या पूर्वजन्म का ऋण चुकने तक यही स्थिति बनी रहती है; क्योंकि पूर्वजन्म का माता का ऋण इसका कारण होता है। उपाय के लिए कर्तव्यों का निर्वाह अवश्य करें, किन्तु माता व पुत्र एक घर में या एक छत के नीचे साथ-साथ न रहें। मातृदोष हो, तो चन्द्र विशेष रूप से पाप पीड़ित या निर्बल होता है। बुध या शुक्र भी समर्थ स्थिति में नहीं होते। चतुर्थ भाव या दूसरा या पांचवां भाव प्रभावित होते हैं (विशेषतः चौथा)। वहां राहु, केतु या शनि का कुप्रभाव रहता है।",
            remedies: ""

        }
    }
    else if (moonHouse === 4 && saturnHouse === 4) {
        return {
            status: "मातृ दोष उपस्थित",
            definition: "चन्द्र-शनि की युति या संयुक्त प्रभाव चतुर्थ भाव पर हो, तो मातृऋण का सूचक है। ऐसे में माता के साथ वैचारिक विरोध, मतभेद या वैमनस्य रहता है। साथ रहने पर माता या पुत्र में से कोई एक शारीरिक, मानसिक या आर्थिक रूप से पीड़ित रहता है। पारिवारिक प्रेम की वृद्धि तथा उन्नति बाधित होते हैं। दोनों में से एक की मृत्यु होने तक या पूर्वजन्म का ऋण चुकने तक यही स्थिति बनी रहती है; क्योंकि पूर्वजन्म का माता का ऋण इसका कारण होता है। उपाय के लिए कर्तव्यों का निर्वाह अवश्य करें, किन्तु माता व पुत्र एक घर में या एक छत के नीचे साथ-साथ न रहें। मातृदोष हो, तो चन्द्र विशेष रूप से पाप पीड़ित या निर्बल होता है। बुध या शुक्र भी समर्थ स्थिति में नहीं होते। चतुर्थ भाव या दूसरा या पांचवां भाव प्रभावित होते हैं (विशेषतः चौथा)। वहां राहु, केतु या शनि का कुप्रभाव रहता है।",
            remedies: ""
        }
    }
    else if (moonHouse === 4 && Chaturthesh === "Saturn") {
        return {
            status: "मातृ दोष उपस्थित",
            definition: "चन्द्र-शनि का संयुक्त प्रभाव चतुर्थ भाव पर हो, तो मातृऋण का सूचक है। ऐसे में माता के साथ वैचारिक विरोध, मतभेद या वैमनस्य रहता है। साथ रहने पर माता या पुत्र में से कोई एक शारीरिक, मानसिक या आर्थिक रूप से पीड़ित रहता है। पारिवारिक प्रेम की वृद्धि तथा उन्नति बाधित होते हैं। दोनों में से एक की मृत्यु होने तक या पूर्वजन्म का ऋण चुकने तक यही स्थिति बनी रहती है; क्योंकि पूर्वजन्म का माता का ऋण इसका कारण होता है। उपाय के लिए कर्तव्यों का निर्वाह अवश्य करें, किन्तु माता व पुत्र एक घर में या एक छत के नीचे साथ-साथ न रहें। मातृदोष हो, तो चन्द्र विशेष रूप से पाप पीड़ित या निर्बल होता है। बुध या शुक्र भी समर्थ स्थिति में नहीं होते। चतुर्थ भाव या दूसरा या पांचवां भाव प्रभावित होते हैं (विशेषतः चौथा)। वहां राहु, केतु या शनि का कुप्रभाव रहता है। लेकिन आपकी कुंडली में यह आंशिक है, इसलिए इसका प्रभाव कम होगा।",
            remedies: ""
        }
    }
    else {
        return { status: "मातृ दोष अनुपस्थित" }
    }
}

// const angaarakYog = (marsHouse, rahuHouse, saturnHouse) => {
//     if (marsHouse === rahuHouse || marsHouse === saturnHouse || rahuHouse === saturnHouse) {
//         return "Angaarak Yog"
//     }
//     else {
//         return "Not Angarak Yog"
//     }
// }

// const vaaniDosh = (rahuHouse) => {
//     if (rahuHouse === 2) {
//         return {
//             status: "वाणी दोष उपस्थित",
//             definition: `प्रायः राहु द्वितीय भाव में हो  तो 'वाणी दोष' की स्थिति बनती है। परिणामतः ऐसा व्यक्ति वाणी के कारण नुकसान उठाता या शत्रु बढ़ाता है। धन, रिश्ते, पारिवारिक सुख भी प्रभावित होते हैं। घर बनाने के लिए लिया गया कर्ज भी सरलता से नहीं चुक पाता। वाणी पर उसका नियन्त्रण नहीं होता। वह बोलता ज्यादा है, करता कम है। अत: समाज में उसकी साख या प्रतिष्ठा नहीं बन पाती। झूठा, बकवादी, अभद्र, कटुभाषी, मुंहफट, बड़बोला, कुतर्की या मीनमेख निकालने वाला या अप्रिय या भद्दा बोलने वाला होता है। सही अवसर पर, सही बात पर, सही प्रकार, सही व्यक्ति से नहीं बोलता या विचार कर नहीं बोलता। कई बार केवल वाणी दोष के कारण ही गृहस्थी चौपट हो जाती है तथा जीविका खटाई में पड़ जाती है। सदा असन्तुष्ट रहता है।
//             विशेष— यद्यपि यदि जातक अपनी वाणी तथा निर्णय क्षमता को दुरुस्त कर ले, तो दूसरा राहु धन वर्षा भी करा देता है। कई बार विदेश भी भेज देता है, वरना समाज तथा सहकर्मी तो क्या, स्वयं परिवार वाले तथा रिश्तेदार तक कद्र करना बन्द कर देते हैं।`,
//             remedies: ""
//         }
//     }
//     else {
//         return {
//             status: "वाणी दोष अनुपस्थित",
//             definition: ""
//         }
//     }
// }

// const betrayalYog = (rahuHouse,venusHouse) => {
//     if(rahuHouse === 4 || venusHouse === 6 || rahuHouse === 7) {
//         return "Dhoka mil sakta h"
//     }
//     return "None"
// }

/**
 * Returns an array of house numbers in the arc from start to end (inclusive)
 * in a circular 1–12 system.
 *
 * @param {number} start - starting house (inclusive)
 * @param {number} end - ending house (inclusive)
 * @param {string} direction - "clockwise" or "anticlockwise"
 * @returns {number[]} - array of houses in the arc
 */
const getArc = (start, end, direction = "clockwise") => {
    const houses = [];
    let current = start;
    houses.push(current);
    if (direction === "clockwise") {
        while (current !== end) {
            current = current === 12 ? 1 : current + 1;
            houses.push(current);
        }
    } else if (direction === "anticlockwise") {
        while (current !== end) {
            current = current === 1 ? 12 : current - 1;
            houses.push(current);
        }
    }
    return houses;
};

/**
 * Checks whether every planet's house is within the arc.
 *
 * @param {number[]} arc - array of houses representing the arc.
 * @param {number[]} planetHouses - array of house numbers for planets.
 * @returns {boolean}
 */
const allPlanetsInArc = (arc, planetHouses) => {
    return planetHouses.every(house => arc.includes(house));
};

/**
 * Determines the Kaal Sarp Yog name based on planet positions and the provided mapping.
 *
 * Naming mapping (for full Kaal Sarp Yog):
 * - Rahu in 1, Ketu in 7 => "anant kaal-sarp yoga"
 * - Rahu in 2, Ketu in 8 => "Kulik kaal-sarp yoga"
 * - Rahu in 3, Ketu in 9 => "Vasuki kaal-sarp yoga"
 * - Rahu in 4, Ketu in 10 => "SankhPal kaal-sarp yoga"
 * - Rahu in 5, Ketu in 11 => "Padam kaal-sarp yoga"
 * - Rahu in 6, Ketu in 12 => "Mahapadam kaal-sarp yoga"
 * - Rahu in 7, Ketu in 1 => "Takshak kaal-sarp yoga"
 * - Rahu in 8, Ketu in 2 => "Karkotak kaal-sarp yoga"
 * - Rahu in 9, Ketu in 3 => "Sankhnaad kaal-sarp yoga"
 * - Rahu in 10, Ketu in 4 => "Paatak kaal-sarp yoga"
 * - Rahu in 11, Ketu in 5 => "Vishakt kaal-sarp yoga"
 * - Rahu in 12, Ketu in 6 => "Shesnaag kaal-sarp yoga"
 *
 * @param {number} sunHouse
 * @param {number} moonHouse
 * @param {number} marsHouse
 * @param {number} mercuryHouse
 * @param {number} jupiterHouse
 * @param {number} venusHouse
 * @param {number} saturnHouse
 * @param {number} rahuHouse
 * @param {number} ketuHouse
 * @returns {string} - If full Kaal Sarp Yog, returns the mapped name.
 *                     Otherwise returns "Aansik Kaal Sarp Yog".
 */
const kaalSarpYog = (sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse) => {
    // Collect planet positions.
    const planets = [sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse];

    // Build both arcs between Rahu and Ketu.
    const clockwiseArc = getArc(rahuHouse, ketuHouse, "clockwise");
    const anticlockwiseArc = getArc(rahuHouse, ketuHouse, "anticlockwise");

    // Count planets in each arc
    const countInArc = (arc) => planets.filter(p => arc.includes(p)).length;
    const clockwiseCount = countInArc(clockwiseArc);
    const anticlockwiseCount = countInArc(anticlockwiseArc);

    // Determine which arc is the clutch (the one with more planets).
    let clutchArc;
    let clutchCount;
    if (clockwiseCount >= anticlockwiseCount) {
        clutchArc = clockwiseArc;
        clutchCount = clockwiseCount;
    } else {
        clutchArc = anticlockwiseArc;
        clutchCount = anticlockwiseCount;
    }

    // The number of planets outside the clutch:
    const outsideCount = planets.length - clutchCount;

    // Determine the result:
    // Full Kaal Sarp Yog: all planets are in one arc.
    if (outsideCount === 0) {
        const mapping = {
            '1-7': 'anant kaal-sarp yoga',
            '2-8': 'Kulik kaal-sarp yoga',
            '3-9': 'Vasuki kaal-sarp yoga',
            '4-10': 'SankhPal kaal-sarp yoga',
            '5-11': 'Padam kaal-sarp yoga',
            '6-12': 'Mahapadam kaal-sarp yoga',
            '7-1': 'Takshak kaal-sarp yoga',
            '8-2': 'Karkotak kaal-sarp yoga',
            '9-3': 'Sankhnaad kaal-sarp yoga',
            '10-4': 'Paatak kaal-sarp yoga',
            '11-5': 'Vishakt kaal-sarp yoga',
            '12-6': 'Shesnaag kaal-sarp yoga'
        };

        const key = `${rahuHouse}-${ketuHouse}`;
        return mapping[key] || "Kaal Sarp Yog / काल सर्प योग";
    };



    // Aansik Kaal Sarp Yog: exactly one planet is outside.
    if (outsideCount === 1) {
        return "Aansik Kaal Sarp Yog / आंशिक काल सर्प योग";
    }

    // No Kaal Sarp Yog: more than one planet is outside.
    return "No Kaal Sarp Yog / काल सर्प योग नहीं";
};


module.exports = {
    checkManglik,
    cheakMool,
    chandalYoga,
    kaalSarpYog,
    grahanYog,
    pitruRin,
    matruRin
}