import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Venus() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const attributes = [
        {
            label: "Mitr Grah",
            hindi: "मित्र ग्रह",
            value: "Mercury (बुध), Saturn (शनि)",
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
            value: "Taurus (वृषभ), Libra (तुला)",
        },
        {
            label: "Ucch",
            hindi: "उच्च",
            value: "Pisces (मीन)",
        },
        {
            label: "Neech",
            hindi: "नीच",
            value: "Virgo (कन्या)",
        },
        {
            label: "Disha",
            hindi: "दिशा",
            value: "South-East (आग्नेय)",
        },
        {
            label: "Rang",
            hindi: "रंग",
            value: "White/Pink (सफेद/गुलाबी)",
        },
        {
            label: "Ratan",
            hindi: "रत्न",
            value: "Diamond (हीरा)",
        },
        {
            label: "Sankhya",
            hindi: "पक्का घर",
            value: "2,7",
        },
        {
            label: "Devta",
            hindi: "मंदे घर",
            value: "1,6,9,10,11",
        },
        {
            label: "",
            hindi: "श्रेष्ठ घर",
            value: "2,3,4,7,12",
        },
        {
            label: "Devta",
            hindi: "देवता",
            value: "Shukracharya (शुक्राचार्य)",
        },
        {
            label: "Day",
            hindi: "वार",
            value: "शुक्रवार",
        },
        {
            label: "",
            hindi: "दान योग्य वस्तुएँ",
            value: "हीरा, दही, सफेद कपड़े, सफेद चावल, चांदी, सुगंधित द्रव्य",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-tr from-pink-50 to-purple-100 p-6">
            <button onClick={handleBack} className="cursor-pointer">
                🔙 Go Back
            </button>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-pink-700 drop-shadow-sm mb-4">शुक्र / Venus</h1>
                <img
                    src="/Images/planets_Images/venus.png"
                    alt="Venus"
                    className="w-80 h-80 mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {attributes.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-12 border border-pink-200 transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
                    >
                        <h3 className="text-xl font-semibold text-pink-800 mb-2">
                            {item.hindi}
                            <hr className="mt-1" />
                        </h3>
                        <p className="text-pink-700 text-lg">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
