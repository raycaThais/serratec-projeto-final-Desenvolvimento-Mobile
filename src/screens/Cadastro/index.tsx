import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const Cadastro = () => {

    

    return(
        <View style={styles.container}>
            <LinearGradient colors={['#F57C00', '#1976D2']} style={{ flex: 1 }} >
                <View style={styles.cadastro}>
                    <Text style={styles.title}>Cadastre-se</Text>
                    <Input placeholder="Nome"/>
                    <Input placeholder="Email"/>
                    <Input placeholder="Senha"/>
                    <Button nome={"Cadastrar"} />
                    <TouchableOpacity>
                        <Text style={styles.texto}>
                            Voltar
                        </Text>
                    </TouchableOpacity> 
                </View>
            </LinearGradient>
        </View>
    )
}