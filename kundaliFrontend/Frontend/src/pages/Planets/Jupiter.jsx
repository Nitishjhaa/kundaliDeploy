import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Jupiter() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const attributes = [
        {
            label: "Mitr Grah",
            hindi: "मित्र ग्रह",
            value: "Sun (सूर्य), Moon (चंद्र), Mars (मंगल)",
        },
        {
            label: "Shatru Grah",
            hindi: "शत्रु ग्रह",
            value: "Venus (शुक्र), Mercury (बुध)",
        },
        {
            label: "Sam Grah",
            hindi: "सम ग्रह",
            value: "Saturn (शनि)",
        },
        {
            label: "Adipati",
            hindi: "आधिपति",
            value: "Sagittarius (धनु), Pisces (मीन)",
        },
        {
            label: "Ucch",
            hindi: "उच्च",
            value: "Cancer (कर्क)",
        },
        {
            label: "Neech",
            hindi: "नीच",
            value: "Capricorn (मकर)",
        },
        {
            label: "Disha",
            hindi: "दिशा",
            value: "North-East (ईशान)",
        },
        {
            label: "Rang",
            hindi: "रंग",
            value: "Yellow/Gold (पीला/सुनहरा)",
        },
        {
            label: "Ratan",
            hindi: "रत्न",
            value: "Pukhraj (पुखराज)",
        },
        {
            label: "Sankhya",
            hindi: "पक्का घर",
            value: "9,12",
        },
        {
            label: "Devta",
            hindi: "मंदे घर",
            value: "6,7,10",
        },
        {
            label: "",
            hindi: "श्रेष्ठ घर",
            value: "2,5,8,9,12",
        },
        {
            label: "Devta",
            hindi: "देवता",
            value: "Brihaspati (बृहस्पति)",
        },
        {
            label: "Day",
            hindi: "वार",
            value: "गुरुवार",
        },
        {
            label: "",
            hindi: "दान योग्य वस्तुएँ",
            value: "चना दाल, हल्दी, पुखराज, पीला वस्त्र, पीला फूल, केसर",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-tr from-yellow-50 to-yellow-200 p-6">
            <button onClick={handleBack} className="cursor-pointer">
                🔙 Go Back
            </button>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-yellow-800 drop-shadow-sm mb-4">गुरु / Jupiter</h1>
                <img
                    src="/Images/planets_Images/jupiter.png"
                    alt="Jupiter"
                    className="w-80 h-80 mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {attributes.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-12 border border-yellow-300 transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
                    >
                        <h3 className="text-xl font-semibold text-yellow-900 mb-2">
                            {item.hindi}
                            <hr className="mt-1" />
                        </h3>
                        <p className="text-yellow-800 text-lg">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
