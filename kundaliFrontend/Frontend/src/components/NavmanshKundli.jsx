const NavamsaKundaliChart = ({ ascendant, sun, moon, mars, mercury, jupiter, venus, saturn, rahu, ketu }) => {
    const zodiacMap = {
      Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
      Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12,
    };
  
    const zodiacString = ascendant?.calculated?.zodiac;
    const [english, hindi] = zodiacString?.split(",") || [];
    const ascendantHouse = zodiacMap[english?.trim()] || 1;
  
    const housePositions = [
      { x: 193, y: 70 },   // 1st house
      { x: 170, y: 65 },   // 2nd
      { x: 53, y: 180 },   // 3rd
      { x: 60, y: 205 },   // 4th
      { x: 52, y: 230 },   // 5th
      { x: 170, y: 345 },  // 6th
      { x: 193, y: 340 },  // 7th
      { x: 220, y: 345 },  // 8th
      { x: 334, y: 225 },  // 9th
      { x: 326, y: 205 },  // 10th
      { x: 334, y: 180 },  // 11th
      { x: 220, y: 64 },   // 12th
    ];
  
    const planetPositions = [
      { x: 185, y: 85 },   //1
      { x: 118, y: 63 },   //2
      { x: 55, y: 95 },    //3
      { x: 108, y: 160 },  //4
      { x: 55, y: 245 },   //5
      { x: 117, y: 300 },  //6
      { x: 185, y: 240 },  //7
      { x: 262, y: 300 },  //8
      { x: 323, y: 240 },  //9
      { x: 265, y: 160 },  //10
      { x: 325, y: 90 },   //11
      { x: 268, y: 63 },   //12
    ];
  
    const planets = [
      { name: "सूर्य", pos: sun },
      { name: "चन्द्र", pos: moon },
      { name: "मंगल", pos: mars },
      { name: "बुध", pos: mercury },
      { name: "गुरु", pos: jupiter },
      { name: "शुक्र", pos: venus },
      { name: "शनि", pos: saturn },
      { name: "राहु", pos: rahu },
      { name: "केतु", pos: ketu },
    ];
  
    return (
      <div className="w-[75%] max-md:w-[100%] max-sm:w-[150%] mt-10">
        <h2 className="text-center text-2xl text-[#7B3F00] font-semibold tracking-wide">
          नवांश कुंडली
        </h2>
        <div className="relative p-3">
          <svg
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            className="-mt-20 max-md:mt-0"
          >
            <rect x="50" y="50" width="300" height="300" stroke="#b8860b" fill="none" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="350" y2="350" stroke="#c17e4f" strokeWidth="1.2" />
            <line x1="50" y1="350" x2="350" y2="50" stroke="#c17e4f" strokeWidth="1.2" />
            <line x1="200" y1="50" x2="50" y2="200" stroke="#d2a679" strokeWidth="1.2" />
            <line x1="200" y1="50" x2="350" y2="200" stroke="#d2a679" strokeWidth="1.2" />
            <line x1="50" y1="200" x2="200" y2="350" stroke="#d2a679" strokeWidth="1.2" />
            <line x1="200" y1="350" x2="350" y2="200" stroke="#d2a679" strokeWidth="1.2" />
  
            {housePositions.map((pos, index) => {
              const houseNumber = ((ascendantHouse - 1 + index) % 12) + 1;
              return (
                <text key={index} x={pos.x} y={pos.y} fontSize="14" fill="#7B3F00" fontWeight="bold">
                  {houseNumber}
                </text>
              );
            })}
  
            {planets.map((planet, index) => {
              if (!planet.pos) return null;
              const houseIndex = (planet.pos - 1) % 12;
              const planetPos = planetPositions[houseIndex];
              const sameHousePlanets = planets.filter(p => p.pos === planet.pos);
              const planetOffset = sameHousePlanets.findIndex(p => p.name === planet.name) * 14;
  
              return (
                <text
                  key={index}
                  x={planetPos.x}
                  y={planetPos.y + planetOffset}
                  fontSize="11"
                  fontWeight="bold"
                  fill="black"
                >
                  {planet.name}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };
  
  export default NavamsaKundaliChart;
  