import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, SetisLoading] = useState(true);
  const [userToken, SetuserToken] = useState(null);
  const [RobotList, setRobotList] = useState([]);

  const login = () => {
    console.log("login success!");
    let token = "quanpa2508";
    SetuserToken(token);
    AsyncStorage.setItem("userToken", token);
    SetisLoading(false);
  };

  const logout = () => {
    console.log("process logout ");
    SetuserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("StationPram");
    SetisLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      let token = await AsyncStorage.getItem("userToken");
      SetuserToken(token);
      SetisLoading(false);
    } catch (e) {
      console.log(`isLogged in error ${e}`);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        RobotList,
        isLoggedIn,
        isLoading,
        userToken,
        setRobotList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
