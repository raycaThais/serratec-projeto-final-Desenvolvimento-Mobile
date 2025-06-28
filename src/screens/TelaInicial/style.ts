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
  containermodal: {
    backgroundColor: 'orange',
    borderRadius: 50,
    justifyContent: 'flex-start',
    width: '90%',
    height: 500,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  modaltext: {
    fontSize: 14,
    textAlign: 'center'
  },

});

