import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [stationPram, SetstationPram] = useState({})
  const [isLoading, SetisLoading] = useState(true);
  const [userToken, SetuserToken] = useState(null);
  const [RobotList, setRobotList] = useState([/*{
    id: "123123",
    name: "SAS-AGV-1"
  }, {
    id: "21312312",
    name: "Nagase"
  }, {
    id: "334123",
    name: "TanHungHa"
  }*/
  ]);

  const updateStationPram = async (props) => {
    console.log("update station pram");
    // console.log(props);
    try {
      const StationPram = {
        StationName: props.StationName,
        LineName: props.LineName,
      }


      SetstationPram(StationPram);
      await AsyncStorage.setItem(
        "stationPram",
        JSON.stringify(StationPram)
      );
      return "Successed";
    } catch (error) {
      console.log("Set station pram error: ", error);
      return "fail";
    }

  }

  const login = async () => {
    console.log("login success!");
    let token = "quanpa2508";
    const StationPram = {
      StationName: "station-1",
      LineName: "station-7",
    };
    SetuserToken(token);
    SetstationPram(StationPram);
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("stationPram", JSON.stringify(StationPram));
    SetisLoading(false);
  };

  const logout = () => {
    console.log("process logout ");
    SetuserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("stationPram");
    SetisLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      let token = await AsyncStorage.getItem("userToken");
      let StationName = await AsyncStorage.getItem("stationPram");
      // console.log(StationName.json())
      SetstationPram(JSON.parse(StationName));
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
        stationPram,
        isLoggedIn,
        isLoading,
        userToken,
        SetisLoading,
        setRobotList,
        updateStationPram

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
