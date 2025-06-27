import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(90, width / 6);

const GameHandStyles = StyleSheet.create({
  handContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 0,
    right: 0,
    height: 180, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20,
    zIndex: 30,
  },
  cardWrapper: {
    position: 'absolute', // Permite que as cartas se sobreponham
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: CARD_WIDTH,
    // A altura é definida pelo CARD_HEIGHT no componente
  },
  
  // Estilos de modal foram removidos pois a lógica foi centralizada
  // no ExpandableCardOverlay.
});

export default GameHandStyles;