import { View, Text, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, ImageBackground, Image } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { postUserItem } from "../../services/LoginApi";
import logo from '../../../assets/LogoSemFundo.png';
import fundo from '../../../assets/apenasFundo.png';

export const Cadastro = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [nome, setNome] = useState<string>("");

    const botaoCadastrar = async () => {

        try{
            const response = await postUserItem({nome, email, senha})
            Alert.alert("Usuario cadastrado com sucesso")

        } catch(error){
            Alert.alert("Erro ao cadastrar o usuario")

        }
    }

    return(
        <>
        <ImageBackground source={fundo} style={styles.fundoImg}>  
        <KeyboardAvoidingView
              behavior= "height"
              style={{ flex: 1 }}
            >
        <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
              >
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
                <View style={styles.cadastro}>
                    <Text style={styles.title}>Cadastre-se</Text>
                    <Input onChangeText={setNome} value={nome} placeholder="Nome"/>
                    <Input onChangeText={setEmail} value={email} placeholder="Email"/>
                    <Input onChangeText={setSenha} value={senha} placeholder="Senha" secureTextEntry/>
                    <Button onPress={botaoCadastrar} nome={"Cadastrar"} />
                    <TouchableOpacity>
                        <Text style={styles.texto}>
                            Voltar
                        </Text>
                    </TouchableOpacity> 
                </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </ImageBackground>
        </>
    )
}