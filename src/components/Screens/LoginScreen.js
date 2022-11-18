import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  useWindowDimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustonButton";
import { AuthContext } from "../context/AuthContext";
import logo from "../../../assets/react-native.png";
export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const { height } = useWindowDimensions();

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

  // store userdata
  (async () => {
    try {
      const UserData = {
        Username: "Robotics",
        Password: "robotics",
      };
      const StationPram = {
        StationName: "station-1",
        LineName: "station-7",
      };
      await AsyncStorage.setItem("UserData", JSON.stringify(UserData));
      await AsyncStorage.setItem("StationPram", JSON.stringify(StationPram));
    } catch (error) {
      console.log(error);
    }
  })();

  const checkLoginInfo = (data) => {
    try {
      console.log(data);
      AsyncStorage.getItem("UserData").then((value) => {
        if (value != null) {
          const Info = JSON.parse(value);

          if (Info.Username !== data.username) {
            ToastAndroid.showWithGravityAndOffset(
              "username is wrong!",
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
              0,
              100
            );
          } else if (Info.Password !== data.password) {
            ToastAndroid.showWithGravityAndOffset(
              "password is wrong!",
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
              0,
              100
            );
          } else {
            login();
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const setData = async () => {
  //   if (username.length == 0 || password.length == 0) {
  //     Alert.alert("Warning!", "Please write your data.");
  //   } else {
  //     try {
  //       var user = {
  //         Username: "Robotics",
  //         Password: "robotics",
  //       };
  //       await AsyncStorage.setItem("UserData", JSON.stringify(user));
  //       navigation.navigate("Home");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <View style={styles.root}>
      <Image
        style={([styles.logo], { height: height * 0.15 })}
        source={logo}
        resizeMode="contain"
      ></Image>
      <CustomInput
        name="username"
        placeholder="Username"
        rules={{ required: "Username is required" }}
        control={control}
        secureTextEntry={false}
      />
      <CustomInput
        name="password"
        placeholder="Password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password should be minium 6 characters long",
          },
        }}
        control={control}
        secureTextEntry
      />

      <CustomButton
        title="Login"
        onPress={handleSubmit(checkLoginInfo)}
      ></CustomButton>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202020",
  },
  logo: {
    width: "100%",
  },
});
