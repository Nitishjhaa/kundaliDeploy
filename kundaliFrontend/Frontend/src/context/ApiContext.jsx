import { createContext, useContext, useState } from "react";
import API from "../api";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState(null); // shared or last-called API response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchKundali = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.post("/kundali", formData);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const childKundali = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.post("/child", formData);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchMatchMaking = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.post("/match", formData);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{ data, loading, error, fetchKundali, fetchMatchMaking, childKundali }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
