import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Rahu() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const attributes = [
        {
            label: "Mitr Grah",
            hindi: "मित्र ग्रह",
            value: "Venus (शुक्र), Saturn (शनि), Mercury (बुध)",
        },
        {
            label: "Shatru Grah",
            hindi: "शत्रु ग्रह",
            value: "Sun (सूर्य), Moon (चंद्र)",
        },
        {
            label: "Sam Grah",
            hindi: "सम ग्रह",
            value: "Mars (मंगल), Jupiter (गुरु)",
        },
        {
            label: "Adipati",
            hindi: "आधिपति",
            value: "No sign (कोई नहीं)",
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
            value: "South-West (दक्षिण-पश्चिम)",
        },
        {
            label: "Rang",
            hindi: "रंग",
            value: "Dark Blue / Smoky (गहरा नीला / धुंधला)",
        },
        {
            label: "Ratan",
            hindi: "रत्न",
            value: "Gomed (गोमेद)",
        },
        {
            label: "Sankhya",
            hindi: "पक्का घर",
            value: "12",
        },
        {
            label: "Devta",
            hindi: "मंदे घर",
            value: "1,2,4,5,7,12",
        },
        {
            label: "",
            hindi: "श्रेष्ठ घर",
            value: "3,4,6",
        },
        {
            label: "Devta",
            hindi: "देवता",
            value: "सरस्वती",
        },
        {
            label: "Day",
            hindi: "वार",
            value: "शनिवार",
        },
        {
            label: "",
            hindi: "दान योग्य वस्तुएँ",
            value: "तिल, सरसों का तेल, काला कपड़ा, कंबल, नारियल",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-tr from-purple-900 to-indigo-900 p-6">
            <button onClick={handleBack} className="cursor-pointer text-white">
                🔙 Go Back
            </button>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-white drop-shadow-sm mb-4">राहु / Rahu</h1>
                <img
                    src="/Images/planets_Images/rahu.png"
                    alt="Rahu"
                    className="w-80 h-80 mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {attributes.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-12 border border-purple-400 transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
                    >
                        <h3 className="text-xl font-semibold text-purple-900 mb-2">
                            {item.hindi}
                            <hr className="mt-1" />
                        </h3>
                        <p className="text-purple-800 text-lg">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
