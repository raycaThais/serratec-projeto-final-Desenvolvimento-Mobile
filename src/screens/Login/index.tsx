import { TextInput, TouchableOpacity, View, Text } from "react-native"
import React from "react"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"

export const Login = () => {

    return(
        <View>
            <Input />
            <Input />
            <Button nome={"Logar"} />
            <TouchableOpacity>
                <Text>
                    Cadastre-se
                </Text>
            </TouchableOpacity>  
        </View>
    )
}