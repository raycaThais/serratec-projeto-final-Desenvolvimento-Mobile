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
    marginTop: 60,
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containermodal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    minHeight: 200,
    padding: 10,
    overflow: 'hidden'
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  caixaScroll: {
    width: '100%',
    maxHeight: 400,
  },
  secoesduvidas: {
    marginBottom: 10,
  },
  textosecaoduvidas: {
    fontSize: 15,
    textAlign: 'left',
    margin: 5,
  },
});