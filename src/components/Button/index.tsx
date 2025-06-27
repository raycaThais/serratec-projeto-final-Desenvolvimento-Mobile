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
      colors={["#f9c004", "#b46125"]}
      style={styles.gradient}>
      
      <Text style={styles.nome}>{nome}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}