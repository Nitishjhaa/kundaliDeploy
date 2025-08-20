import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Saturn() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const attributes = [
        {
            label: "Mitr Grah",
            hindi: "मित्र ग्रह",
            value: "Mercury (बुध), Venus (शुक्र), Rahu (राहु), Ketu (केतु)",
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
            value: "Capricorn (मकर), Aquarius (कुंभ)",
        },
        {
            label: "Ucch",
            hindi: "उच्च",
            value: "Libra (तुला)",
        },
        {
            label: "Neech",
            hindi: "नीच",
            value: "Aries (मेष)",
        },
        {
            label: "Disha",
            hindi: "दिशा",
            value: "West (पश्चिम)",
        },
        {
            label: "Rang",
            hindi: "रंग",
            value: "Blue/Black (नीला/काला)",
        },
        {
            label: "Ratan",
            hindi: "रत्न",
            value: "Blue Sapphire (नीलम)",
        },
        {
            label: "Sankhya",
            hindi: "पक्का घर",
            value: "10,11",
        },
        {
            label: "",
            hindi: "मंदे घर",
            value: "1,4,5,6",
        },
        {
            label: "",
            hindi: "श्रेष्ठ घर",
            value: "1,3,7,12",
        },
        {
            label: "Devta",
            hindi: "देवता",
            value: "Shanidev (शनि देव)",
        },
        {
            label: "Day",
            hindi: "वार",
            value: "शनिवार",
        },
        {
            label: "",
            hindi: "दान योग्य वस्तुएँ",
            value: "तिल, काली उड़द, नीलम, लोहा, काला कपड़ा, तेल",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-blue-100 p-6">
            <button onClick={handleBack} className="cursor-pointer">
                🔙 Go Back
            </button>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-blue-900 drop-shadow-sm mb-4">शनि / Saturn</h1>
                <img
                    src="/Images/planets_Images/saturn.png"
                    alt="Saturn"
                    className="w-80 h-80 mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {attributes.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-12 border border-blue-200 transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
                    >
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                            {item.hindi}
                            <hr className="mt-1" />
                        </h3>
                        <p className="text-blue-800 text-lg">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
