import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Mars() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const attributes = [
        {
            label: "Mitr Grah",
            hindi: "मित्र ग्रह",
            value: "Sun (सूर्य), Moon (चंद्र), Jupiter (गुरु)",
        },
        {
            label: "Shatru Grah",
            hindi: "शत्रु ग्रह",
            value: "Mercury (बुध)",
        },
        {
            label: "Sam Grah",
            hindi: "सम ग्रह",
            value: "Venus (शुक्र), Saturn (शनि)",
        },
        {
            label: "Adipati",
            hindi: "आधिपति",
            value: "Aries (मेष), Scorpio (वृश्चिक)",
        },
        {
            label: "Ucch",
            hindi: "उच्च",
            value: "Capricorn (मकर)",
        },
        {
            label: "Neech",
            hindi: "नीच",
            value: "Cancer (कर्क)",
        },
        {
            label: "Disha",
            hindi: "दिशा",
            value: "South (दक्षिण)",
        },
        {
            label: "Rang",
            hindi: "रंग",
            value: "Red (लाल)",
        },
        {
            label: "Ratan",
            hindi: "रत्न",
            value: "Coral (मूंगा)",
        },
        {
            label: "Sankhya",
            hindi: "पक्का घर",
            value: "1,8",
        },
        {
            label: "Devta",
            hindi: "मंदे घर",
            value: "3,6,11,12",
        },
        {
            label: "",
            hindi: "श्रेष्ठ घर",
            value: "2,4,5,7,9,10",
        },
        {
            label: "Devta",
            hindi: "देवता",
            value: "Kartikeya (कार्तिकेय)",
        },
        {
            label: "Day",
            hindi: "वार",
            value: "मंगलवार",
        },
        {
            label: "",
            hindi: "दान योग्य वस्तुएँ",
            value: "मूंगा, मसूर दाल, लाल चंदन, गुड़, तांबे के बर्तन",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-tr from-red-50 to-rose-100 p-6">
            <button onClick={handleBack} className="cursor-pointer">
                🔙 Go Back
            </button>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-red-700 drop-shadow-sm mb-4">मंगल / Mars</h1>
                <img
                    src="/Images/planets_Images/mars.png"
                    alt="Mars"
                    className="w-80 h-80 mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[...attributes].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-12 border border-red-200 transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
                    >
                        <h3 className="text-xl font-semibold text-red-800 mb-2">
                            {item.hindi}
                            <hr className="mt-1" />
                        </h3>
                        <p className="text-red-700 text-lg">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
