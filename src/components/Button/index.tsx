import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps extends TouchableOpacityProps {
  nome: string;
}
export const Button = ({ nome, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button}{...rest}>
      <LinearGradient
        colors={["#f8c007", "#bd6a26"]}
        style={styles.gradient}>

        <Text style={styles.nome}>{nome}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}