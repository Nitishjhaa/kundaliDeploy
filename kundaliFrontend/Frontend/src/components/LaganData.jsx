function LaganTable({ data }) {
  const entries = Object.entries(data).filter(
    ([key, value]) =>
      value !== "" && key !== "__v" && key !== "id" && key !== "_id" && key !== 'description'
  );



  const labels = {
    nameOfLagan: "लग्न का नाम",
    numberOfLagan: "लग्न संख्या",
    ashubh: "अशुभ",
    subh: "शुभ",
    maarak: "मारक",
    raajyogKarak: "राजयोग कारक",
    parampaapi: "परम-पापी",
    ghatak: "घातक",
    malik: "लग्न के मालिक",
  };

  return (
    <div className="relative w-full px-4 py-6 sm:px-6 md:px-8">
  <div className="relative w-full rounded-2xl border border-yellow-300 bg-gradient-to-br from-yellow-100 via-orange-50 to-red-50 backdrop-blur-sm overflow-hidden">
    {/* Background overlay */}
    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[url('/constellation-bg.svg')] bg-cover bg-center opacity-10 z-0" />

    {/* Responsive Info Grid */}
    <div className="relative z-10 flex flex-col divide-y divide-yellow-500">
      {entries.map(([key, value], index) => (
        <div
          key={key}
          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-6 py-4 transition-all duration-300 ${
            index % 2 === 0 ? 'bg-white/50' : 'bg-yellow-100/40'
          } hover:bg-yellow-200/50`}
        >
          <span className="text-yellow-900 font-bold font-serif w-full sm:w-1/3">
            {labels[key] || key}
          </span>
          <span className="text-[#005f56] font-medium font-serif w-full sm:w-2/3 max-md:text-center text-left sm:text-right">
            {value}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>


  );
}

export default LaganTable;
