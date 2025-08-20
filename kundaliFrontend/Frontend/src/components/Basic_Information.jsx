import lord_ganesh from '/Images/lord_ganesh.png';

const Basic_Information = ({ data }) => {

  function extractHindi(text) {
    const parts = text.split(',');
    return parts[1].trim();
  }

  function extractHindiWithSlash(text) {
    const parts = text.split('/');
    return parts[1]?.trim() || '';
  }

  const details = [
    [
      { label: "नाम", value: data?.name },
      { label: "देशांतर", value: data?.lon },
      { label: "जन्म तिथि", value: data?.panchanga?.dateOfBirth },
      { label: "अक्षांश", value: data?.lat },
      { label: "जन्म समय", value: data?.panchanga?.birthOfTime },
      { label: "समय क्षेत्र", value: data?.panchanga?.timeZone },
      { label: "जन्म स्थान", value: data?.city },
      { label: "हिंदी महीना", value: data?.panchanga?.NorthIndiaMonths },
      { label: "ऋतु", value: data?.panchanga?.ritu },
      { label: "पक्ष", value: data?.panchanga?.paksha },
      { label: "लग्न", value: extractHindi(data?.ascendant?.calculated?.zodiac) },
      { label: "तिथि", value: data?.panchanga?.tithi },
      { label: "लग्नाधिपति", value: extractHindiWithSlash(data?.LaganData?.malik) },
      { label: "दिन", value: data?.panchanga?.day },
      { label: "नक्षत्र", value: extractHindi(data?.moon?.nakshatra?.nakName) },
      { label: "नक्षत्र देवता", value: data?.NakshatraInfo?.nakshatradevata },
      { label: "चरण", value: data?.moon?.nakshatra?.nakPada },
      { label: "नक्षत्रदिपति", value: data?.NakshatraInfo?.nakshatradipati },
      { label: "राशि", value: extractHindi(data?.moon?.placement?.zodiac) },
      { label: "राशि स्वामी", value: extractHindiWithSlash(data?.moon?.rashiPati) },
      { label: "पाए (नक्षत्र से)", value: data?.NakshatraInfo?.paaye },
      { label: "पाए (राशि से)", value: extractHindiWithSlash(data?.paaye) },
    ]
  ];


  return (
    <div className='flex flex-col items-center min-h-screen p-10'>
      <h1 className='text-5xl max-md:text-4xl font-bold text-[#B8860B] mb-10'>श्री गणेशाय नमः</h1>
      <div className='w-1/4 max-lg:w-3/4'>
        <img src={lord_ganesh} alt='lord ganesh' className='w-full drop-shadow-lg' />
      </div>
      <h2 className='text-lg lg:text-2xl text-[#DCBA4F] font-semibold text-center mt-8'>
        वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । <br />
        निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
      </h2>
      <div className='mt-12 w-full flex flex-col items-center'>

        <h2 className='text-5xl text-[#8B0000] font-semibold'>{data?.name}</h2>
        <div className='w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#f3e6c8] p-5 lg:p-10 mt-10 relative overflow-hidden'>
          <h1 className='text-3xl lg:text-4xl font-bold text-center mb-5 text-[#005f56]'>सामान्य परिचय</h1>
          <div className='grid grid-cols-2 gap-4 text-lg text-gray-800 max-md:grid-cols-1'>
            {details[0].map((item, index) => (
              <div key={index} className='bg-gradient-to-r from-[#fff4e6] to-[#ffedd5] p-2.5 shadow-md flex justify-between items-center'>
                <span className='text-[#8B0000] font-semibold'>{item.label}</span>
                <span className='text-[#005f56] font-medium'>{item.value || '—'}</span>
              </div>
            ))
            }
          </div>
          <h1 className='text-4xl font-bold text-center mb-5 text-[#005f56] mt-10'>घात चक्र</h1>
          <div className='grid grid-cols-2 gap-4 text-lg text-gray-800 max-md:grid-cols-1'>
            {data?.ghaat?.[0] &&
              Object.entries(data.ghaat[0]).map(([key, value], index) => (
                <div key={index} className="bg-gradient-to-r from-[#fff4e6] to-[#ffedd5] p-2.5 shadow-md flex justify-between items-center">
                  <span className="text-[#8B0000] font-semibold">{key}</span>
                  <span className="text-[#005f56] font-medium">{value || '—'}</span>
                </div>
              ))
            }
          </div>
          <div className='text-gray-400 text-xs w-full mt-5'>*घात चक्र के घात चीजे सिर्फ एक राज्य छोड़कर दूसरे राज्य में प्रवास, सरकारी काम-काज के लिए वर्जित है। इनका विवाह, या उपनयन में कोई महत्त्व नही। </div>
          <div className='text-gray-400 text-xs w-full'>**घाततिथि में दिए गये तिथि है, तारीख नहीं। </div>
        </div>
      </div>
    </div>
  );
};

export default Basic_Information;