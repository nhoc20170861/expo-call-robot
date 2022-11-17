import {View, Text, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import styles from './style';

const CustomAlert = props => {
  // trigger on component mount
  const [showWarning, SetshowWarning] = useState(true);
  console.log(props);
  return (
    <Modal
      visible={showWarning}
      transparent
      animationType="slide"
      hardwareAccelerated
      onRequestClose={() => {
        SetshowWarning(false);
        props.SetcustomAlert();
      }}>
      <View style={styles.centered_view}>
        <View style={styles.warning_modal}>
          <View style={styles.warning_title}>
            <Text style={styles.text}>Warning</Text>
          </View>
          <View style={styles.warning_body}>
            <Text style={styles.text}>Warning</Text>
          </View>
          <Pressable
            onPress={() => {
              SetshowWarning(false);
              props.SetcustomAlert();
            }}
            style={styles.warning_button}
            android_ripple={{color: '#fff'}}>
            <Text style={styles.text}> OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
