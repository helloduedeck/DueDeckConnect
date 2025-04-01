import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleSwitch = ({ onToggle, initialState }:any) => {
  const [isEnabled, setIsEnabled] = useState(initialState);

  const toggleSwitch = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    onToggle(newState);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleSwitch}>
      <View style={[styles.container, isEnabled && styles.containerActive]}>
        <View style={[styles.toggle, isEnabled && styles.toggleActive]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
  },
  containerActive: {
    backgroundColor: 'lightgreen',
  },
  toggle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
  toggleActive: {
    backgroundColor: 'green',
    transform: [{ translateX: 20 }],
  },
});

export default ToggleSwitch;
