import React from 'react'
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Child_basic_Info from '../components/Child_basic_Info';
import KundaliChart from '../components/VedikKundali';

const Kundali_Container = () => {
    const location = useLocation();
    const data = location.state?.data;
    const [activeTab, setActiveTab] = useState("lagan");

    function formatDateToDDMMYYYY(dateString) {

        if(dateString === undefined) {
            return ''
        }

        const [year, month, day] = dateString.split("-");
        return `${day}-${month}-${year}`;
    }

    return (
        <div className='bg-gradient-to-b from-[#fff] to-[#fff] pb-15'>
            {data && (
                <div className=''>
                    <div className=''>
                        {data && <Child_basic_Info data={data} />}
                    </div>
                    <div className='flex justify-center items-center mt-0' >
                        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#f3e6c8] p-10 mt-5 relative overflow-hidden flex justify-center items-center flex-col"
                        >
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

                                    <div className=' w-full'>
                                        <div className='w-[90%] max-md:w-full mx-auto'>
                                            <div className='flex flex-wrap gap-5 text-xl'>
                                                <div className='w-1/2 max-md:w-full '>
                                                    <span>नहनवार - </span>
                                                    <span>{formatDateToDDMMYYYY(data?.chatiDate?.fourthDay) || formatDateToDDMMYYYY(data?.chatiDate?.fifthDay)}</span>
                                                </div>
                                                <div className='w-1/2 max-md:w-full '>
                                                    <span>छठी - </span>
                                                    <span>{formatDateToDDMMYYYY(data?.chatiDate?.sixthDay)}</span>
                                                </div>
                                                <div className='w-1/2 max-md:w-full '>
                                                    <span>सावड़ / खाट बदली - </span>
                                                    <span>{formatDateToDDMMYYYY(data?.chatiDate?.seventhDay)}</span>
                                                </div>
                                                <div className='w-1/2 max-md:w-full '>
                                                    <span>हवन - </span>
                                                    <span>{formatDateToDDMMYYYY(data?.chatiDate?.tenthDay) ||formatDateToDDMMYYYY(data?.chatiDate?.eleventhDay)}</span>
                                                </div>
                                                <div className={` ${data?.gender === 'male' ? 'w-1/2 max-md:w-full' : 'hidden'} `}>
                                                    <span>कुंआ पूजन - </span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {/* <div>
                        <pre>{JSON.stringify(data,null,3)}</pre>
                    </div> */}
                </div>


            )}
        </div>
    )
}

export default Kundali_Container
