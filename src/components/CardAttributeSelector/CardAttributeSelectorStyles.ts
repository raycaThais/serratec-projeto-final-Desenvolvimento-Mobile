import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;
const CARD_HEIGHT = CARD_WIDTH * 1.25;

const CardAttributeSelectorStyles = StyleSheet.create({
  cardShadow: {
    width: CARD_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20,20,30,0.82)',
    borderRadius: 28,
    paddingTop: 12,
    paddingBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
    marginBottom: 0,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  cardName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    textAlign: 'center',
    letterSpacing: 1.1,
  },
  closeBtn: {
    marginTop: 18,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
  closeText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CardAttributeSelectorStyles; 