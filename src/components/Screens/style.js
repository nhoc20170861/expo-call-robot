import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 50,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  flexItem2: {
    margin: 10,
    width: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#21a3d0",
  },
});
export default styles;
