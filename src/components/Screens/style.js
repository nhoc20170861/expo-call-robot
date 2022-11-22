import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 40,
  },
  bodyRobotInfo: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 5,
  },
  text: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    width: 200,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 15,
  },
  flexItem1: {
    width: 150,
    height: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  flexItem2: {
    margin: 10,
    width: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 5,
  },
  flexItem3: {
    margin: 10,
    width: 250,
    padding: 5,
    display: "flex",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#00FFFF',

  },
  flexItem4: {
    margin: 10,
    width: 250,
    padding: 10,
    display: "flex",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#00FFFF',

  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#21a3d0",
  },
});
export default styles;
