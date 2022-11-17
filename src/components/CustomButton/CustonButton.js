import {Pressable, Text, StyleSheet} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, title}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3B71F3',
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
export default CustomButton;
