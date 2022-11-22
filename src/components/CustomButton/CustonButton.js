import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, title, disable = false, color = '#e56a45' }) => {
  return (

    <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor: color }]} disabled={disable}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>

  );
};
const styles = StyleSheet.create({
  container: {

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
