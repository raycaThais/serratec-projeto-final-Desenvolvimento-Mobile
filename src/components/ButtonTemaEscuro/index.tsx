import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps extends TouchableOpacityProps {
  nome: string;
}
export const ButtonTemaEscuro = ({ nome, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button}{...rest}>
      <LinearGradient
        colors={["#1E1E1E", "#2C2C2C"]}
        style={styles.gradient}>

        <Text style={styles.nome}>{nome}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}