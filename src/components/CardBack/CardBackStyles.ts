import { StyleSheet } from 'react-native';

// Dobramos o tamanho original
const CARD_WIDTH = 180;
const CARD_HEIGHT = 250;

export const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18, // Aumentamos um pouco o raio
    backgroundColor: '#1e3a8a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  gradient: {
    flex: 1,
    borderRadius: 18,
  },
});