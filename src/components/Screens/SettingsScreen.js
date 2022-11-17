import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import styles from "./style";
import CustomAlert from "../CustomAlert/CustomAlert";

function SettingsScreen() {
  const [name, SetName] = useState("");
  const [submitted, SetSubmitted] = useState(false);
  const [customAlert, SetcustomAlert] = useState(false);
  const onPressHandler = () => {
    if (name.length > 3) {
      SetSubmitted(true);
      //SetcustomAlert(false);
    } else {
      // Alert
      //   Alert.alert(
      //     'Warning',
      //     'The name must be longer than 3 characters',
      //     [
      //       {
      //         text: 'OK',
      //         onPress: () => console.warn('OK Pressed!'),
      //       },
      //     ],
      //     {
      //       cancelable: true,
      //       onDismiss: () => console.warn('Alert dismissed!'),
      //     },
      //   );
      // }
      SetSubmitted(false);
      SetcustomAlert(true);
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
      <Text style={styles.text}>Please write your name</Text>
      <TextInput
        value={name}
        style={styles.textInput}
        placeholder="e.g: Pham Anh Quan"
        onChangeText={(value) => SetName(value)}
      />
      <View style={styles.flexItem1}>
        <Button title="Submit" onPress={onPressHandler} />
        <Button
          title="Clear"
          onPress={() => {
            SetName("");
            SetSubmitted(false);
          }}
        />
      </View>
      {submitted ? <Text style={styles.text}>Your name is: {name}</Text> : null}
    </View>
  );
}

export default SettingsScreen;
