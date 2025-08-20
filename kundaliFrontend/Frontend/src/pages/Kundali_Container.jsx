import React from 'react'
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Basic_Information from '../components/Basic_Information';
import KundaliChart from '../components/VedikKundali';
import InfoOfKundali from '../components/InfoOfKundali';
import ChandraKundaliChart from '../components/chandraKundali';
import NavmanshKundali from '../components/NavmanshKundli'
import SunKundaliChart from '../components/SunKundali';
import Mahadasha from './Mahadasha';
import LaganData from '../components/LaganData'


const Kundali_Container = () => {
    const location = useLocation();
    const data = location.state?.data;
    const [activeTab, setActiveTab] = useState("lagan");

    function convertToDMS(decimal) {
        const degrees = Math.floor(decimal);
        const minutesDecimal = (decimal - degrees) * 60;
        const minutes = Math.floor(minutesDecimal);
        const seconds = Math.floor((minutesDecimal - minutes) * 60);

        // Pad with 0 if needed
        const pad = (n) => String(n).padStart(2, '0');

        return `${pad(degrees)}:${pad(minutes)}:${pad(seconds)}`;
    }

    const colorPicker = () => {
        const colors = [
            '#1a1a1a', '#2e2e2e', '#3b3b3b', '#4b4b4b', '#212121', '#0d0d0d', '#880e4f', '#ad1457', '#6a1b9a', '#4a148c', '#4527a0', '#283593', '#1a237e', '#0d47a1', '#1565c0', '#1e88e5', '#3949ab', '#003c8f', '#01579b', '#006064', '#004d40', '#1b5e20', '#2e7d32', '#33691e', '#558b2f', '#3e2723', '#4e342e', '#5d4037', '#6d4c41', '#bf360c', '#d84315', '#e64a19', '#ff5722', '#f4511e', '#263238', '#37474f', '#455a64', '#607d8b', '#3c3f41', '#2c3e50', '#34495e', '#22313f',];

        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    function separatePurnDrishti(purnDrishti) {

        if (Array.isArray(purnDrishti)) {
            return purnDrishti.join(', ');
        }
        return '';
    }

    const planetData = [
        {
            ansh: convertToDMS(data?.sun?.anshSidereal),
            nakshatra: data?.sun?.nakshatra?.nakName,
            charan: data?.sun?.nakshatra?.nakPada,
            rashi: data?.sun?.placement?.zodiac,
            bhaav: data?.sun?.placement?.house,
            tatva: data?.Tatva?.planetTattvas?.sun
        },
        {
            ansh: convertToDMS(data?.moon?.anshSidereal),
            nakshatra: data?.moon?.nakshatra?.nakName,
            charan: data?.moon?.nakshatra?.nakPada,
            rashi: data?.moon?.placement?.zodiac,
            bhaav: data?.moon?.placement?.house,
            tatva: data?.Tatva?.planetTattvas?.moon
        },
        {
            ansh: convertToDMS(data?.mars?.anshSidereal),
            nakshatra: data?.mars?.nakshatra?.nakName,
            charan: data?.mars?.nakshatra?.nakPada,
            rashi: data?.mars?.placement?.zodiac,
            bhaav: data?.mars?.placement?.house,
            tatva: data?.Tatva?.planetTattvas?.mars
        },
        {
            ansh: convertToDMS(data?.mercury?.anshSidereal),
            nakshatra: data?.mercury?.nakshatra?.nakName,
            charan: data?.mercury?.nakshatra?.nakPada,
            rashi: data?.mercury?.placement?.zodiac,
            bhaav: data?.mercury?.placement?.house,
            tatva: data?.Tatva?.planetTattvas?.mercury
        },
        {
            ansh: convertToDMS(data?.jupiter?.anshSidereal),
            nakshatra: data?.jupiter?.nakshatra?.nakName,
            charan: data?.jupiter?.nakshatra?.nakPada,
            rashi: data?.jupiter?.placement?.zodiac,
            bhaav: data?.jupiter?.placement?.house,
            tatva: data?.Tatva?.planetTattvas?.jupiter
        },
        {
            ansh: convertToDMS(data?.venus?.anshSidereal),
            nakshatra: data?.venus?.nakshatra?.nakName,
            charan: data?.venus?.nakshatra?.nakPada,
            rashi: data?.venus?.placement?.zodiac,
            bhaav: data?.venus?.placement?.house,
            tatva: data?.Tatva?.planetTattvas?.venus
        },
        {
            ansh: convertToDMS(data?.saturn?.anshSidereal),
            nakshatra: data?.saturn?.nakshatra?.nakName,
            charan: data?.saturn?.nakshatra?.nakPada,
            rashi: data?.saturn?.placement?.zodiac,
            bhaav: data?.saturn?.placement?.house,
            tatva: data?.Tatva?.planetTattvas?.saturn
        },
        {
            ansh: convertToDMS(data?.rahu?.anshSidereal),
            nakshatra: data?.rahu?.nakshatra?.nakName,
            charan: data?.rahu?.nakshatra?.nakPada,
            rashi: data?.rahu?.placement?.zodiac,
            bhaav: data?.rahu?.placement?.house,
            tatva: data?.Tatva?.planetTattvas?.rahu
        },
        {
            ansh: convertToDMS(data?.ketu?.anshSidereal),
            nakshatra: data?.ketu?.nakshatra?.nakName,
            charan: data?.ketu?.nakshatra?.nakPada,
            rashi: data?.ketu?.placement?.zodiac,
            bhaav: data?.ketu?.placement?.house,
            tatva: data?.Tatva?.planetTattvas?.ketu
        },
    ];

    const planetsAspects = [
        {
            FullAspect: separatePurnDrishti(data?.grahoKiDristi?.Sun?.purnDrishti),
            OneFooted: separatePurnDrishti(data?.grahoKiDristi?.Sun?.ekPaadDrishti),
            twoFooted: separatePurnDrishti(data?.grahoKiDristi?.Sun?.doPaadDrishti),
            threeFooted: separatePurnDrishti(data?.grahoKiDristi?.Sun?.teenPaadDrishti),
        },
        {
            FullAspect: separatePurnDrishti(data?.grahoKiDristi?.Moon?.purnDrishti),
            OneFooted: separatePurnDrishti(data?.grahoKiDristi?.Moon?.ekPaadDrishti),
            twoFooted: separatePurnDrishti(data?.grahoKiDristi?.Moon?.doPaadDrishti),
            threeFooted: separatePurnDrishti(data?.grahoKiDristi?.Moon?.teenPaadDrishti),
        },
        {
            FullAspect: separatePurnDrishti(data?.grahoKiDristi?.Mars?.purnDrishti),
            OneFooted: separatePurnDrishti(data?.grahoKiDristi?.Mars?.ekPaadDrishti),
            twoFooted: separatePurnDrishti(data?.grahoKiDristi?.Mars?.doPaadDrishti),
            threeFooted: separatePurnDrishti(data?.grahoKiDristi?.Mars?.teenPaadDrishti),
        },
        {
            FullAspect: separatePurnDrishti(data?.grahoKiDristi?.Mercury?.purnDrishti),
            OneFooted: separatePurnDrishti(data?.grahoKiDristi?.Mercury?.ekPaadDrishti),
            twoFooted: separatePurnDrishti(data?.grahoKiDristi?.Mercury?.doPaadDrishti),
            threeFooted: separatePurnDrishti(data?.grahoKiDristi?.Mercury?.teenPaadDrishti),
        },
        {
            FullAspect: separatePurnDrishti(data?.grahoKiDristi?.Jupiter?.purnDrishti),
            OneFooted: separatePurnDrishti(data?.grahoKiDristi?.Jupiter?.ekPaadDrishti),
            twoFooted: separatePurnDrishti(data?.grahoKiDristi?.Jupiter?.doPaadDrishti),
            threeFooted: separatePurnDrishti(data?.grahoKiDristi?.Jupiter?.teenPaadDrishti),
        },
        {
            FullAspect: separatePurnDrishti(data?.grahoKiDristi?.Venus?.purnDrishti),
            OneFooted: separatePurnDrishti(data?.grahoKiDristi?.Venus?.ekPaadDrishti),
            twoFooted: separatePurnDrishti(data?.grahoKiDristi?.Venus?.doPaadDrishti),
            threeFooted: separatePurnDrishti(data?.grahoKiDristi?.Venus?.teenPaadDrishti),
        },
        {
            FullAspect: separatePurnDrishti(data?.grahoKiDristi?.Saturn?.purnDrishti),
            OneFooted: separatePurnDrishti(data?.grahoKiDristi?.Saturn?.ekPaadDrishti),
            twoFooted: separatePurnDrishti(data?.grahoKiDristi?.Saturn?.doPaadDrishti),
            threeFooted: separatePurnDrishti(data?.grahoKiDristi?.Saturn?.teenPaadDrishti),
        },
        {
            FullAspect: separatePurnDrishti(data?.grahoKiDristi?.Rahu?.purnDrishti),
            OneFooted: separatePurnDrishti(data?.grahoKiDristi?.Rahu?.ekPaadDrishti),
            twoFooted: separatePurnDrishti(data?.grahoKiDristi?.Rahu?.doPaadDrishti),
            threeFooted: separatePurnDrishti(data?.grahoKiDristi?.Rahu?.teenPaadDrishti),
        },
        {
            FullAspect: separatePurnDrishti(data?.grahoKiDristi?.Ketu?.purnDrishti),
            OneFooted: separatePurnDrishti(data?.grahoKiDristi?.Ketu?.ekPaadDrishti),
            twoFooted: separatePurnDrishti(data?.grahoKiDristi?.Ketu?.doPaadDrishti),
            threeFooted: separatePurnDrishti(data?.grahoKiDristi?.Ketu?.teenPaadDrishti),
        }
    ];


    const navamsaPlanets = data?.navmanshKundaliData?.planets;

    const getHouseNumber = (planet) => {
        if (!navamsaPlanets) return null;
        for (const [house, planets] of Object.entries(navamsaPlanets)) {
            if (planets.includes(planet)) {
                return parseInt(house);
            }
        }
        return null;
    };

    function extractHindiName(nameStr = "") {
        return nameStr
            .split(',')
            .map(part => part.trim())
            .find(part => /[\u0900-\u097F]/.test(part)) || "नाम उपलब्ध नहीं";
    }

    function extractHindi(text) {
        const parts = text.split(',');
        return parts[1]?.trim() || '';
    }

    function extractHindiWithSlash(text) {
        const parts = text.split('/');
        return parts[1]?.trim() || '';
    }


    return (
        <div className='bg-gradient-to-b from-[#fff] to-[#fff]'>
            {data && (
                <div className=''>
                    <div className=''>
                        {data && <Basic_Information data={data} />}
                    </div>
                    <div className='flex justify-center items-center mt-0' >
                        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#f3e6c8] p-10 mt-10 relative overflow-hidden flex justify-center items-center flex-col"
                        >
                            <div className="flex justify-center gap-4 mt-6 mb-4 flex-wrap">
                                {["lagan", "chandra", "navmansh", "surya"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4.5 py-2.5 font-semibold ${activeTab === tab ? "bg-[#B8860B] text-white" : "bg-[#fdf5e6] text-[#B8860B] border border-[#B8860B] rounded-xl"}`}
                                    >
                                        {tab === "lagan" && "लग्न कुंडली"}
                                        {tab === "chandra" && " चन्द्र कुंडली"}
                                        {tab === "navmansh" && "नवमांश कुंडली"}
                                        {tab === "surya" && "सूर्य कुंडली"}
                                    </button>
                                ))}
                            </div>

                            {/* Lagan Kundali */}
                            {activeTab === "lagan" && data.ascendant && (
                                <>
                                    <KundaliChart
                                        ascendant={data?.ascendant}
                                        sun={data?.sun?.placement?.house}
                                        moon={data?.moon?.placement?.house}
                                        mars={data?.mars?.placement?.house}
                                        mercury={data?.mercury?.placement?.house}
                                        jupiter={data?.jupiter?.placement?.house}
                                        venus={data?.venus?.placement?.house}
                                        saturn={data?.saturn?.placement?.house}
                                        rahu={data?.rahu?.placement?.house}
                                        ketu={data?.ketu?.placement?.house}
                                    />

                                    {/* Planet Table */}
                                    <div className='flex justify-center items-center '>
                                        <div className='w-[100%] pb-10'>
                                            <h2 className='mb-3 text-2xl text-center text-[#B8860B]'>
                                                Planet's Position / ग्रहों की स्थिति
                                            </h2>
                                            <table className="w-full max-md:ml-[5%] border-2 border-yellow-400 text-sm max-md:w-[80%] max-sm:-ml-0">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-6 max-sm:px-3 py-2 text-left">ग्रह</th>
                                                        <th className="px-6 max-sm:px-3 py-2 text-left">अंश </th>
                                                        <th className="px-6 max-sm:px-3 py-2 text-left">नक्षत्र /(च)</th>
                                                        <th className="px-6 max-sm:px-3 py-2 text-left">राशि </th>
                                                        <th className="px-6 max-sm:px-3 py-2 text-left">भाव </th>
                                                        <th className="px-6 max-sm:px-3 py-2 text-left">तत्त्व</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[
                                                        { hi: "सूर्य", en: "Sun", link: '/sun' },
                                                        { hi: "चंद्र", en: "Moon", link: '/moon' },
                                                        { hi: "मंगल", en: "Mars", link: '/mars' },
                                                        { hi: "बुध", en: "Mercury", link: '/mercury' },
                                                        { hi: "गुरु", en: "Jupiter", link: '/jupiter' },
                                                        { hi: "शुक्र", en: "Venus", link: '/venus' },
                                                        { hi: "शनि", en: "Saturn", link: '/saturn' },
                                                        { hi: "राहु", en: "Rahu", link: '/rahu' },
                                                        { hi: "केतु", en: "Ketu", link: '/ketu' },
                                                    ].map((planet, i) => {
                                                        const pdata = planetData[i] || {};
                                                        return (
                                                            <tr key={i}>
                                                                <td className="px-2 font-semibold py-4 text-center border-2 border-yellow-400" style={{ color: colorPicker() }}>
                                                                    <Link to={planet.link}>
                                                                        {planet.hi}
                                                                    </Link>
                                                                </td>
                                                                <td className="px-2 py-4 text-center border-2 border-yellow-400">{pdata.ansh || "--°--'"}</td>
                                                                <td className="px-2 py-4 text-center border-2 border-yellow-400">{extractHindi(pdata.nakshatra) || "---"} {pdata.charan ? `(${pdata.charan})` : ""}</td>
                                                                <td className="px-2 py-4 text-center border-2 border-yellow-400">{extractHindi(pdata.rashi) || "--"}</td>
                                                                <td className="px-2 py-4 text-center border-2 border-yellow-400">{pdata.bhaav || "--"}</td>
                                                                <td className="px-2 py-4 text-center border-2 border-yellow-400">{extractHindiWithSlash(pdata.tatva) || "--"}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* planets aspacts */}

                                    <div className='flex flex-col justify-center items-center '>
                                        <div className='w-[100%]'>
                                            <h2 className='mb-3 text-2xl text-center text-[#B8860B]'>
                                                Planetary Aspects / ग्रहों की दृष्टि
                                            </h2>
                                        </div>
                                        <table className="w-full border-2 border-yellow-400 text-sm max-md:w-[80%] ">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 max-sm:px-5.5 py-2 text-left">ग्रह </th>
                                                    <th className="px-6 max-sm:px-5.5 py-2 text-left">पूर्ण दृष्टि </th>
                                                    <th className="px-6 max-sm:px-5.5 py-2 text-left">1 पाद-दृष्टि </th>
                                                    <th className="px-6 max-sm:px-5.5 py-2 text-left">2 पाद-दृष्टि </th>
                                                    <th className="px-6 max-sm:px-5.5 py-2 text-left">3 पाद-दृष्टि </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { hi: "सूर्य", en: "Sun", link: '/sun' },
                                                    { hi: "चंद्र", en: "Moon", link: '/moon' },
                                                    { hi: "मंगल", en: "Mars", link: '/mars' },
                                                    { hi: "बुध", en: "Mercury", link: '/mercury' },
                                                    { hi: "गुरु", en: "Jupiter", link: '/jupiter' },
                                                    { hi: "शुक्र", en: "Venus", link: '/venus' },
                                                    { hi: "शनि", en: "Saturn", link: '/saturn' },
                                                    { hi: "राहु", en: "Rahu", link: '/rahu' },
                                                    { hi: "केतु", en: "Ketu", link: '/ketu' },
                                                ].map((planet, i) => {
                                                    const pdata = planetsAspects[i] || {};
                                                    return (
                                                        <tr key={i}>
                                                            <td className="px-2 font-semibold py-4 text-center border-2 border-yellow-400" style={{ color: colorPicker() }}>
                                                                <Link to={planet.link}>
                                                                    {planet.hi}
                                                                </Link>
                                                            </td>
                                                            <td className="px-2 py-4 text-center border-2 border-yellow-400">{pdata.FullAspect || "--°--'"}</td>
                                                            <td className="px-2 py-4 text-center border-2 border-yellow-400">{pdata.OneFooted || "---"} {pdata.charan ? `(${pdata.charan})` : ""}</td>
                                                            <td className="px-2 py-4 text-center border-2 border-yellow-400">{pdata.twoFooted || "--"}</td>
                                                            <td className="px-2 py-4 text-center border-2 border-yellow-400">{pdata.threeFooted || "--"}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )}

                            {/* Chandra Kundali */}
                            {activeTab === "chandra" && data && (
                                <ChandraKundaliChart
                                    ascendant={data?.moon?.moonAscandentNumber?.chandraMoonZodiac}
                                    sun={data?.sun?.placement?.house}
                                    moon={data?.moon?.placement?.house}
                                    mars={data?.mars?.placement?.house}
                                    mercury={data?.mercury?.placement?.house}
                                    jupiter={data?.jupiter?.placement?.house}
                                    venus={data?.venus?.placement?.house}
                                    saturn={data?.saturn?.placement?.house}
                                    rahu={data?.rahu?.placement?.house}
                                    ketu={data?.ketu?.placement?.house}
                                    moonOffset={data?.moon?.moonAscandentNumber?.offset}
                                />
                            )}

                            {/* Navmansh Kundali Placeholder */}
                            {activeTab === "navmansh" && data && (
                                <NavmanshKundali
                                    ascendant={{
                                        calculated: { zodiac: data?.navmanshKundaliData?.navamsaAscendantSign }
                                    }}
                                    sun={getHouseNumber("sun")}
                                    moon={getHouseNumber("moon")}
                                    mars={getHouseNumber("mars")}
                                    mercury={getHouseNumber("mercury")}
                                    jupiter={getHouseNumber("jupiter")}
                                    venus={getHouseNumber("venus")}
                                    saturn={getHouseNumber("saturn")}
                                    rahu={getHouseNumber("rahu")}
                                    ketu={getHouseNumber("ketu")}
                                />
                            )}

                            {/* Mahadasha Placeholder */}
                            {activeTab === "surya" && (
                                <SunKundaliChart
                                    ascendant={data?.sun?.sunAscandentNumber?.sunZodiac}
                                    sun={data?.sun?.placement?.house}
                                    moon={data?.moon?.placement?.house}
                                    mars={data?.mars?.placement?.house}
                                    mercury={data?.mercury?.placement?.house}
                                    jupiter={data?.jupiter?.placement?.house}
                                    venus={data?.venus?.placement?.house}
                                    saturn={data?.saturn?.placement?.house}
                                    rahu={data?.rahu?.placement?.house}
                                    ketu={data?.ketu?.placement?.house}
                                    sunOffset={data?.sun?.sunAscandentNumber?.offset}
                                />
                            )}
                        </div>
                    </div>
                    {/* lagan */}
                    <div className="w-full flex justify-center mt-10">
                        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-[#f3e6c8] p-8">
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold text-[#a9741a] mb-2">
                                    लग्न
                                </h1>
                                <h1 className="text-lg font-bold text-[#6b4c1e] mb-2">
                                    {extractHindiName(data?.ascendant?.calculated?.zodiac)} लग्न
                                </h1>
                                <div className="flex justify-center items-center ">
                                    <LaganData data={data?.LaganData} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* mahadasha */}
                    <div>
                        <Mahadasha />
                    </div>


                    <div>
                        <InfoOfKundali data={data} />
                    </div>



                    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                </div>

            )}
        </div>
    )
}

export default Kundali_Container
