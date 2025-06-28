import { StyleSheet } from 'react-native';

const CARD_WIDTH = 180;
const CARD_HEIGHT = 250;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1a2e',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a1a2e',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 50, // Mais espaço no topo
    paddingBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  battlefield: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  playerSide: {
    alignItems: 'center',
  },
  playerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // Wrapper para garantir que o TouchableOpacity e a carta tenham o mesmo tamanho
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    minHeight: 80, // Garante espaço para o texto de status
  },
  statusText: {
    color: '#ffc107',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});