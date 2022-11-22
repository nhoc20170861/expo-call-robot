import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./style";
import CustomButton from "../CustomButton/CustonButton";
import RobotModel from "../RobotModel/RobotModel";
import CustomAlert from "../CustomAlert/CustomAlert";

import CustomInput from "../CustomInput/CustomInput"

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
  const { stationPram } = useContext(AuthContext);
  const [isGetInfoRobot, SetisGetInfoRobot] = useState(true);
  const { robotId, robotName } = route.params;

  // console.log(route.params);
  const [taskNavigationTo, SettaskNavigationTo] = useState(false);
  const [taskNavigationLine, SettaskNavigationLine] = useState(false);
  const [robotConnection, SetrobotConnecttion] = useState(0);

  const [customAlert, SetcustomAlert] = useState(false);
  const [callApi, SetcallApi] = useState('CallRobot');


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
  });

  const onCancelTask = async (data) => {
    console.log(data);
    const url = "http://172.20.2.50:8080/api/Remote/Robot/" + robotId + "/Task/" + data["TaskName"];

    try {
      const response = await fetch(url, {
        method: 'DELETE'
      });
      const result = await response.json();
      console.log(result);
      if (!result["isError"]) {
        SetcustomAlert(true);
        SetcallApi('CancelTask');
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    stationPram;
  });


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
    if (robotConnection === 3) {
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
    }


  }, 2000);

  const getState = async () => {

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
        SetrobotConnecttion(3);
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
      }
    } catch (error) {
      console.error(error);
    } finally {
      SetisGetInfoRobot(false);
    }



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
        SetcallApi('CallRobot');
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
        SetcallApi('CallRobot');
      }
    } catch (error) {
      console.error("Error", error);
    }

  };

  useEffect(() => {

    getState();
  }, []);



  if (isGetInfoRobot) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (

    <View style={styles.bodyRobotInfo}>
      {customAlert ? (
        <CustomAlert
          // customAlert={customAlert}
          message={(callApi === 'CallRobot') ? "Call robot successed" : "Cancel Task successed"}
          SetcustomAlert={() => SetcustomAlert(false)}
        />
      ) : null}
      <Text style={styles.header}>{robotName}</Text>
      {robotConnection === 3 ? (
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
              {
                taskNavigationTo ? 'Waiting robot finish task NavigationTo before call robot again' :
                  (taskNavigationLine) ? 'Waiting robot finish task NavigationLine before call robot again' : 'Robot free'
              }

            </Text>
          </View>

          <View style={styles.flexItem4}>
            <CustomInput
              name="TaskName"
              placeholder="task will be deleted"
              rules={{ required: "Taskname is required" }}
              control={control}
              secureTextEntry={false}
            />
            <CustomButton
              title="Cancel Task"
              color='red'
              onPress={handleSubmit(onCancelTask)}
            ></CustomButton>
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
