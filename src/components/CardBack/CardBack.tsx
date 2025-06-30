import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './CardBackStyles';

export const CardBack = () => (
  <View style={ styles.card }>
    <LinearGradient
      colors={ ['#1e3a8a', '#172554'] }
      style={ styles.gradient }
    />
  </View>
);