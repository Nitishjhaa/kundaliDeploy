import React, { useState } from "react";
import API from "../api";

const Remedies = () => {

  const getPlanetNameInHindi = (grah) => {
    const mapping = {
      Sun: "सूर्य",
      Moon: "चन्द्र",
      Mars: "मंगल",
      Mercury: "बुध",
      Jupiter: "गुरु",
      Venus: "शुक्र",
      Saturn: "शनि",
      Rahu: "राहु",
      Ketu: "केतु",
    };
    return mapping[grah] || grah;
  };

  const [grah, setGrah] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const grahOptions = [
    { english: "Sun", hindi: "सूर्य" },
    { english: "Moon", hindi: "चन्द्र" },
    { english: "Mars", hindi: "मंगल" },
    { english: "Mercury", hindi: "बुध" },
    { english: "Jupiter", hindi: "गुरु" },
    { english: "Venus", hindi: "शुक्र" },
    { english: "Saturn", hindi: "शनि" },
    { english: "Rahu", hindi: "राहु" },
    { english: "Ketu", hindi: "केतु" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!grah || !houseNumber) {
      setError("Please select both Grah and House Number.");
      return;
    }

    try {
      const response = await API.post("/api/remedy", {
           grah, houseNumber: Number(houseNumber) 
      });

      const data = response.data;
      
      if (data.error || data.message) {
        setError(data.error || data.message);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to fetch remedy.");
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl border border-[#f3e6c8] p-8 mt-10 mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[#a9741a] mb-2">विशिष्ट ग्रह उपाय</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        <div>
          <label className="block font-semibold text-[#964b00] mb-1">ग्रह:</label>
          <select
            value={grah}
            onChange={(e) => {
              setGrah(e.target.value);
              setResult(null);
            }}
            className="w-full border rounded-lg p-2 border-[#d4c2a4]"
          >
            <option value="">-- ग्रह चयन करें --</option>
            {grahOptions.map((g,index) => (
              <option key={index} value={g.english}>{g.hindi}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-[#964b00] mb-1">भाव संख्या:</label>
          <input
            type="number"
            min="1"
            max="12"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            className="w-full border rounded-lg p-2 border-[#d4c2a4]"
            placeholder="1 - 12"
          />
        </div>

        <div className="md:col-span-2 text-center">
          <div className="flex gap-5 justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-[#a9741a] text-white font-semibold rounded-lg hover:bg-[#8a5c15] transition"
            >
              Show Remedies
            </button>
            <button
              type="reset"
              className="px-6 py-2 bg-[#a9741a] text-white font-semibold rounded-lg hover:bg-[#8a5c15] transition"
              onClick={(e) => {
                  setResult(null)
                  setHouseNumber("")
                }
              }
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="text-red-600 font-medium text-center mb-4">{error}</div>
      )}

      {/* Remedy Result */}
      {result && (
        <div className="space-y-8 mt-4">
          <div
            className="p-5 rounded-xl shadow border mb-4"
            style={{ backgroundColor: "#FFC0CB", borderColor: "#e0c97d" }}
          >
            <h2 className="font-semibold text-[#964b00] mb-2">
              {getPlanetNameInHindi(grah)} - {result.houseNumber} भाव
            </h2>

            {typeof result.remedies === "string" &&
              result.remedies
                .split("\n")
                .map((line, idx) => {
                  const trimmedLine = line.trim();
                  return trimmedLine ? (
                    <p key={idx} className="text-sm text-gray-700 mb-1">
                      {trimmedLine}
                    </p>
                  ) : null;
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Remedies;
