import { StyleSheet } from 'react-native';

const GameScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between', // Ajuda a alinhar os elementos
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a202c', // Um fundo escuro para o loading
  },
  loadingText: {
    marginTop: 16,
    color: '#f5b942',
    fontSize: 16,
  },
  absoluteScoreBar: {
    position: 'absolute',
    top: 50, // Um pouco mais para baixo
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
  },
  scoreBar: {
    backgroundColor: 'rgba(20,20,30,0.88)',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  scoreText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  roundsText: {
    fontSize: 14,
    color: '#a3e635',
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  // NOVA ÁREA PARA A CARTA DO BOT
  botPlayArea: {
    height: 150, // Altura fixa para a área do bot
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, // Espaço para o placar
  },
  messageContainer: {
    paddingHorizontal: 20,
    paddingBottom: 200, // Deixa espaço para a mão de cartas
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
});

export default GameScreenStyles;