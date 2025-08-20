const threeGrahWithEachOther = (sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse) => {
    const result = []

    if ((jupiterHouse === sunHouse) && (sunHouse === moonHouse)) {
        result.push({
            desc: "ऐसा जातक भाग्यवान, कलम का धनी, दूसरों की मदद करनेवाला, ठोस सामान का व्यापारी, अपने साथियों का सहायक होता है",
            remedies: ""
        })
    }

    else if ((jupiterHouse === sunHouse) && (sunHouse === venusHouse)) {
        result.push({
            desc: "जातक का भाग्य उसके विवाह के दिन जागता है। जातक की पत्नी मिलनसार, अच्छे स्वभाव की, साथ निभानेवाली, भाग्यवान होती है।",
            remedies: ""
        })
    }

    else if ((jupiterHouse === sunHouse) && (sunHouse === marsHouse)) {
        result.push({
            desc: "यह जातक शक्तिशाली होता है। ऐसा जातक अधिकार-संपन्न होता है। ",
            remedies: ""
        })
    }
    else if (((jupiterHouse === sunHouse) && (sunHouse === marsHouse)) && (jupiterHouse === 8)) {
        result.push({
            desc: "जातक योगी होता है या योगी प्रवृति का होता है।",
            remedies: ""
        })
    }

    else if ((jupiterHouse === sunHouse) && (sunHouse === saturnHouse)) {
        result.push({
            desc: "जातक को मान-सम्मान मिलता",
            remedies: ""
        })
    }

    else if ((jupiterHouse === sunHouse) && (sunHouse === rahuHouse)) {
        result.push({
            desc: "जातक के अच्छे व्यवहार के वावजूद भी उसे धोका मिलता रहेगा , ये धनवान होते है",
            remedies: "इन्हे गलत काम नहीं करना चाहिए"
        })
    }
    else if (((jupiterHouse === sunHouse) && (sunHouse === rahuHouse)) && (jupiterHouse === 5)) {
        result.push({
            desc: "",
            remedies: "उपाय द्वारा राहु को यहां से हटा दें"
        })
    }
    else if ((jupiterHouse === sunHouse) && (sunHouse === ketuHouse)) {
        result.push({
            desc: "कुंडली के किसी भी घर में बैठे हुए हों तो सूर्य का फल बहुत नीच होता है। पांचवें घर में फल ठीक होता है।",
            remedies: "यहाँ सूर्य के उपाय करने चाहिए या उपाय द्वारा केतु को यहां से हटा दें।"
        })
    }
    else if ((jupiterHouse === moonHouse) && (moonHouse === venusHouse)) {
        result.push({
            desc: "जातक का हाल अजीब होता है। जातक कभी खुशहाल तो कभी तंगहाल होता है। अच्छी हालत के समय अच्छा और शुभ फल होगा। मां मेहनती, अच्छे खानदान की स्वाभिमानी स्त्री होगी। जातक के विवाह के समय सातवें घर का असर शुरू होगा। धन वृद्धि में रुकावट आएगी। सूर्य नीच हो तो जातक नाकामयाब आशिक होता है।",
            remedies: "विवाह के अवसर पर गोदान करें और उसके चक्कर में धन वर्वाद करता है ।"
        })
    }
    else if ((jupiterHouse === moonHouse) && (moonHouse === mercuryHouse)) {
        result.push({
            desc: "जातक दलाली के कारोबार में बहुत धन कमाता है, बुध सहायक होता है। लाखों रुपयों का धन होते हुए भी जातक को अपार कष्ट झेलने पड़ते हैं। बुद्धि काम नहीं करती। कोई काम नहीं आता।",
            remedies: "बुध का उपाय करें"
        })
    }
    else if (((jupiterHouse === moonHouse) && (moonHouse === mercuryHouse)) && (jupiterHouse === 2)) {
        result.push({
            desc: "जब तीनों ग्रह दूसरे घर में हों तो पिता कष्ट में रहते हैं",
            remedies: "बुध का उपाय करें"
        })
    }
    else if (((jupiterHouse === moonHouse) && (moonHouse === mercuryHouse)) && (jupiterHouse === 3)) {
        result.push({
            desc: "तीसरे में तीनों ग्रह हों तो तीनों का फल मंदा होता है",
            remedies: "बुध का उपाय करें"
        })
    }
    else if (((jupiterHouse === moonHouse) && (moonHouse === saturnHouse)) && (jupiterHouse === 4)) {
        result.push({
            desc: "ऐसा जातक दूसरों के लिए पारस-मणि समान होता है। माता-पिता का सुख उत्तम और लंबे समय तक मिलता रहता है।",
            remedies: ""
        })
    }
    else if (((jupiterHouse === moonHouse) && (moonHouse === saturnHouse)) && (jupiterHouse === 2)) {
        result.push({
            desc: "यहाँ बैठे ग्रहो का फल अच्छा नहीं होता इनका असर दादी, चाची, मौसी पर पड़ता है",
            remedies: "शनि का उपाय लाभप्रद रहता है।"
        })
    }
    else if (((jupiterHouse === moonHouse) && (moonHouse === saturnHouse)) && (jupiterHouse === 9)) {
        result.push({
            desc: "यहाँ बैठे ग्रहो का फल अच्छा नहीं होता इनका असर दादी, चाची, मौसी पर पड़ता है",
            remedies: "शनि का उपाय लाभप्रद रहता है।"
        })
    }
    else if (((jupiterHouse === moonHouse) && (moonHouse === rahuHouse))) {
        result.push({
            desc: "",
            remedies: "उपाय द्वारा राहु को यहां से हटा दें"
        })
    }
    else if (((jupiterHouse === moonHouse) && (moonHouse === ketuHouse))) {
        result.push({
            desc: "जातक निकम्मा होता है",
            remedies: "केतु का उपाय करें"
        })
    }
    else if (((jupiterHouse === moonHouse) && (moonHouse === marsHouse))) {
        result.push({
            desc: "किसी भी घर में होने पर इनका प्रभाव बहुत ही अच्छा रहता है",
            remedies: ""
        })
    }
    else if (((jupiterHouse === venusHouse) && (venusHouse === marsHouse))) {
        result.push({
            desc: "इन ग्रहो का प्रभाव जातक के लिए अच्छा नहीं होता है प्यार में धोका मिलने के आसार रहते है और अगर अशुभ शुक्र हो तो संतान में दिक्कत होती है",
            remedies: "शुक्र का उपाय करें"
        })
    }
    else if (((jupiterHouse === venusHouse) && (venusHouse === mercuryHouse)) && (jupiterHouse === 7)) {
        result.push({
            desc: "विवाह और गृहस्थी में बाधा आती है। धन-संपत्ति अधिक नहीं रहती, पर गृहस्थी चलती रहती है।",
            remedies: ""
        })
    }
    else if (((jupiterHouse === venusHouse) && (venusHouse === saturnHouse)) && (jupiterHouse === 9)) {
        result.push({
            desc: "उत्तम फलदायी होते हैं",
            remedies: ""
        })
    }
    else if (((jupiterHouse === venusHouse) && (venusHouse === saturnHouse))) {
        result.push({
            desc: "जातक की पत्नी फिजूल के बोलने से व्यर्थ के बखेड़े खड़े कर देती है। लड़ाई-झगड़े की स्थिति निरंतर बनी रहती है।",
            remedies: ""
        })
    }
    else if (((jupiterHouse === marsHouse) && (marsHouse === mercuryHouse)) && (rahuHouse === 11) ) {
        result.push({
            desc: "संतान को कष्ट होते रहते है",
            remedies: "जातक शरीर पर सोना धारण करे \n शनि के उपायों द्वारा बुध को ठीक कर ले \n  सफेद या काले कच्चे चने बकरी को खिलाए \n कन्याओं को बादाम देकर उनसे आशीर्वाद ले"
        })
    }
    else if (((jupiterHouse === marsHouse) && (marsHouse === saturnHouse))) {
        result.push({
            desc: "दूसरे घर को छोड़कर किसी भी घर में बैठे हों तो जातक के परिवार में पुरुष कम होते हैं। बृहस्पति नीच होने से माता-पिता की बनाई पैतृक चीजें बेचकर या उनके द्वारा कमाई करके जातक सबकुछ होते हुए भी कर्जदार रहता है।बृहस्पति की चीजों का कारोबार और रिश्तेदारों से कोई लाभ नहीं होता। बीमारियां, गंदे विचार, बुरी वासनाएं जातक की बरबादी का कारण होते हैं। जब तीनों दूसरे घर में हों, परंतु जातक के लिए धन-संपत्ति का अच्छा ही रहता है।",
            remedies: "उपाय द्वारा शनि को ठीक करें"
        })
    }
    else if (((jupiterHouse === marsHouse) && (marsHouse === ketuHouse))) {
        result.push({
            desc: "जातक का भाग्य और संतान (केतु) 45 वर्षों तक मंदे रहते हैं। 45 वर्षों के बाद एक भाई मददगार बनता है। उसके बाद वह भाई भी साथ छोड़कर चला जाता है।",
            remedies: "शनि के रत्न को बृहस्पति के पीले रंग से रंगकर घर में स्थापित करने से और बादाम पीले करके रखने से ठीक रहता है"
        })
    }
    else if (((jupiterHouse === marsHouse) && (marsHouse === ketuHouse))) {
        result.push({
            desc: "जातक का भाग्य और संतान (केतु) 45 वर्षों तक मंदे रहते हैं। 45 वर्षों के बाद एक भाई मददगार बनता है। उसके बाद वह भाई भी साथ छोड़कर चला जाता है।",
            remedies: "शनि के रत्न को बृहस्पति के पीले रंग से रंगकर घर में स्थापित करने से और बादाम पीले करके रखने से ठीक रहता है"
        })
    }

    else if (((jupiterHouse === saturnHouse) && (saturnHouse === mercuryHouse))) {
        result.push({
            desc: "जातक का भाग्य और संतान (केतु) 45 वर्षों तक मंदे रहते हैं। 45 वर्षों के बाद एक भाई मददगार बनता है। उसके बाद वह भाई भी साथ छोड़कर चला जाता है।",
            remedies: "शनि के रत्न को बृहस्पति के पीले रंग से रंगकर घर में स्थापित करने से और बादाम पीले करके रखने से ठीक रहता है"
        })
    }

    return result

}

module.exporrts = { threeGrahWithEachOther }