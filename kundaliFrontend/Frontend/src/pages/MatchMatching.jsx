import { useState, useEffect, useRef } from "react";
import { useApi } from "../context/ApiContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import rawCities from '../../cityData/cities.json';


const CustomCityInput = ({ value, onChange }) => {
  const [filtered, setFiltered] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef();
  const listRef = useRef();

  const cities = rawCities
    .filter((c) => c.country === "India" && c.city && c.admin_name)
    .map((c) => ({
      name: c.city,
      state: c.admin_name,
    }));

  const highlightMatch = (text, query) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    return (
      <>
        {text.slice(0, index)}
        <span className="text-yellow-600 font-semibold">
          {text.slice(index, index + query.length)}
        </span>
        {text.slice(index + query.length)}
      </>
    );
  };

  const handleChange = (e) => {
    const inputVal = e.target.value;
    onChange(inputVal);

    if (inputVal.length >= 1) {
      const filteredCities = cities.filter((c) =>
        c.name.toLowerCase().includes(inputVal.toLowerCase())
      );
      setFiltered(filteredCities);
      setShowDropdown(true);
      setActiveIndex(-1);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (city) => {
    onChange(city);
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSelect(filtered[activeIndex].name);
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex];
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const grouped = filtered.reduce((acc, city) => {
    if (!acc[city.state]) acc[city.state] = [];
    acc[city.state].push(city);
    return acc;
  }, {});

  return (
    <div className="relative w-full">
      <input
        type="text"
        name="city"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        required
        placeholder="Enter Your City"
        ref={inputRef}
        className="w-full px-6 py-4 text-base rounded-xl focus:outline-none shadow-sm transition-all"
      />
      {showDropdown && filtered.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-xl max-h-60 overflow-y-auto">
          <ul ref={listRef}>
            {Object.keys(grouped).map((state) => (
              <div key={state}>
                <div className="px-6 py-2 text-xs text-gray-400 uppercase bg-gray-50 sticky top-0 z-10">
                  {state}
                </div>
                {grouped[state].map((city, idx) => {
                  const index = filtered.findIndex(
                    (c) => c.name === city.name
                  );
                  return (
                    <li
                      key={city.name}
                      onClick={() => handleSelect(city.name)}
                      className={`px-6 py-3 cursor-pointer ${activeIndex === index
                        ? "bg-yellow-100"
                        : "hover:bg-yellow-50"
                        }`}
                    >
                      {highlightMatch(city.name, value)}
                    </li>
                  );
                })}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const MatchMatchingForm = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const { fetchMatchMaking, loading, error } = useApi();

  const defaultForm = {
    boy: {
      birthDate: "",
      birthTime: "",
      timeZone: "Asia/Kolkata",
      country: "India",
      gender: "male",
      fullName: "",
      city: ""
    },
    girl: {
      birthDate: "",
      birthTime: "",
      timeZone: "Asia/Kolkata",
      country: "India",
      gender: "female",
      fullName: "",
      city: ""
    }
  };

  const [formData, setFormData] = useState(defaultForm);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("kundliMatchFormData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFormData({ ...defaultForm, ...parsed });
      } catch (e) {
        console.error("Failed to parse stored data:", e);
      }
    }
    setIsDataLoaded(true);
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem("kundliMatchFormData", JSON.stringify(formData));
    }
  }, [formData, isDataLoaded]);

  const handleChange = (e, personKey) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [personKey]: {
        ...prev[personKey],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    const result = await fetchMatchMaking(formData);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    navigate("/matchmaking-result", { state: { data: result } });
  };

return (
  <>
    <div className="relative py-10 max-md:py-10" style={{ backgroundImage: "url('Images/earth-2.png')", backgroundPosition: "center", backgroundSize: 'cover' }}>
      {!showLoader && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-5xl bg-white/90 border border-yellow-300 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-md p-12 space-y-12 text-gray-800"
          >
            <h2 className="text-5xl font-extrabold text-center text-yellow-600 tracking-wide mb-4">
              Match Making
            </h2>

            {[
              { key: "boy", label: "Boy" },
              { key: "girl", label: "Girl" },
            ].map(({ key, label }) => (
              <div key={key} className="space-y-6 border-t border-yellow-200 pt-10">
                <h3 className="text-3xl font-semibold text-yellow-500">{label}</h3>

                <div className="relative">
                  <label className="absolute -top-2.5 left-3 text-yellow-400  px-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData[key].fullName}
                    onChange={(e) => handleChange(e, key)}
                    required
                    placeholder="Full Name"
                    className="w-full px-6 py-4 rounded-xl focus:outline-none shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 text-yellow-400  px-2">Date of Birth</label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData[key].birthDate}
                      onChange={(e) => handleChange(e, key)}
                      required
                      className="w-full px-6 py-4 rounded-xl focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 text-yellow-400  px-2">Birth Time</label>
                    <input
                      type="time"
                      name="birthTime"
                      value={formData[key].birthTime}
                      onChange={(e) => handleChange(e, key)}
                      required
                      className="w-full px-6 py-4 rounded-xl focus:outline-none shadow-sm"
                    />
                  </div>

                  <div className="relative">
                    <label className="absolute -top-2.5 left-3 text-yellow-400  px-2">Gender</label>
                    <select
                      name="gender"
                      value={formData[key].gender}
                      onChange={(e) => handleChange(e, key)}
                      required
                      className="w-full px-6 py-4 rounded-xl"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="absolute -top-2.5 left-3 text-yellow-400  px-2">Birth City</label>
                  <CustomCityInput
                    value={formData[key].city}
                    onChange={(city) =>
                      setFormData((prev) => ({
                        ...prev,
                        [key]: {
                          ...prev[key],
                          city,
                        },
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="country"
                    value={formData[key].country}
                    readOnly
                    className="w-full px-6 py-4 rounded-xl focus:outline-none bg-gray-100 shadow-sm"
                  />

                  <input
                    type="text"
                    name="timeZone"
                    value={formData[key].timeZone}
                    readOnly
                    className="w-full px-6 py-4 rounded-xl focus:outline-none bg-gray-100 shadow-sm"
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg"
            >
              Get Match Report
            </button>

            {error && (
              <p className="text-center text-red-600 text-sm pt-4">
                Error: {error}
              </p>
            )}
          </form>
        </div>
      )}

      {showLoader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <Loader />
        </div>
      )}
    </div>
  </>
);

};

export default MatchMatchingForm;
