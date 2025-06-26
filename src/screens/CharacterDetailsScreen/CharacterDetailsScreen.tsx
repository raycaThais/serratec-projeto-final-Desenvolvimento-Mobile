import React from 'react';
import { View, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';

export const CharacterDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // Espera os dados do personagem em route.params
  const character = route.params as any;

  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' }}>
      <CharacterCard {...character} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}; 