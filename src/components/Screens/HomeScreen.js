import { View, Button, ToastAndroid } from "react-native";
import React, { useState } from "react";

import styles from "./style.js";
function HomeScreen() {
  const [idRobot, SetidRobot] = useState([]);
  const apiUrl =
    "http://172.20.2.50:8080/api/Remote/Robots?model=agv-500&map=demo-f1";
  const getDataUsingGet = async (apiUrl) => {
    //GET request

    //'https://api.openweathermap.org/data/2.5/weather?q=Hanoi&appid=d1586f596d97979063a6457adacfd982';
    //'http://172.20.2.50:8080/api/Remote/Robots?model=agv-500&map=demo-f1';
    try {
      const result = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await result.json();
      if (json) {
        SetidRobot(json);
        // Toast Message
        console.log(idRobot[2]);
        ToastAndroid.show(JSON.stringify(json), ToastAndroid.LONG);
      } else {
        console.log("can not fetch");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <View style={styles.body}>
      <View style={styles.flexItem2}>
        <Button title="Get Url" onPress={() => getDataUsingGet(apiUrl)} />
      </View>
    </View>
  );
}

export default HomeScreen;
