import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { useTema } from "../../context";

interface ButtonProps extends TouchableOpacityProps {
  nome: string;
}
export const ButtonStart = ({ nome, ...rest }: ButtonProps) => {
  const { tema } = useTema()
  const isEscuro = tema === "escuro";

  return (
    <TouchableOpacity style={styles.button}{...rest}>
      <LinearGradient
        colors={isEscuro? ["#1E1E1E", "#2C2C2C"] : ["#f8c007", "#bd6a26"]}
        style={styles.gradient}>

        <Text style={styles.nome}>{nome}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}