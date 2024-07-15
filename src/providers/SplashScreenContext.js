import React, { createContext, useState, useContext, useEffect } from "react";

const SplashScreenContext = createContext();

export const useSplashScreen = () => useContext(SplashScreenContext);

export const SplashScreenProvider = ({ children }) => {
  const [currentSplash, setCurrentSplash] = useState(null);
  const [splashList, setSplashList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contentSplash, setContentSplash] = useState({ label: "", content: "", status: false });
  const [idSplash, setIdSplash] = useState(null);
  const [handleShowSplash, setHandleShowSplash] = useState(false);
  const [splashUserConetnt, setSplashUserContent] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchSplashsScreen();
    fetchCurrentSplashScreen();
  }, []);



  const fetchCurrentSplashScreen = async () => {
    const response = await fetch("http://localhost:8080/api/splashscreens");
    const data = await response.json();
    const activeSplash = data.find(screen => screen.showSplash);
    setCurrentSplash(activeSplash || null);
  };

  const fetchSplashsScreen = async () => {
    try {
      setIsFetching(true);
      setIsSuccess(false);
      const response = await fetch("http://localhost:8080/api/splashscreens");
      const data = await response.json();
      setSplashList(data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsFetching(false);
      setIsSuccess(true);
    };

  };

  const dismissSplashScreen = () => {
    setCurrentSplash(null);
    localStorage.setItem("hasSeenSplash", "true");
  };

  const createSplashScreen = async () => {
    console.log("splashScreen", contentSplash);
    try {
      setIsFetching(true);
      setIsSuccess(false);
      const response = await fetch("http://localhost:8080/api/splashscreens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentSplash),
      });
      if (response.ok) {
        fetchSplashsScreen();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
      setIsSuccess(true);
    }
  };

  const getSingleSplashScreen = async (id) => {
    try {
      setIsFetching(true);
      setIsSuccess(false);
      const response = await fetch(`http://localhost:8080/api/splashscreens/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
      setIsSuccess(true);
    }
  };
  const updateConsultedStatusPerUser = async (id) => {
    try {
      setIsFetching(true);
      setIsSuccess(false);
      const response = await fetch(`http://localhost:8080/api/splashscreens/updateConsultedStatus?userSplashScreenId=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: true }),
      });
      setTimeout(() => {
        getActiveSplashPerUser(splashUserConetnt?.email);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  const revokeStatus = async (id) => {
    try {
      setIsFetching(true);
      setIsSuccess(false);
      const response = await fetch(`http://localhost:8080/api/splashscreens/revoke?userSplashScreenId=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: true }),

      });

    } catch (error) {
      console.error(error);
    }
    finally {
      setIsFetching(false);
      setIsSuccess(true);
    }
  };

  const getActiveSplashPerUser = async (email) => {
    try {
      setIsFetching(true);
      setIsSuccess(false);
      const response = await fetch(`http://localhost:8080/api/splashscreens/by-user?email=${email}`);
      const data = await response.json();

      if (data) {
        setSplashUserContent(data);

        setHandleShowSplash(!data.consulted);


      }

      return data;
    } catch (error) {
      console.error(error);
      setIsFetching(false);
      setIsSuccess(false);
      throw error;
    } finally {
      setIsFetching(false);
      setIsSuccess(true);
    }
  };
  const startSplashScreenInterval = (email, intervalTime) => {
    // Initial fetch when the app starts
    getActiveSplashPerUser(email);

  };


  const getSplashDetails = async (id) => {
    try {
      setIsFetching(true);
      setIsSuccess(false);
      const response = await fetch(`http://localhost:8080/api/splashscreens/splash-details/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      setIsFetching(false);
      setIsSuccess(false);
      throw error;
    } finally {
      setIsFetching(false);
      setIsSuccess(true);
    }

  };

  return (
    <SplashScreenContext.Provider value={{ revokeStatus, splashList, currentSplash, dismissSplashScreen, isFetching, isSuccess, createContext, createSplashScreen, contentSplash, setContentSplash, getSingleSplashScreen, idSplash, setIdSplash, startSplashScreenInterval, getActiveSplashPerUser, handleShowSplash, setHandleShowSplash, updateConsultedStatusPerUser, splashUserConetnt, userInfo, setUserInfo, getSplashDetails }}>
      {children}
    </SplashScreenContext.Provider>
  );
};
