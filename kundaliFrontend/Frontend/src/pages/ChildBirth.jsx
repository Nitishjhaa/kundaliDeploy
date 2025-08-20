import { useState, useEffect, useRef } from "react";
import { useApi } from "../context/ApiContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import rawCities from '../../cityData/cities.json';
import { FaPaperPlane } from "react-icons/fa";

const CustomCityInput = ({ value, onChange }) => {
  const [filtered, setFiltered] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef();
  const listRef = useRef();

  const cities = rawCities
    .filter((c) => c.country === "India" && c.city && c.admin_name)
    .map((c) => ({ name: c.city, state: c.admin_name }));

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
      setActiveIndex((prev) =>
        prev === 0 ? filtered.length - 1 : prev - 1
      );
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
        className="w-full px-6 py-4 text-base outline-none rounded-xl transition-all shadow-md"
      />
      {showDropdown && filtered.length > 0 && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-xl max-h-60 overflow-y-auto">
          <ul ref={listRef}>
            {Object.keys(grouped).map((state) => (
              <div key={state}>
                <div className="px-6 py-2 text-xs text-gray-400 uppercase bg-gray-50 sticky top-0 z-10">
                  {state}
                </div>
                {grouped[state].map((city, idx) => {
                  const index = filtered.findIndex((c) => c.name === city.name);
                  return (
                    <li
                      key={city.name}
                      onClick={() => handleSelect(city.name)}
                      className={`px-6 py-3 cursor-pointer transition-all duration-200 ${activeIndex === index ? "bg-yellow-100 text-yellow-900" : "hover:bg-yellow-50"}`}
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

const KundaliForm = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const { childKundali, loading, error } = useApi();

  const defaultForm = {
    birthDate: "",
    birthTime: "",
    timeZone: "Asia/Kolkata",
    country: "India",
    gender: "male",
    fullName: "",
    city: ""
  };

  const [formData, setFormData] = useState(defaultForm);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("kundliFormData");
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
      localStorage.setItem("kundliFormData", JSON.stringify(formData));
    }
  }, [formData, isDataLoaded]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoader(true);

    const result = await childKundali(formData);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    navigate("/child-kundali-Info", { state: { data: result } });
  };

  return (
    <>
      <div className="relative max-md:py-10 bg-[url('Images/earth-2.png')] bg-center max-md:bg-none" >
  
        {!showLoader && (
          <div className="min-h-screen flex items-center justify-center px-4">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-3xl bg-white/90 border border-yellow-300 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-md p-12 space-y-8"
            >
              <h2 className="text-center text-5xl font-extrabold text-yellow-600 tracking-tight">
                Child Birth
              </h2>
              <p className="text-center text-lg text-gray-500 mb-8">
                Enter your birth details to generate your personalized Kundli
              </p>

              <div className="relative">
                <label htmlFor="" className="absolute z-1 -top-2.5 left-3 text-yellow-400">Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl outline-none shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label htmlFor="" className="absolute -top-2.5 left-3 text-yellow-400">Date Of Birth</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl outline-none shadow-sm"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="" className="absolute -top-2.5 left-3 text-yellow-400">Birth Time</label>
                  <input
                    type="time"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl outline-none shadow-sm"
                  />

                </div>

                <div className="relative">
                  <label htmlFor="" className="absolute -top-2.5 left-3 text-yellow-400">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl outline-none shadow-sm bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <label htmlFor="" className="absolute -top-2.5 left-3 text-yellow-400 z-1">Birth City</label>
                <CustomCityInput
                  value={formData.city}
                  onChange={(city) => setFormData((prev) => ({ ...prev, city }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="hidden"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-100 shadow-sm"
                />

                <input
                  type="hidden"
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleChange}
                  readOnly
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-100 shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-lg rounded-2xl transition-all duration-300 shadow-md"
              >
                <FaPaperPlane className="text-xl" /> Generate Kundli
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

export default KundaliForm;
