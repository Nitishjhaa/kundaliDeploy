import { useNavigate } from "react-router-dom";

export default function Moon() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const attributes = [
        {
            label: "Mitr Grah",
            hindi: "मित्र ग्रह",
            value: "Sun (सूर्य), Mercury (बुध)",
        },
        {
            label: "Shatru Grah",
            hindi: "शत्रु ग्रह",
            value: "None (कोई नहीं)",
        },
        {
            label: "Sam Grah",
            hindi: "सम ग्रह",
            value: "Mars (मंगल), Jupiter (गुरु), Venus (शुक्र), Saturn (शनि)",
        },
        {
            label: "Adipati",
            hindi: "आधिपति",
            value: "Cancer (कर्क)",
        },
        {
            label: "Ucch",
            hindi: "उच्च",
            value: "Taurus (वृषभ)",
        },
        {
            label: "Neech",
            hindi: "नीच",
            value: "Scorpio (वृश्चिक)",
        },
        {
            label: "Disha",
            hindi: "दिशा",
            value: "North-West (वायव्य)",
        },
        {
            label: "Rang",
            hindi: "रंग",
            value: "White/Silver (सफेद/चांदी)",
        },
        {
            label: "Ratan",
            hindi: "रत्न",
            value: "Pearl (मोती)",
        },
        {
            label: "Sankhya",
            hindi: "पक्का घर",
            value: "4",
        },
        {
            label: "Devta",
            hindi: "मंदे घर",
            value: "6,8,10,11,12",
        },
        {
            label: "",
            hindi: "श्रेष्ठ घर",
            value: "1,2,3,4,5,7,9",
        },
        {
            label: "Devta",
            hindi: "देवता",
            value: "Jal Dev (जल देव)",
        },
        {
            label: "Day",
            hindi: "वार",
            value: "सोमवार",
        },
        {
            label: "",
            hindi: "दान योग्य वस्तुएँ",
            value: "चावल, दूध, सफेद वस्त्र, चांदी, मोती, सफेद फूल",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-100 p-6">
            <button onClick={handleBack} className="cursor-pointer">
                🔙 Go Back
            </button>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-blue-700 drop-shadow-sm mb-4">चंद्र / Moon</h1>
                <img
                    src="/Images/planets_Images/moon.png"
                    alt="Moon"
                    className="w-80 h-80 mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[...attributes].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-12 border border-blue-200 transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
                    >
                        <h3 className="text-xl font-semibold text-blue-800 mb-2">
                            {item.hindi}
                            <hr className="mt-1" />
                        </h3>
                        <p className="text-blue-700 text-lg">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
