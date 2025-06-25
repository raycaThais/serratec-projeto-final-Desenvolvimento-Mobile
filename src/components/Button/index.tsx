import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
nome: string;
}
export const Button = ({ nome, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity {...rest}>
      <Text>{nome}</Text>
    </TouchableOpacity>
  );
}