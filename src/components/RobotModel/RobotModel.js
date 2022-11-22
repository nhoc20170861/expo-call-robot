import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
const TagRobot = (props) => {
  // console.log(props);
  const { number, onGetInfoRobot } = props;
  const numberText = number < 10 ? `0${number}` : number;
  const itemBackground = number % 2 === 0 ? styles.even : styles.odd;
  return (
    <TouchableOpacity onPress={onGetInfoRobot}>
      <View style={styles.item}>
        <View style={[styles.square, itemBackground]}>
          <Text style={styles.number}>{numberText}</Text>
        </View>
        <Text style={styles.content}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  square: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  even: {
    backgroundColor: "#53d6f2",
  },
  odd: {
    backgroundColor: "#55f253",
  },

  number: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  content: {
    width: "75%",
    fontSize: 20,
  },
});
export default TagRobot;
