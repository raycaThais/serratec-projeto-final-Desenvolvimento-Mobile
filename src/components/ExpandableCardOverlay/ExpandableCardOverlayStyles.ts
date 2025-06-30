import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ExpandableCardOverlayStyles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  cardCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 101,
  },
  // NOVO BOTÃO DE CONFIRMAÇÃO
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#28a745', // Cor verde para confirmar
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeBtn: {
    marginTop: 12,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  closeText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ExpandableCardOverlayStyles;