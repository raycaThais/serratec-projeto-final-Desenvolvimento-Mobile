import { View, Text, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, ImageBackground, Image } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { postUserItem } from "../../services/LoginApi";
import logo from '../../../assets/LogoSemFundo.png';
import fundo from '../../../assets/apenasFundo.png';
import { RootStackParamList } from "../../routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export const Cadastro = () => {

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [mostraAlertaEmail, setMostraAlertaEmail] = useState<boolean>(false);
    const [mostraAlertaNome, setMostraAlertaNome] = useState<boolean>(false);
    const [mostraAlertaSenha, setMostraAlertaSenha] = useState<boolean>(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const botaoCadastrar = async () => {

        if(email.trim() === "" || nome.trim() === "" || senha.trim() === "" ){

        if(email.trim() === ""){
            setMostraAlertaEmail(true)   
        } if(nome.trim() === ""){
            setMostraAlertaNome(true) 
        } if(senha.trim() === ""){
            setMostraAlertaSenha(true)       
        }
        return
    }

        try{
            const response = await postUserItem({nome, email, senha})
            Alert.alert("Usuario cadastrado com sucesso")
            navigation.navigate("Login")

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
                    {mostraAlertaNome&&<Text style={{color: 'red', fontWeight: 'bold'}}>Nome em branco</Text>}
                    <Input onChangeText={setNome} value={nome} placeholder="Nome"/>
                    {mostraAlertaEmail&&<Text style={{color: 'red', fontWeight: 'bold'}}>Email em branco</Text>}
                    <Input onChangeText={setEmail} value={email} placeholder="Email"/>
                    {mostraAlertaSenha&&<Text style={{color: 'red', fontWeight: 'bold'}}>Senha em branco</Text>}
                    <Input onChangeText={setSenha} value={senha} placeholder="Senha" secureTextEntry/>
                    <Button onPress={botaoCadastrar} nome={"Cadastrar"} />
                    <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}>
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