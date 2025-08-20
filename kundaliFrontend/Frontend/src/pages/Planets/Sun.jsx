import { useNavigate } from "react-router-dom";


export default function Sun() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Goes to previous location in history
    };


    const attributes = [
        {
            label: "Mitr Grah",
            hindi: "मित्र ग्रह",
            value: "Moon (चंद्र), Mars (मंगल), Jupiter (गुरु)",
        },
        {
            label: "Shatru Grah",
            hindi: "शत्रु ग्रह",
            value: "Venus (शुक्र), Saturn (शनि)",
        },
        {
            label: "Sam Grah",
            hindi: "सम ग्रह",
            value: "Mercury (बुध)",
        },
        {
            label: "Adipati",
            hindi: "आधिपति",
            value: "Leo (सिंह)",
        },
        {
            label: "Ucch",
            hindi: "उच्च",
            value: "Aries (मेष)",
        },
        {
            label: "Neech",
            hindi: "नीच",
            value: "Libra (तुला)",
        },
        {
            label: "Ling",
            hindi: "लिंग",
            value: "Male (पुरुष)",
        },
        {
            label: "Disha",
            hindi: "दिशा",
            value: "East (पूर्व)",
        },
        {
            label: "Rang",
            hindi: "रंग",
            value: "Red/Golden (लाल/सुनहरा)",
        },
        {
            label: "Ratan",
            hindi: "रत्न",
            value: "Ruby (माणिक)",
        },
        {
            label: "Sankhya",
            hindi: "पक्का घर",
            value: "1",
        },
        {
            label: "Devta",
            hindi: "मंदे घर",
            value: "6,7,10",
        },
        {
            label: "",
            hindi: "श्रेष्ठ घर",
            value: "1,5,8,9,11,12",
        },
        {
            label: "Devta",
            hindi: "देवता",
            value: "Agni (अग्नि)",
        },
        {
            label: "Day",
            hindi: "वार",
            value: "रविवार",
        },
        {
            label: "",
            hindi: "दान योग्य वस्तुएँ",
            value: "गेहूँ, तांबा, माणिक, गुड़, लाल कपड़ा, लाल फूल, चंदन की लकड़ी, केसर",
        },
    ];



    return (
        <div className="min-h-screen bg-gradient-to-tr from-yellow-50 to-yellow-100 p-6">
            <button onClick={handleBack} className="cursor-pointer">
                🔙 Go Back
            </button>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-yellow-700 drop-shadow-sm mb-4">सूर्य / Sun</h1>
                <img
                    src="/Images/planets_Images/sun.png"
                    alt="Sun"
                    className="w-80 h-80 mx-auto"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[...attributes].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-12 border border-yellow-200 transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
                    >
                        <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                            {item.hindi}
                            <hr className="mt-1"/>
                        </h3>
                        <p className="text-yellow-700 text-lg">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
