import { StyleSheet } from 'react-native';

const GameTableStyles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  tableContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 32,
  },
  deckRow: {
    flexDirection: 'row',
    marginTop: 16,
    minHeight: 60,
  },
  handRow: {
    flexDirection: 'row',
    marginBottom: 16,
    minHeight: 60,
  },
  miniCard: {
    width: 48,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  cardBack: {
    width: 48,
    height: 64,
    backgroundColor: '#333',
    borderRadius: 8,
    marginHorizontal: 2,
    borderWidth: 2,
    borderColor: '#007a3d',
    position: 'absolute',
  },
  cardFront: {
    width: 48,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#007a3d',
  },
  centerArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 80,
  },
  playedCardBot: {
    marginRight: 16,
  },
  playedCardPlayer: {
    marginLeft: 16,
  },
  cardText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  attributeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  attributeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  attributeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  shuffleOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 16,
    borderRadius: 8,
  },
  shuffleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameTableStyles; 