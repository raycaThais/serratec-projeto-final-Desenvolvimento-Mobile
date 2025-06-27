import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 350,
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
});

