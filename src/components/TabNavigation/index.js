import React, { useContext } from "react";
import LoginScreen from "../Screens/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";
import SettingsScreen from "../Screens/SettingsScreen";
//import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
//import FontAwesome from "@expo/vector-icons/FontAwesome";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { View } from "react-native";
import { AuthContext } from "../context/AuthContext/AuthContext.js";
import { ActivityIndicator } from "react-native-paper";
import CustomButton from "../CustomButton/CustonButton/CustomButton.js";
// Reactnavigation Bottom Tab
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const Tab = createMaterialBottomTabNavigator();

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const Tab = createBottomTabNavigator();
function Account() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CustomButton title="Logout" onPress={() => logout()}></CustomButton>
    </View>
  );
}
function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      initialRouteName="Login"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{
        backgroundColor: "#694fad",
        display: "flex",
        justifyContent: "center",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            size = focused ? 25 : 20;
            color = focused ? "#f0f" : "#555";
          } else if (route.name === "Settings") {
            iconName = "cog";
            size = focused ? 25 : 20;
            color = focused ? "#f0f" : "#555";
          } else if (route.name === "Account") {
            iconName = "user-circle";
            size = focused ? 25 : 20;
            color = focused ? "#f0f" : "#555";
          }
          //return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}
const Stack = createNativeStackNavigator();
const TabNavigation = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size={"large"} />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken !== null ? (
          <Stack.Screen
            name="MyTab"
            options={{ headerShown: false }}
            component={MyTabs}
          />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default TabNavigation;
