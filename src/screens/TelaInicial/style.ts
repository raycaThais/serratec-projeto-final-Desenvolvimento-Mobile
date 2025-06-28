import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    justifyContent: 'center',
  },
  btComojogar: {
    position: 'absolute',
    right: 20,
    marginTop: 90,
  },
  botoes: {
    alignItems: 'center',
    gap: 10,
    top: 1,
  },
  duvidas: {
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradient: {
    padding: 10,
    borderRadius: 5,
    top: 1,
  },
  titulo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // opcional: escurece o fundo
  },
  containermodal: {
  // backgroundColor: 'orange', // Remova ou comente esta linha
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  width: '90%',
  minHeight: 200,
  padding: 20,
  overflow: 'hidden', // Adicione esta linha
},
  modaltext: {
    fontSize: 14,
    textAlign: 'center'
  },
});