import {useState} from 'react'
import Remedies from '../components/Remedies';
import { BsArrowDownCircle } from "react-icons/bs";


const InfoOfKundali = ({ data }) => {
    const gender = data?.gender;
    const [isOpen, setIsOpen] = useState(false)

    function extractHindiName(nameStr = "") {
        return nameStr
            .split(',')
            .map(part => part.trim())
            .find(part => /[\u0900-\u097F]/.test(part)) || "नाम उपलब्ध नहीं";
    }

    const extractGender = (gender) => {
        if (gender === "male") return "पुरुष";
        if (gender === "female") return "महिला";
        return "जातक";
    }

    const dataOfNakshatra = data?.NakshatraInfo;

    function getContentByGender(dataOfNakshatra, gender) {
        const result = {};
        for (let key in dataOfNakshatra) {
            if (dataOfNakshatra[key][gender]) {
                result[key] = dataOfNakshatra[key][gender];
            }
        }
        return result;
    }

    const colorPicker = () => {
        const colors = [
            '#fdfdfd', '#f8f8f8', '#eeeeee', '#eaeaea',
            '#fff0f0', '#ffeaf2', '#fcd5e1', '#f0d8f4', '#e7dbf4',
            '#dee1f6', '#d9edff', '#d1f2ff', '#d2f7fa', '#d2f0ee',
            '#e0f5e0', '#eef7dc', '#f8fad9', '#fffde0', '#fff0d2',
            '#ffe0d5', '#fcfcfd', '#f8fcf3', '#f3faf3', '#fef0f5',
            '#f5f2fb', '#f1f9fe', '#f0fcfd', '#f0faf9', '#f9f1fa',
            '#fefefe', '#fcfcfc', '#fffef3', '#fff8ee', '#fff4f6',
            '#f0fcfd', '#f0faff', '#f3f4fb', '#f9f9fb', '#f6f8f9'
        ]
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    const nakshatraInfo = getContentByGender(dataOfNakshatra, gender);

    const spaceForUnfevNak = (nakObj) => Object.values(nakObj).join(', ');

    const getPlanetNameInHindi = (planet) => {
        switch (planet.toLowerCase()) {
            case "sun":
                return "सूर्य";
            case "moon":
                return "चंद्र";
            case "mars":
                return "मंगल";
            case "mercury":
                return "बुध";
            case "jupiter":
                return "गुरु";
            case "venus":
                return "शुक्र";
            case "saturn":
                return "शनि";
            case "rahu":
                return "राहु";
            case "ketu":
                return "केतु";
            case "" :
                return ""
            default:
                return planet;
        }
    };

    const extractHindiNames = (combinedName) => {
        if (!combinedName.includes(',')) return combinedName;
        const parts = combinedName.split(',');
        return parts[1]?.trim() || combinedName;
    };

    const gems = data?.gemsAccordingToLagan

    const planetColors = {
        sun: { bg: '#fff7e7', border: '#f7e8c6' },
        moon: { bg: '#fff7f0', border: '#fce3d3' },
        mars: { bg: '#f9f6ff', border: '#e6d7fd' },
        mercury: { bg: '#e7fff9', border: '#c4f1e6' },
        jupiter: { bg: '#fffde7', border: '#f1eebc' },
        venus: { bg: '#fff0f3', border: '#fcdbe2' },
        saturn: { bg: '#f0f8ff', border: '#d1e6f9' },
        rahu: { bg: '#f7f7f7', border: '#d9d9d9' },
        ketu: { bg: '#fff9f2', border: '#f1e1cc' }
    };

    const planets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];

    const nakshatraSections = [
        {
            label: 'शारीरिक संरचना  : - ',
            key: 'saririkSanrahna',
            bg: '#fff7e7',
            border: '#f7e8c6'
        },
        {
            label: 'चरित्र : - ',
            key: 'charitr',
            bg: '#fff7f0',
            border: '#fce3d3'
        },
        {
            label: 'शिक्षा : - ',
            key: 'education',
            bg: '#f9f6ff',
            border: '#e6d7fd'
        },
        {
            label: 'परिवारिक जीवन : - ',
            key: 'marriedlife',
            bg: '#f0fffa',
            border: '#cbf1e6'
        },
        {
            label: 'स्वास्थ्य : - ',
            key: 'Health',
            bg: '#fff0f3',
            border: '#fcdbe2'
        }
    ];

    const nameOfKaalSarpYoga = data?.kaalSarpYog

    function getKaalSarpYogInHindi(nameOfKaalSarpYoga) {
        switch (nameOfKaalSarpYoga.toLowerCase()) {
            case 'anant kaal-sarp yoga':
                return 'अनंत काल सर्प योग';
            case 'kulik kaal-sarp yoga':
                return 'कुलिक काल सर्प योग';
            case 'vasuki kaal-sarp yoga':
                return 'वासुकी काल सर्प योग';
            case 'sankhpal kaal-sarp yoga':
                return 'शंखपाल काल सर्प योग';
            case 'padam kaal-sarp yoga':
                return 'पद्म काल सर्प योग';
            case 'mahapadam kaal-sarp yoga':
                return 'महापद्म काल सर्प योग';
            case 'takshak kaal-sarp yoga':
                return 'तक्षक काल सर्प योग';
            case 'karkotak kaal-sarp yoga':
                return 'कार्कोटक काल सर्प योग';
            case 'sankhnaad kaal-sarp yoga':
                return 'शंखनाद काल सर्प योग';
            case 'paatak kaal-sarp yoga':
                return 'पातक काल सर्प योग';
            case 'vishakt kaal-sarp yoga':
                return 'विषक्त काल सर्प योग';
            case 'shesnaag kaal-sarp yoga':
                return 'शेषनाग काल सर्प योग';
            case 'aansik kaal sarp yog / आंशिक काल सर्प योग':
                return 'आंशिक काल सर्प योग';
            case 'no kaal sarp yog / काल सर्प योग नहीं':
                return 'काल सर्प योग नहीं';
            default:
                return 'अमान्य योग नाम';
        }
    }

    const gemsPlacement = [

        {
            id: 1,
            nameHI: "शिक्षा",
            gem: gems?.education?.hindi
        },
        {
            id: 2,
            nameHI: "समृद्धि",
            gem: gems?.prosperity?.hindi
        },
        {
            id: 3,
            nameHI: "धन",
            gem: gems?.money?.hindi
        },
        {
            id: 4,
            nameHI: "व्यापार",
            gem: gems?.business?.hindi
        },
        {
            id: 5,
            nameHI: "स्वस्थ",
            gem: gems?.health?.hindi
        },
        {
            id: 6,
            nameHI: "विवाह",
            gem: gems?.marriage?.hindi
        },
        {
            id: 7,
            nameHI: "आध्यात्मिकता",
            gem: gems?.spiritualGrowth?.hindi
        },
        {
            id: 8,
            nameHI: "कर्ज मुक्ति",
            gem: gems?.debt?.hindi
        },

        {
            id: 9,
            nameHI: "संतान",
            gem: gems?.children?.hindi
        },
        {
            id: 10,
            nameHI: "माता के स्वस्थ",
            gem: gems?.motherHealth?.hindi
        },
        {
            id: 11,
            nameHI: "पत्नी के स्वस्थ",
            gem: gems?.wifeHealth?.hindi
        },
        {
            id: 12,
            nameHI: "सभी प्रकार से वृद्धि",
            gem: gems?.allRoundedEffect?.hindi
        },
        {
            id: 13,
            nameHI: "सरकार से मदद",
            gem: gems?.governmentHelp?.hindi
        },
        {
            id: 14,
            nameHI: "भाग्य",
            gem: gems?.luck?.hindi
        },
        {
            id: 15,
            nameHI: "मानसिक शांति",
            gem: gems?.mentalPeace?.hindi
        },
        {
            id: 16,
            nameHI: "पिता के स्वस्थ",
            gem: gems?.fatherHealth?.hindi
        },

    ]

    const doshaData = [
        {
            title: 'गण्डमूल दोष -',
            statusText: (data) => `आपकी कुंडली में ${data?.mool?.status} हैं`,
            description: (data) => data?.mool?.definition,
        },
        {
            title: 'मांगलिक दोष -',
            statusText: (data) => `आप ${data?.checkManglik?.status} हैं`,
            description: (data) => data?.checkManglik?.definition,
        },
        {
            title: 'काल सर्प दोष -',
            statusText: () => `आपको ${getKaalSarpYogInHindi(nameOfKaalSarpYoga)} हैं`,
            description: (data) => data?.kaalsurpYogaInfo?.description,
        },
        // {
        //     title: 'पितृ दोष  -',
        //     statusText: (data) => `आपकी कुंडली में ${data?.pitruRin?.status} हैं`,
        //     description: (data) => data?.pitruRin?.definition,
        // },
        // {
        //     title: 'मातृ दोष  -',
        //     statusText: (data) => `आपकी कुंडली में ${data?.matruRin?.status} हैं`,
        //     description: (data) => data?.matruRin?.definition,
        // },
    ];

    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-center items-center mt-20 mb-10 px-4">
                <h2 className="text-3xl text-[#b8860b] font-bold border-b-4 border-[#f7c46c] pb-2 mb-5">
                    Prediction / फलादेश
                </h2>
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#f3e6c8] p-8 mt-10">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-[#a9741a] mb-2">
                            तिथि फलादेश -
                        </h1>
                    </div>

                    <div className="space-y-6">
                        {data?.predictionBasedOnDayAndMonths?.map((item, index) => (
                            <div key={index} className='p-5 bg-[#fdf9f8] rounded-xl text-justify shadow border border-[#f5e3b3]'>
                                {item?.msg}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-5">
                        <h1 className="text-2xl font-bold text-[#a9741a] mb-2">
                            लग्न फलादेश -
                        </h1>
                    </div>

                    <div className="space-y-3">
                        <div className='p-5 bg-[#fdf9f8] rounded-xl text-justify shadow border border-[#f5e3b3]'>
                            {data.LaganData.description}
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#f3e6c8] p-8 mt-10">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-[#a9741a] mb-2">
                            {extractGender(gender)} जातक -
                        </h1>
                        <div className="text-lg text-[#6b4c1e]">
                            {extractHindiName(data?.moon?.nakshatra?.nakName)} नक्षत्र :-
                        </div>
                    </div>

                    <div className="space-y-6">
                        {nakshatraSections.map((section, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-xl shadow border mb-4 text-justify"
                                style={{
                                    backgroundColor: section.bg,
                                    borderColor: section.border
                                }}
                            >
                                <span className="font-semibold text-[#964b00]">
                                    {section.label}
                                </span>
                                <span>{nakshatraInfo?.[section.key]}</span>
                            </div>
                        ))}
                        <div className="p-5 bg-[#fdf7e8] rounded-xl shadow border border-[#f5e3b3]">
                            <span className="font-semibold text-[#964b00]">**विशेष** : - </span>
                            <span>
                                इस नक्षत्र में पैदा जातकों को &nbsp;
                                <span className="font-semibold text-red-500 text-justify">
                                    {spaceForUnfevNak(data?.NakshatraInfo?.unfavorableNakshatra)}
                                </span>
                                &nbsp; नक्षत्र के जातकों से विवाह, मित्रता या साझेदारी नहीं करनी चाहिए।
                            </span>
                        </div>
                    </div>
                </div>


                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#f3e6c8] p-8 mt-10">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-[#a9741a] mb-2">
                            ग्रहों का नक्षत्रों पर प्रभाव
                        </h1>
                    </div>

                    <div className="space-y-6">
                        {planets.map((planet, index) => {
                            const nakshatraKey = `${planet}NakPaadInfo`;
                            const planetData = data?.[planet]?.[nakshatraKey];
                            if (!planetData) return null;
                            const colors = planetColors[planet] || { bg: '#ffffff', border: '#cccccc' };
                            return (
                                <div
                                    key={index}
                                    className="p-5 rounded-xl shadow border mb-4"
                                    style={{
                                        backgroundColor: colors.bg,
                                        borderColor: colors.border
                                    }}
                                >
                                    <span className="font-semibold text-[#964b00]">
                                        {getPlanetNameInHindi(planetData.planet)} - &nbsp;
                                        {extractHindiNames(planetData.nakshatra)} - &nbsp;
                                        {planetData.pada} : -
                                    </span>
                                    <span className='text-justify'> {planetData.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#f3e6c8] p-8 mt-10">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-[#a9741a] mb-15">
                            दोष विचार
                        </h1>
                    </div>

                    <div className="space-y-6">
                        {doshaData.map((item, index) => (
                            <div className={`p-5 rounded-xl -mt-15`} key={index}>
                                <div
                                    className="p-5 rounded-xl shadow mb-4"
                                    style={{ backgroundColor: colorPicker() }}
                                >
                                    <h1 className="text-2xl text-[#a9741a] mb-2 font-semibold">
                                        {item.title}
                                    </h1>
                                    <span className="font-semibold">
                                        {item.statusText(data)}
                                    </span>
                                    <br />
                                    <p className="mt-5">
                                        {item.description(data)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className='w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#f3e6c8] p-8 mt-10'>
                    <div className="text-center mb-3">
                        <h1 className="text-2xl font-bold text-[#a9741a]">
                            लग्न से रत्न
                        </h1>
                    </div>
                    <div>
                        <div className='flex h-fit pb-5 gap-5 max-md:flex-col'>
                            <div className='w-full'>
                                {gemsPlacement.map((gems) => (
                                    <div key={gems.id} className={`${gems.gem === undefined ? 'hidden' : "float-left lg:mt-5 lg:ml-4 mt-5 ml-5"}`}>
                                        <div className='w-27 h-27 lg:w-35 lg:h-35 rounded-xl' style={{ backgroundColor: colorPicker() }}>
                                            <div className={'flex flex-col justify-center items-center h-30 mt-2'}>
                                                <div className='text-[#a9741a] text-lg text-center'>
                                                    {gems.nameHI} के लिए :
                                                </div>
                                                <div className={`text-lg text-center`}>
                                                    {gems.gem}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#f3e6c8] p-8 mt-20">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-[#a9741a] mb-2">
                            अशुभ ग्रहों के लिए उपाय
                        </h1>
                    </div>

                    <div className="space-y-8">
                        {data?.remedies?.remedies?.map((item, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-xl shadow border mb-4"
                                style={{
                                    backgroundColor: "#fdf6e3",
                                    borderColor: "#e0c97d"
                                }}
                            >
                                <h2 className="font-semibold text-[#964b00] mb-2">
                                    {getPlanetNameInHindi(item.planet)} - {item.remedy.houseNumber} भाव
                                </h2>

                                {/* Split the remedies string */}
                                {typeof item.remedy.remedies === 'string' &&
                                    item.remedy.remedies.split('\n').map((line, idx) => {
                                        const trimmedLine = line.trim();
                                        return trimmedLine ? (
                                            <p key={idx} className="text-sm text-gray-700 mb-1">
                                                {trimmedLine}
                                            </p>
                                        ) : null;
                                    })
                                }
                            </div>
                        ))}
                    </div>
                    <div className="space-y-8 mt-4">
                        {data?.remedies?.maarakRemedies?.map((item, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-xl shadow border mb-4"
                                style={{
                                    backgroundColor: "#D2F7FA",
                                    borderColor: "#e0c97d"
                                }}
                            >
                                <h2 className="font-semibold text-[#964b00] mb-2">
                                    {getPlanetNameInHindi(item.planet)} - {item.remedy.houseNumber} भाव
                                </h2>

                                {/* Split the remedies string */}
                                {typeof item.remedy.remedies === 'string' &&
                                    item.remedy.remedies.split('\n').map((line, idx) => {
                                        const trimmedLine = line.trim();
                                        return trimmedLine ? (
                                            <p key={idx} className="text-sm text-gray-700 mb-1">
                                                {trimmedLine}
                                            </p>
                                        ) : null;
                                    })
                                }
                            </div>
                        ))}
                    </div>

                    {typeof data?.kaalSarpYogaRemidie === 'string' && data.kaalSarpYogaRemidie.trim() && (
                        <div
                            className="p-5 rounded-xl shadow border mb-4"
                            style={{ backgroundColor: "#b9b9b9", borderColor: "#e0c97d" }}
                        >
                            <h2 className="font-semibold text-[#964b00] mb-2">कालसर्प दोष के उपाय</h2>

                            {data.kaalSarpYogaRemidie.split('\n').map((line, idx) => {
                                const trimmedLine = line.trim();
                                return trimmedLine ? (
                                    <p key={idx} className="text-sm text-gray-700 mb-1">
                                        {trimmedLine}
                                    </p>
                                ) : null;
                            })}
                        </div>
                    )}

                    <div className=''>
                        <Remedies />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoOfKundali;
