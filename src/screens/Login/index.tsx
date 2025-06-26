import { TouchableOpacity, View, Text } from "react-native"
import React from "react"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { styles } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';

export const Login = () => {

    return(
        <View style={styles.container}>
            <LinearGradient colors={['#F57C00', '#1976D2']} style={{ flex: 1 }}>
            <View style={styles.login}>
                <Text style={styles.titulo}>Login</Text>
                <Input  placeholder="email" placeholderTextColor="#E0F7FA"/>
                <Input  placeholder="password" placeholderTextColor="#E0F7FA"/>
                <Button nome={"Logar"} />
                <TouchableOpacity>
                    <Text style={styles.texto}>
                        Cadastre-se
                    </Text>
                </TouchableOpacity> 
            </View>
            </LinearGradient>
        </View>
    )
}