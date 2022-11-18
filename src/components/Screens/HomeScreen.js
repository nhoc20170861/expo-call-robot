import { View, Text, ScrollView } from "react-native";
import React, { useContext } from "react";

import styles from "./style";
import CustomButton from "../CustomButton/CustonButton";
import TagRobot from "../TagRobot/TagRobot";
import { AuthContext } from "../context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeStack = createNativeStackNavigator();

function RobotList({ navigation }) {
  const { RobotList, setRobotList } = useContext(AuthContext);

  const getInfoRobot = (robot) => {
    console.log(robot);
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
            <TagRobot
              key={index}
              title={item["name"]}
              number={index + 1}
              onGetInfoRobot={() => getInfoRobot(item)}
            />
          );
        })}
      </ScrollView>
      <View style={styles.flexItem2}>
        <CustomButton
          title="Get List Robot"
          onPress={() => getListRobot(apiUrl)}
        ></CustomButton>
      </View>
    </View>
  );
}

function RobotInfo({ route }) {
  // console.log(route);
  const { robotId, robotName } = route.params;
  return (
    <View style={styles.body}>
      <Text style={styles.header}>{robotName}</Text>
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
