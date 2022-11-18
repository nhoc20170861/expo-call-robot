// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TabNavigation from "./src/components/TabNavigation/TabNavigation";
import { AuthProvider } from "./src/components/context/AuthContext";
export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <TabNavigation />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
