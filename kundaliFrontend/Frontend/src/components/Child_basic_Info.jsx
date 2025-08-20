import lord_ganesh from '/Images/lord_ganesh.png';

const Basic_Information = ({ data }) => {

  function getCharansFromAkshar(data) {
    const raw = data?.namaksharBasedOnNakshtra;

    if (!raw) return "";
    return raw.join(", ");
  }

  function specifNameBasedOnCharan(data) {
    const raw = data?.namaksharBasedOnNakshtra;
    const charan = data?.moon?.nakshatra?.nakPada

    return raw[charan - 1]
  }

  function formatDateToDDMMYYYY(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }

  const manglikCheak = (value) => {
    const valStr = `${value} है`

    return valStr
  }

  const moolCheak = (value) => {
    const moolVal = value
    
    if(moolVal === 'गण्डमूल दोष उपस्थित') {
      return 'मूल में है'
    }
    else if(moolVal === 'गण्डमूल दोष अनुपस्थित') {
      return 'मूल में नहीं है'
    }
  }

  const details = [
    [
      { label: "Name / नाम", value: data?.name },
      { label: "Month / हिंदी महीना", value: data?.panchanga?.NorthIndiaMonths },
      { label: "Date Of Birth / जन्म तिथि", value: formatDateToDDMMYYYY(data?.panchanga?.dateOfBirth) },
      { label: "Paksha / पक्ष", value: data?.panchanga?.paksha },
      { label: "Birth Of Time / जन्म समय", value: data?.panchanga?.birthOfTime },
      { label: "Tithi / तिथि", value: data?.panchanga?.tithi },
      { label: "Birth Place / जन्म स्थान", value: data?.city },
      { label: "Day / दिन", value: data?.panchanga?.day },
      { label: "Ascendant / लग्न", value: data?.ascendant?.calculated?.zodiac },
      { label: "Nakshatra / नक्षत्र", value: data?.moon?.nakshatra?.nakName },
      { label: "पाए (राशि से)", value: data?.paaye },
      { label: "Quarter / चरण", value: data?.moon?.nakshatra?.nakPada },
      { label: "नक्षत्र / चरण नाम", value: specifNameBasedOnCharan(data) },
      { label: "Zodiac Sign / राशि", value: data?.moon?.placement?.zodiac },
      { label: "नामाक्षर", value: getCharansFromAkshar(data) || "—" },
      { label: "पाए (नक्षत्र से)", value: data?.NakshatraInfo?.paaye },
      { label: "मंगलीक", value: manglikCheak(data?.checkManglik?.type) },
      { label: "मूल", value: moolCheak(data?.mool?.status) },
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
        <h1 className='text-4xl font-bold text-[#005f56]'>सामान्य परिचय</h1>
        <h2 className='text-4xl mt-5 text-[#8B0000] font-semibold'>{data?.name}</h2>
        <div className='w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#f3e6c8] p-10 mt-10 relative overflow-hidden'>
          <div className='grid grid-cols-2 gap-4 text-lg text-gray-800 max-md:grid-cols-1'>
            {details[0].map((item, index) => (
              <div key={index} className='bg-gradient-to-r from-[#fff4e6] to-[#ffedd5] p-4 shadow-md flex justify-between items-center'>
                <span className='text-[#8B0000] font-semibold'>{item.label}</span>
                <span className='text-[#005f56] font-medium'>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basic_Information;