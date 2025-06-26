import { TouchableOpacity, View, Text } from "react-native"
import React from "react"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { styles } from "./styles";

export const Login = () => {

    return(
        <View style={styles.container}>
            
            <View style={styles.login}>
                <Text style={styles.titulo}>Login</Text>
                <Input  placeholder="email"/>
                <Input  placeholder="password"/>
                <Button nome={"Logar"} />
                <TouchableOpacity>
                    <Text>
                        Cadastre-se
                    </Text>
                </TouchableOpacity> 
            </View>
        </View>
    )
}