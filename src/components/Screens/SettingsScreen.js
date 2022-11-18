import { View, Text, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./style";
import CustomAlert from "../CustomAlert/CustomAlert";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustonButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
function SettingsScreen() {
  const [customAlert, SetcustomAlert] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   username: "Robotics",
    //   password: "robotics",
    // },
  });

  const onPressHandler = (data) => {
    try {
      console.log(data);
      AsyncStorage.getItem("StationPram").then(async (value) => {
        if (value != null) {
          const StationPram = JSON.parse(value);
          console.log(StationPram);
          if (
            StationPram.StationName !== data.StationName ||
            StationPram.LineName !== data.LineName
          ) {
            try {
              StationPram.StationName = data.StationName;
              StationPram.LineName = data.LineName;
              await AsyncStorage.setItem(
                "StationPram",
                JSON.stringify(StationPram)
              );
              ToastAndroid.showWithGravityAndOffset(
                "Set pram sucessed!",
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0,
                100
              );
            } catch (error) {
              console.log("Set station pram error: ", error);
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.body}>
      {customAlert ? (
        <CustomAlert
          customAlert={customAlert}
          SetcustomAlert={() => SetcustomAlert(false)}
        />
      ) : null}
      <Text style={styles.header}>Set Pramater</Text>
      <View
        style={{
          width: "100%",
          padding: 20,
        }}
      >
        <Text style={styles.text}>StationName</Text>
        <CustomInput
          name="SationName"
          placeholder="station-1"
          rules={{ required: "StationName is required" }}
          control={control}
          secureTextEntry={false}
        />
        <Text style={styles.text}>LineName</Text>
        <CustomInput
          name="LineName"
          placeholder="station-7"
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
