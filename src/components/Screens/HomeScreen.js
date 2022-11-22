import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./style";
import CustomButton from "../CustomButton/CustonButton";
import RobotModel from "../RobotModel/RobotModel";
import CustomAlert from "../CustomAlert/CustomAlert";
const HomeStack = createNativeStackNavigator();

function RobotList({ navigation }) {
  const { RobotList, setRobotList } = useContext(AuthContext);

  const getInfoRobot = async (robot) => {

    // console.log(stationPram);
    navigation.navigate("RobotInfo", {
      robotName: robot["name"],
      robotId: robot["id"],

    });
  };
  const apiUrl =
    "http://172.20.2.50:8080/api/Remote/Robots?model=agv-500&map=demo-f1";
  const getListRobot = async (apiUrl) => {
    //GET request

    //'https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=d1586f596d97979063a6457adacfd982';

    try {
      const result = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await result.json();
      if (json) {
        setRobotList(json);
      } else {
        console.log("can not fetch");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };


  return (
    <View style={styles.body}>
      <Text style={styles.header}>List Robot AGV</Text>
      <ScrollView style={{ marginTop: 15 }}>
        {RobotList.map((item, index) => {
          return (
            <RobotModel
              key={index}
              title={item["name"]}
              number={index + 1}
              onGetInfoRobot={() => getInfoRobot(item)}
            />
          );
        })}
      </ScrollView>
      <View style={styles.flexItem1}>
        <CustomButton
          title="Get List Robot"
          onPress={() => getListRobot(apiUrl)}
        ></CustomButton>
      </View>
    </View>
  );
}


function RobotInfo({ route }) {
  const { stationPram, isLoading, SetisLoading } = useContext(AuthContext);

  useEffect(() => {
    stationPram;
  });
  const { robotId, robotName } = route.params;

  console.log(route.params);
  const [taskNavigationTo, SettaskNavigationTo] = useState(false);
  const [taskNavigationLine, SettaskNavigationLine] = useState(false);
  const [robotConnection, SetrobotConnecttion] = useState(0);

  const [customAlert, SetcustomAlert] = useState(false);

  const getTask = async (robotId, taskName) => {
    const url = "http://172.20.2.50:8080/api/Remote/Robot/" + robotId + "/Task/" + taskName;

    return fetch(url, {

    }).then((response) => response.json())
      .then((json) => {

        return json.result["status"];
      })
      .catch((error) => {
        console.error(error);
      });
  };
  setInterval(async () => {
    const result1 = await getTask(robotId, "NavigationTo");
    const result2 = await getTask(robotId, "NavigationLine");
    if (result1 === 2) {
      SettaskNavigationTo(true); // robot is running task NavigationTo
    }
    else {
      SettaskNavigationTo(false);
    }
    if (result2 === 2) {
      SettaskNavigationLine(true); // robot is running task NavigationTo
    } else {
      SettaskNavigationLine(false);
    }

  }, 2000);

  const getState = async () => {
    SetisLoading(true);
    const url = "http://172.20.2.50:8080/api/Remote/Robot/" + robotId + "/State/StatusAGV";

    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.message == "Robot no valiable connection") {

        SetrobotConnecttion(1);
      }
      else if (result.message == "Robot not found") {

        SetrobotConnecttion(2);
      }
      else {
        SetrobotConnecttion(0);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // SetisLoading(false);
    }
    // return fetch(url, {

    // }).then((response) => response.json())
    //   .then((json) => {
    //     return json;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const goToStation = async (robotId, taskName, pointName) => {
    try {
      const apiUrl =
        "http://172.20.2.50:8080/api/Remote/Robot/" + robotId + "/Task/" + taskName + "?args=" + pointName;
      console.log(apiUrl);
      const result = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: {}
      });
      const data = await result.json();
      console.log(data);
      if (!data["isError"]) {
        SetcustomAlert(true);
      }
    } catch (error) {
      console.error("Error", error);
    }

  };


  const goHome = async (robotId, pointName) => {
    try {
      const apiUrl =
        "http://172.20.2.50:8080/api/Remote/Robot/" + robotId + "/Task/NavigationLine?args=" + pointName;
      console.log(apiUrl);
      const result = await fetch(apiUrl, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: {}
      });
      const data = await result.json()
      console.log(data);
      if (!data["isError"]) {
        SetcustomAlert(true);
      }
    } catch (error) {
      console.error("Error", error);
    }

  };

  useEffect(() => {
    getState();
  }, []);



  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (

    <View style={styles.body}>
      {customAlert ? (
        <CustomAlert
          // customAlert={customAlert}
          message="Call robot sucessed"
          SetcustomAlert={() => SetcustomAlert(false)}
        />
      ) : null}
      <Text style={styles.header}>{robotName}</Text>
      {robotConnection === 0 ? (
        <>
          <View style={styles.flexItem1}>
            <CustomButton
              title="Go to station"
              disable={taskNavigationTo}
              color={taskNavigationTo ? '#808080' : undefined}
              onPress={() => goToStation(robotId, "NavigationTo", stationPram["StationName"])}>
            </CustomButton>
            <CustomButton
              title="Come home"
              disable={taskNavigationLine}
              color={taskNavigationLine ? '#808080' : undefined}
              onPress={() => goHome(robotId, stationPram["LineName"])}></CustomButton>

          </View>
          <View style={styles.flexItem2}>
            <Text>StationName: {stationPram.StationName}</Text>
            <Text>LineName: {stationPram.LineName}</Text>
          </View>
          <View style={styles.flexItem3}>
            <Text style={{ color: "red" }}>
              Waiting robot finish task {taskNavigationTo ? ('NavigationTo') : ("NavigationLine")} before call robot again
            </Text>
          </View>

        </>
      ) : (<Text style={{ color: "red", margin: 10 }}>
        {(robotConnection === 1) ? "Robot no valiable connection" : "Robot not found"}
      </Text>)}

    </View>
  );
}
function HomeScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="RobotList"
        component={RobotList}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RobotInfo"
        component={RobotInfo}
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            marginTop: 10,
            backgroundColor: "#0080ff",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeScreen;
