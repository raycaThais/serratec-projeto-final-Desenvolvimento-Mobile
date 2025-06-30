import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    width: 150,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nome: {
    color: "#ffff",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  gradient: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    width: 200,
    height: 100,
  },
});
