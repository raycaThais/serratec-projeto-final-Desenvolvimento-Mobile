import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 modalBackground: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.7)', // mais escuro
},
  containermodal: {
    backgroundColor: 'orange',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    minHeight: 200,
    padding: 20,
  },
});