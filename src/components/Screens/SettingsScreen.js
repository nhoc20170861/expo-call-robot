import { View, Text, ToastAndroid } from "react-native";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./style";
import { AuthContext } from "../context/AuthContext";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustonButton";
// import AsyncStorage from "@react-native-async-storage/async-storage";
function SettingsScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
  });
  const { stationPram, updateStationPram } = useContext(AuthContext);

  const onPressHandler = async (data) => {

    const result = await updateStationPram(data);
    console.log(result);
    if (result == "Successed") {
      ToastAndroid.showWithGravityAndOffset(
        "Set pram successed!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        100
      );
    }

    else {
      ToastAndroid.showWithGravityAndOffset(
        "Set pram fail!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        0,
        100
      );

    }
  };
  return (
    <View style={styles.body}>
      <Text style={styles.header}>Set Pramater</Text>
      <View
        style={{
          width: "100%",
          padding: 20,
        }}
      >
        <Text style={styles.text}>StationName</Text>
        <CustomInput
          name="StationName"
          placeholder={stationPram["StationName"]}
          rules={{ required: "StationName is required" }}
          control={control}
          secureTextEntry={false}
        />
        <Text style={styles.text}>LineName</Text>
        <CustomInput
          name="LineName"
          placeholder={stationPram["LineName"]}
          rules={{ required: "LineName is required" }}
          control={control}
          secureTextEntry={false}
        />
      </View>

      <View style={styles.flexItem1}>
        <CustomButton
          title="Submit"
          onPress={handleSubmit(onPressHandler)}
        ></CustomButton>
      </View>
    </View>
  );
}

export default SettingsScreen;
