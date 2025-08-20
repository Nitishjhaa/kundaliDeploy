import { useLocation } from "react-router-dom";
import lord_ganesh from '/Images/lord_ganesh.png';
import KundaliChart from './VedikKundali';


const MatchMatchingResult = () => {
  const location = useLocation();
  const data = location.state?.data;



  const details = [
    [
      { label: "Name / नाम", value: data?.boy?.name },
      { label: "Date Of Birth / जन्म तिथि", value: data?.boy?.panchanga?.dateOfBirth },
      { label: "Birth Of Time / जन्म समय", value: data?.boy?.panchanga?.birthOfTime },
      { label: "Longitude / देशांतर", value: data?.boy?.lon },
      { label: "Latitude / अक्षांश", value: data?.boy?.lat },
      { label: "Birth Place / जन्म स्थान", value: data?.boy?.city },
      { label: "Nakshatra / नक्षत्र", value: data?.boy?.moon?.nakshatra?.nakName },
      { label: "Quarter / चरण", value: data?.boy?.moon?.nakshatra?.nakPada },
      { label: "Ascendant / लग्न", value: data?.boy?.ascendant?.calculated?.zodiac },
      { label: "Zodiac Sign / राशि", value: data?.boy?.moon?.placement?.zodiac },
    ],
    [

      { label: "Name / नाम", value: data?.girl?.name },
      { label: "Date Of Birth / जन्म तिथि", value: data?.girl?.panchanga?.dateOfBirth },
      { label: "Birth Of Time / जन्म समय", value: data?.girl?.panchanga?.birthOfTime },
      { label: "Longitude / देशांतर", value: data?.girl?.lon },
      { label: "Latitude / अक्षांश", value: data?.girl?.lat },
      { label: "Birth Place / जन्म स्थान", value: data?.girl?.city },
      { label: "Nakshatra / नक्षत्र", value: data?.girl?.moon?.nakshatra?.nakName },
      { label: "Quarter / चरण", value: data?.girl?.moon?.nakshatra?.nakPada },
      { label: "Ascendant / लग्न", value: data?.girl?.ascendant?.calculated?.zodiac },
      { label: "Zodiac Sign / राशि", value: data?.girl?.moon?.placement?.zodiac },
    ]
  ];

  const dataofmilan = [
    {
      label: 'वर्ण',
      boy: data?.boy?.matchMatchingnakInfo?.varna,
      girl: data?.girl?.matchMatchingnakInfo?.varna,
      score: data?.totalgan?.individualScores?.varna,
      totalScore: 1
    },
    {
      label: 'वश्य',
      boy: data?.boy?.matchMatchingnakInfo?.vashya,
      girl: data?.girl?.matchMatchingnakInfo?.vashya,
      score: data?.totalgan?.individualScores?.vashya,
      totalScore: 2
    },
    {
      label: 'तारा',
      boy: data?.tara?.taraBoyToGirl,
      girl: data?.tara?.taraGirlToBoy,
      score: data?.tara?.points,
      totalScore: 3
    },
    {
      label: 'योनि',
      boy: data?.boy?.matchMatchingnakInfo?.yoni,
      girl: data?.girl?.matchMatchingnakInfo?.yoni,
      score: data?.totalgan?.individualScores?.yoni,
      totalScore: 4
    },
    {
      label: 'ग्रह मैत्री',
      boy: data?.boy?.matchMatchingnakInfo?.grahaMaitri,
      girl: data?.girl?.matchMatchingnakInfo?.grahaMaitri,
      score: data?.totalgan?.individualScores?.grahaMaitri,
      totalScore: 5
    },
    {
      label: 'गण',
      boy: data?.boy?.matchMatchingnakInfo?.gana,
      girl: data?.girl?.matchMatchingnakInfo?.gana,
      score: data?.totalgan?.individualScores?.gana,
      totalScore: 6
    },
    {
      label: 'भकूट',
      boy: data?.boy?.matchMatchingnakInfo?.bhakoot,
      girl: data?.girl?.matchMatchingnakInfo?.bhakoot,
      score: data?.totalgan?.individualScores?.bhakoot,
      totalScore: 7
    },
    {
      label: 'नाड़ी',
      boy: data?.boy?.matchMatchingnakInfo?.nadi,
      girl: data?.girl?.matchMatchingnakInfo?.nadi,
      score: data?.totalgan?.individualScores?.nadi,
      totalScore: 8
    }
  ];

  return (
    <div>
      <div className=''>
        <div className='flex flex-col items-center min-h-screen p-6 sm:p-10'>
          <h1 className='text-4xl lg:text-5xl font-bold text-[#B8860B] mb-6 sm:mb-10 text-center'>श्री गणेशाय नमः</h1>

          <div className='w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4'>
            <img src={lord_ganesh} alt='lord ganesh' className='w-full drop-shadow-lg' />
          </div>

          <h2 className='text-lg lg:text-2xl text-[#DCBA4F] font-semibold text-center mt-6 sm:mt-8 leading-relaxed'>
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । <br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
          </h2>

          <div className='mt-10 w-full flex flex-col items-center'>
            <h1 className='text-2xl sm:text-4xl font-bold text-[#005f56]'>मिलान</h1>

            <div className='w-full max-w-5xl bg-white rounded-3xl border border-[#f3e6c8] p-6 sm:p-10 mt-6 sm:mt-10 relative overflow-hidden'>
              <div className='w-full flex flex-col lg:flex-row justify-center gap-6'>
                {/* लड़का */}
                <div className='w-full lg:w-1/2'>
                  <div className='text-center text-xl sm:text-2xl mb-4 sm:mb-5'>लड़का</div>
                  <div className='flex flex-col gap-3 text-base sm:text-lg text-gray-800'>
                    {details[0].map((item, index) => (
                      <div key={index} className='bg-[#fefbc0] p-3 sm:p-4 shadow-md flex justify-between items-center'>
                        <span className='text-[#8B0000] font-semibold'>{item.label}</span>
                        <span className='text-[#005f56] font-medium'>{item.value || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* लड़की */}
                <div className='w-full lg:w-1/2'>
                  <div className='text-center text-xl sm:text-2xl mb-4 sm:mb-5'>लड़की</div>
                  <div className='flex flex-col gap-3 text-base sm:text-lg text-gray-800'>
                    {details[1].map((item, index) => (
                      <div key={index} className='bg-gradient-to-r from-[#fff4e6] to-[#ffedd5] p-3 sm:p-4 shadow-md flex justify-between items-center'>
                        <span className='text-[#8B0000] font-semibold'>{item.label}</span>
                        <span className='text-[#005f56] font-medium'>{item.value || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='w-full bg-white rounded-3xl relative overflow-hidden -mt-5 '>
        <div className='flex w-[100%] mx-auto max-lg:flex-col'>
          <div className='w-1/2 translate-x-60 max-lg:translate-x-0 max-lg:w-full max-sm:scale-90 max-sm:-ml-23'>
            <KundaliChart
              ascendant={data?.boy?.ascendant}
              sun={data?.boy?.sun?.placement?.house}
              moon={data?.boy?.moon?.placement?.house}
              mars={data?.boy?.mars?.placement?.house}
              mercury={data?.boy?.mercury?.placement?.house}
              jupiter={data?.boy?.jupiter?.placement?.house}
              venus={data?.boy?.venus?.placement?.house}
              saturn={data?.boy?.saturn?.placement?.house}
              rahu={data?.boy?.rahu?.placement?.house}
              ketu={data?.boy?.ketu?.placement?.house}
            />
          </div>
          <div className='w-1/2 -translate-x-10 max-lg:-translate-x-0 max-lg:w-full max-sm:scale-90 max-sm:-ml-23 max-sm:-mt-20'>
            <KundaliChart
              ascendant={data?.girl?.ascendant}
              sun={data?.girl?.sun?.placement?.house}
              moon={data?.girl?.moon?.placement?.house}
              mars={data?.girl?.mars?.placement?.house}
              mercury={data?.girl?.mercury?.placement?.house}
              jupiter={data?.girl?.jupiter?.placement?.house}
              venus={data?.girl?.venus?.placement?.house}
              saturn={data?.girl?.saturn?.placement?.house}
              rahu={data?.girl?.rahu?.placement?.house}
              ketu={data?.girl?.ketu?.placement?.house}
            />
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-6 sm:px-6 md:px-8">
        <div className="relative w-full rounded-2xl border border-yellow-300 bg-gradient-to-br from-yellow-100 via-orange-50 to-red-50 backdrop-blur-sm overflow-hidden">
          {/* Background overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[url('/constellation-bg.svg')] bg-cover bg-center opacity-10 z-0" />
          {/* Grid Content */}
          <div className="relative z-10 divide-y divide-yellow-500">
            {/* Table Headings */}
            <div className="flex flex-wrap justify-between px-6 py-4 font-bold text-yellow-800 bg-yellow-200/60 rounded-t-2xl">
              <span className="w-1/5 sm:w-1/5">अष्टकूट</span>
              <span className="w-1/5 sm:w-1/5 text-center">लड़का</span>
              <span className="w-1/5 sm:w-1/5 text-center">लड़की</span>
              <span className="w-1/5 sm:w-1/5 text-center">प्राप्त अंक</span>
              <span className="w-1/5 sm:w-1/5 text-center">कुल अंक</span>
            </div>

            {/* Dynamic Rows */}
            {dataofmilan.map((item, index) => (
              <div
                key={index}
                className={`flex flex-wrap items-center justify-between px-6 py-4 transition-all duration-300 font-serif ${index % 2 === 0 ? 'bg-white/50' : 'bg-yellow-100/40'} hover:bg-yellow-200/50`}
              >
                <span className="w-1/5 text-yellow-900 font-semibold">{item.label}</span>
                <span className="w-1/5 text-center text-[#005f56]">{item.boy}</span>
                <span className="w-1/5 text-center text-[#005f56]">{item.girl}</span>
                <span className="w-1/5 text-center font-semibold text-green-700">{item.score}</span>
                <span className="w-1/5 text-center font-semibold text-green-700">{item.totalScore}</span>
              </div>
            ))}

            {/* Total Row */}
            <div className="flex flex-wrap justify-between px-6 py-4 bg-white font-bold text-green-800 rounded-b-2xl">
              <span className="w-3/5 text-center">Total</span>
              <span className="w-1/5 text-center">{data?.totalMatchMatchingGun}</span>
              <span className="w-1/5 text-center">36</span>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto'>
        <div className="px-6 py-4 mt-6 rounded-2xl font-serif shadow-md border border-yellow-200">
          <h2 className="text-2xl font-bold text-yellow-900 mb-4 text-center">ग्रहो के तत्त्व</h2>
          <div class="w-full mx-auto border border-gray-300 rounded-lg overflow-hidden text-sm">
            <div class="flex font-semibold bg-gray-100 border-b border-gray-300">
              <span class="w-1/3 p-2 text-center border-r border-gray-300">ग्रह</span>
              <span class="w-1/3 p-2 text-center border-r border-gray-300">लड़का</span>
              <span class="w-1/3 p-2 text-center">लड़की</span>
            </div>

            <div class="flex border-b border-gray-200">
              <span class="w-1/3 p-2 text-center border-r border-gray-300">लग्न</span>
              <span class="w-1/3 p-2 text-center border-r border-gray-300">{data?.boy?.Tatva?.ascTattva}</span>
              <span class="w-1/3 p-2 text-center">{data?.girl?.Tatva?.ascTattva}</span>
            </div>

            <div class="flex border-b border-gray-200">
              <span class="w-1/3 p-2 text-center border-r border-gray-300">चंद्र</span>
              <span class="w-1/3 p-2 text-center border-r border-gray-300">{data?.boy?.Tatva?.planetTattvas?.moon}</span>
              <span class="w-1/3 p-2 text-center">{data?.girl?.Tatva?.planetTattvas?.moon}</span>
            </div>

            <div class="flex">
              <span class="w-1/3 p-2 text-center border-r border-gray-300">शुक्र</span>
              <span class="w-1/3 p-2 text-center border-r border-gray-300">{data?.boy?.Tatva?.planetTattvas?.venus}</span>
              <span class="w-1/3 p-2 text-center">{data?.girl?.Tatva?.planetTattvas?.venus}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='max-w-6xl mx-auto'>

          <div className="px-6 py-4 mt-6 rounded-2xl font-serif shadow-md border border-yellow-200">
            <h2 className="text-2xl font-bold text-yellow-900 mb-4 text-center">मांगलिक दोष वर्णन</h2>
            <div className='text-center text-xl'>
              <div>
                {(() => {
                  const isBoyManglik = data?.boy?.checkManglik?.type === "मंगलीक";
                  const isGirlManglik = data?.girl?.checkManglik?.type === "मंगलीक";

                  const boyHasPlanetRelief = data?.boysun_saturn_rahuposition?.result === true;
                  const girlHasPlanetRelief = data?.girlsun_saturn_rahuposition?.result === true;

                  const boyPlanets = data?.boysun_saturn_rahuposition?.affectedPlanets.join(", ");
                  const girlPlanets = data?.girlsun_saturn_rahuposition?.affectedPlanets.join(", ");

                  // Case 1: Both are manglik and both have relief
                  if (isBoyManglik && boyHasPlanetRelief && isGirlManglik && girlHasPlanetRelief) {
                    return (
                      <div>
                        लड़का और लड़की दोनों की कुंडली में <span className="text-red-600">मांगलिक दोष</span> है
                      </div>
                    );
                  }

                  // Case 2: Both manglik, only boy has relief
                  if (isBoyManglik && boyHasPlanetRelief && isGirlManglik && !girlHasPlanetRelief) {
                    return (
                      <div>
                        लड़का और लड़की दोनों की कुंडली में <span className="text-red-600">मांगलिक दोष</span> है
                      </div>
                    );
                  }

                  // Case 3: Both manglik, only girl has relief
                  if (isBoyManglik && !boyHasPlanetRelief && isGirlManglik && girlHasPlanetRelief) {
                    return (
                      <div>
                        लड़का और लड़की दोनों की कुंडली में <span className="text-red-600">मांगलिक दोष</span> है
                      </div>
                    );
                  }

                  // Case 4: Both manglik, no relief
                  if (isBoyManglik && !boyHasPlanetRelief && isGirlManglik && !girlHasPlanetRelief) {
                    return (
                      <div>
                        लड़का और लड़की दोनों की कुंडली में <span className="text-red-600">मांगलिक दोष</span> है
                      </div>
                    );
                  }

                  // Case 5: Only boy manglik, has relief
                  if (isBoyManglik && boyHasPlanetRelief && !isGirlManglik) {
                    return (
                      <div>
                        लड़के की कुंडली में <span className="text-red-600">मांगलिक दोष</span> है परंतु {boyPlanets} ग्रह मांगलिक भावों में हैं, जिससे दोष का असर नहीं होता।
                        लड़की की कुंडली में मांगलिक दोष नहीं है।
                      </div>
                    );
                  }

                  // Case 6: Only boy manglik, no relief
                  if (isBoyManglik && !boyHasPlanetRelief && !isGirlManglik) {
                    return (
                      <div>
                        लड़के की कुंडली में <span className="text-red-600">मांगलिक दोष</span> है
                        लड़की की कुंडली में मांगलिक दोष नहीं है।
                      </div>
                    );
                  }

                  // Case 7: Only girl manglik, has relief
                  if (!isBoyManglik && isGirlManglik && girlHasPlanetRelief) {
                    return (
                      <div>
                        लड़की की कुंडली में <span className="text-red-600">मांगलिक दोष</span> है परंतु {girlPlanets} ग्रह मांगलिक भावों में हैं, जिससे दोष का असर नहीं होता।
                        लड़के की कुंडली में मांगलिक दोष नहीं है।
                      </div>
                    );
                  }

                  // Case 8: Only girl manglik, no relief
                  if (!isBoyManglik && isGirlManglik && !girlHasPlanetRelief) {
                    return (
                      <div>
                        लड़की की कुंडली में <span className="text-red-600">मांगलिक दोष</span> है।
                        लड़के की कुंडली में मांगलिक दोष नहीं है।
                      </div>
                    );
                  }

                  // Case 9: Neither is manglik
                  if (!isBoyManglik && !isGirlManglik) {
                    return (
                      <div>
                        लड़का और लड़की दोनों की कुंडली में मांगलिक दोष नहीं है।
                      </div>
                    );
                  }

                  return null;
                })()
                }
              </div>

            </div>
            <div>

            </div>

          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto pb-10'>
        {data?.compablity && (
          <div className="px-6 py-4 mt-6 rounded-2xl font-serif shadow-md border border-yellow-200">
            <h2 className="text-2xl font-bold text-yellow-900 mb-4 text-center">नक्षत्र से मिलान</h2>
            {(() => {
              const { boyInGirlList, girlInBoyList } = data.compablity;
              const boyNak = data.compablity.details?.boy?.inHindi || "लड़का";
              const girlNak = data.compablity.details?.girl?.inHindi || "लड़की";

              if (!boyInGirlList && !girlInBoyList) {
                return (
                  <p className="text-lg text-green-800 font-medium text-center">
                    {boyNak} और {girlNak} — दोनों का नक्षत्र के हिसाब से विवाह शुभ है।
                  </p>
                );
              }

              if (boyInGirlList && !girlInBoyList) {
                return (
                  <p className="text-lg text-black font-medium text-center">
                    लड़की की नक्षत्र सूची में लड़के का नक्षत्र ({boyNak}) मौजूद है,<span className='text-red-600'> इसलिए नक्षत्र के अनुसार विवाह नहीं करना चाहिए।</span>
                  </p>
                );
              }

              if (!boyInGirlList && girlInBoyList) {
                return (
                  <p className="text-lg text-black font-medium text-center">
                    लड़के की नक्षत्र सूची में लड़की का नक्षत्र ({girlNak}) मौजूद है, <span className='text-red-600'>इसलिए नक्षत्र के अनुसार विवाह नहीं करना चाहिए।</span>
                  </p>
                );
              }

              return (
                <p className="text-lg text-black font-semibold text-center">
                  लड़के की नक्षत्र सूची में लड़की का नक्षत्र ({girlNak}) और लड़की की नक्षत्र सूची में लड़के का नक्षत्र ({boyNak}) मौजूद है,<br />
                  <span className='text-red-600'>
                    इसलिए नक्षत्र के अनुसार विवाह नहीं करना चाहिए।

                  </span>
                </p>
              );
            })()}
          </div>
        )}
      </div>


      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}

export default MatchMatchingResult

