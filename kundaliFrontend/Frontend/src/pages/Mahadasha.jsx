import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { BsArrow90DegDown } from "react-icons/bs";


const translatePlanetToHindi = (planet) => {

  const translations = {
    Sun: 'सूर्य',
    Moon: 'चंद्र',
    Mars: 'मंगल',
    Mercury: 'बुध',
    Jupiter: 'गुरु',
    Venus: 'शुक्र',
    Saturn: 'शनि',
    Rahu: 'राहु',
    Ketu: 'केतु'
  };
  return translations[planet] || planet;
};

const Mahadasha = () => {

  const location = useLocation();
  const data = location.state?.data;

  const [openMahadashaIndex, setOpenMahadashaIndex] = useState(null);
  const [openAntardashaIndex, setOpenAntardashaIndex] = useState(null);

  const toggleMahadasha = (index) => {
    setOpenMahadashaIndex(openMahadashaIndex === index ? null : index);
    setOpenAntardashaIndex(null); // reset antardasha on toggle
  };

  const toggleAntardasha = (index) => {
    setOpenAntardashaIndex(openAntardashaIndex === index ? null : index);
  };

  return (
    <div className={`w-full flex flex-col justify-center items-center mt-10 px-4`}>
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#f3e6c8] p-8 max-md:p-2">
        <h2 className="text-2xl text-center text-[#b8860b] font-semibold pb-2">
          महादशा
        </h2>
        <div className="grid grid-cols-3 gap-4 p-4 max-md:grid-cols-1">
          {data?.mahadasha?.map((dasha, index) => {
            const currentDate = new Date();
            const startDate = new Date(dasha.start);
            const endDate = new Date(dasha.end);
            const isActive = currentDate >= startDate && currentDate <= endDate;

            return (
              <div key={index} className="border border-gray-200 rounded-2xl shadow-sm">
                <div
                  onClick={() => toggleMahadasha(index)}
                  className={`cursor-pointer p-6 transition-transform rounded-2xl duration-300 ${isActive ? 'bg-yellow-50 border-[#f3e6c8]' : 'bg-white'}`}
                >
                  <h3 className={`text-xl font-bold ${isActive ? 'text-yellow-500' : 'text-gray-800'} mb-2 tracking-wide`}>
                    {translatePlanetToHindi(dasha.planet)}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-bold"></span>{" "}
                      {new Date(dasha.start).toLocaleDateString("en-GB")}
                    </p>
                    <p>
                      <span className="font-bold"></span>{" "}
                      {new Date(dasha.end).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>

                {openMahadashaIndex === index && (
                  <div className="bg-gray-50 p-4 rounded-b-2xl space-y-4">
                    {dasha.antardasha?.map((antar, aIndex) => {
                      const antarActive = currentDate >= new Date(antar.start) && currentDate <= new Date(antar.end);

                      return (
                        <div key={aIndex}>
                          <div
                            onClick={() => toggleAntardasha(aIndex)}
                            className={`cursor-pointer p-4 rounded-xl ${antarActive ? 'bg-green-50' : 'bg-white'} border border-gray-300`}
                          >
                            <h4 className={`text-md flex gap-4 font-semibold ${antarActive ? 'text-green-600' : 'text-gray-700'}`}>
                              <BsArrow90DegDown size={13} />
                              {translatePlanetToHindi(antar.planet)}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {new Date(antar.start).toLocaleDateString("en-GB")} –{" "}
                              {new Date(antar.end).toLocaleDateString("en-GB")}
                            </p>
                          </div>

                          {openAntardashaIndex === aIndex && (
                            <div className="ml-6 mt-2 space-y-2">
                              {antar.pratyantardasha?.map((pratya, pIndex) => {
                                const pratyaActive = currentDate >= new Date(pratya.start) && currentDate <= new Date(pratya.end);

                                return (
                                  <div
                                    key={pIndex}
                                    className={`p-3 rounded-lg border text-sm ${pratyaActive ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-600'}`}
                                  >
                                    <span className="font-medium">{translatePlanetToHindi(pratya.planet)}</span>:{" "}
                                    {new Date(pratya.start).toLocaleDateString("en-GB")} –{" "}
                                    {new Date(pratya.end).toLocaleDateString("en-GB")}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Mahadasha;
