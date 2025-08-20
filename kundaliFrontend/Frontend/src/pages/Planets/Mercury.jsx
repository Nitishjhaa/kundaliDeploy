import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Mercury() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const attributes = [
        {
            label: "Mitr Grah",
            hindi: "मित्र ग्रह",
            value: "Sun (सूर्य), Venus (शुक्र)",
        },
        {
            label: "Shatru Grah",
            hindi: "शत्रु ग्रह",
            value: "Moon (चंद्र)",
        },
        {
            label: "Sam Grah",
            hindi: "सम ग्रह",
            value: "Mars (मंगल), Jupiter (गुरु), Saturn (शनि)",
        },
        {
            label: "Adipati",
            hindi: "आधिपति",
            value: "Gemini (मिथुन), Virgo (कन्या)",
        },
        {
            label: "Ucch",
            hindi: "उच्च",
            value: "Virgo (कन्या)",
        },
        {
            label: "Neech",
            hindi: "नीच",
            value: "Pisces (मीन)",
        },
        {
            label: "Disha",
            hindi: "दिशा",
            value: "North (उत्तर)",
        },
        {
            label: "Rang",
            hindi: "रंग",
            value: "Green (हरा)",
        },
        {
            label: "Ratan",
            hindi: "रत्न",
            value: "Emerald (पन्ना)",
        },
        {
            label: "Sankhya",
            hindi: "पक्का घर",
            value: "3,6",
        },
        {
            label: "Devta",
            hindi: "मंदे घर",
            value: "7,8,9,12",
        },
        {
            label: "",
            hindi: "श्रेष्ठ घर",
            value: "1,2,4,5,10,11",
        },
        {
            label: "Devta",
            hindi: "देवता",
            value: "Narayana (नारायण)",
        },
        {
            label: "Day",
            hindi: "वार",
            value: "बुधवार",
        },
        {
            label: "",
            hindi: "दान योग्य वस्तुएँ",
            value: "पन्ना, हरी सब्ज़ियाँ, मूँग की दाल, हरा कपड़ा, दूर्वा घास",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-tr from-green-50 to-green-100 p-6">
            <button onClick={handleBack} className="cursor-pointer">
                🔙 Go Back
            </button>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-green-700 drop-shadow-sm mb-4">बुध / Mercury</h1>
                <img
                    src="/Images/planets_Images/mercury.png"
                    alt="Mercury"
                    className="w-80 h-80 mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[...attributes].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-12 border border-green-200 transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
                    >
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                            {item.hindi}
                            <hr className="mt-1" />
                        </h3>
                        <p className="text-green-700 text-lg">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
