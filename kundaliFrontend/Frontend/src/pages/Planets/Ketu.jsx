import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Ketu() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const attributes = [
        {
            label: "Mitr Grah",
            hindi: "मित्र ग्रह",
            value: "Mars (मंगल), Venus (शुक्र), Saturn (शनि)",
        },
        {
            label: "Shatru Grah",
            hindi: "शत्रु ग्रह",
            value: "Sun (सूर्य), Moon (चंद्र)",
        },
        {
            label: "Sam Grah",
            hindi: "सम ग्रह",
            value: "Mercury (बुध), Jupiter (गुरु)",
        },
        {
            label: "Adipati",
            hindi: "आधिपति",
            value: "No sign (कोई नहीं)",
        },
        {
            label: "Ucch",
            hindi: "उच्च",
            value: "Scorpio (वृश्चिक)",
        },
        {
            label: "Neech",
            hindi: "नीच",
            value: "Taurus (वृषभ)",
        },
        {
            label: "Disha",
            hindi: "दिशा",
            value: "North-West (उत्तर-पश्चिम)",
        },
        {
            label: "Rang",
            hindi: "रंग",
            value: "Smoke Gray / Ash (धुंधला / राखी)",
        },
        {
            label: "Ratan",
            hindi: "रत्न",
            value: "Cat's Eye (लहसुनिया)",
        },
        {
            label: "Sankhya",
            hindi: "पक्का घर",
            value: "6",
        },
        {
            label: "Devta",
            hindi: "मंदे घर",
            value: "8,7,11",
        },
        {
            label: "",
            hindi: "श्रेष्ठ घर",
            value: "3,6,9,10,12",
        },
        {
            label: "Devta",
            hindi: "देवता",
            value: "गणेश",
        },
        {
            label: "Day",
            hindi: "वार",
            value: "मंगलवार / शनिवार",
        },
        {
            label: "",
            hindi: "दान योग्य वस्तुएँ",
            value: "नीले फूल, कंबल, काले तिल, लहसुनिया, धूप, चंदन",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-tr from-cyan-900 to-gray-800 p-6">
            <button onClick={handleBack} className="cursor-pointer text-white">
                🔙 Go Back
            </button>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-white drop-shadow-sm mb-4">केतु / Ketu</h1>
                <img
                    src="/Images/planets_Images/ketu.png"
                    alt="Ketu"
                    className="w-80 h-80 mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {attributes.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-12 border border-cyan-400 transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
                    >
                        <h3 className="text-xl font-semibold text-cyan-900 mb-2">
                            {item.hindi}
                            <hr className="mt-1" />
                        </h3>
                        <p className="text-cyan-800 text-lg">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
