import { StyleSheet } from "react-native";

// styles do modal
export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)', // fundo da tela mais escuro
  },
  containermodal: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    minHeight: 200,
    padding: 10,
  },
});