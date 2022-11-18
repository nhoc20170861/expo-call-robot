import { ViewPropsAndroid, View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CustomButton from "../CustomButton/CustonButton";
function AccountScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 20,
      }}
    >
      <CustomButton title="Logout" onPress={() => logout()}></CustomButton>
    </View>
  );
}

export default AccountScreen;
