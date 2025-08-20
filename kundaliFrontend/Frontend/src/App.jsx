import { useState, useEffect } from "react";
import PopUp_Page from "./pages/PopUp_Page";
import AppRoute from "./pages/AppRoute";
import Login from "./pages/Login"; // your login page

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check if user is already logged in
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const hasShownPopup = localStorage.getItem("popupShown");

      if (!hasShownPopup) {
        setShowPopup(true);

        const timer = setTimeout(() => {
          setShowPopup(false);
          localStorage.setItem("popupShown", "true");
        }, 10000);

        return () => clearTimeout(timer);
      }
    }
  }, [isLoggedIn]);

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          {showPopup && <PopUp_Page setShowPopup={setShowPopup} />}
          {!showPopup && <AppRoute />}
        </>
      )}
    </div>
  );
}

export default App;
