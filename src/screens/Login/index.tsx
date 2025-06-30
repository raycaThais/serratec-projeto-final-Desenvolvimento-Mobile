import { TouchableOpacity, View, Text, Image, ImageBackground, Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import React, { useRef, useState } from "react"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { styles } from "./styles";
import { getUserItems, UserItemProps } from "../../services/LoginApi";
import logo from '../../../assets/LogoSemFundo.png'
import fundo from '../../../assets/apenasFundo.png'
import  { RootStackParamList } from "../../routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
export const Login = ({navigation}: {navigation: LoginScreenNavigationProp}) => {

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const [usuarios, setUsuarios] = useState<UserItemProps[]>([]);

  const senhaRef = useRef<TextInput>(null);

 

  const validarLogin = async () => {
    try {
      const response = await getUserItems();
           
      const listarUsuarios = Array.isArray(response.data) ? response.data : [];
      setUsuarios(listarUsuarios);

      const usuarioEncontrado = listarUsuarios.find(usuario => usuario.email === email && usuario.senha === senha);

      if (usuarioEncontrado) {
        Alert.alert('Login válido', `Bem vindo, ${usuarioEncontrado.nome}!`) //mudar para o assincronous storage
        setEmail("");
        setSenha("");
        navigation.navigate("HomeTabs");
      }else {
        Alert.alert('Login inválido', 'Usuário ou senha incorretos.');
        setSenha("")
      }

    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      Alert.alert('Erro', 'Não foi possível realizer o login. Tente novamente mais tarde.');
    }
  }

  return (
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
          <View style={styles.login}>
            <Text style={styles.titulo}>Login</Text>
            <Input value={email} 
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address" 
            placeholder="email"
            returnKeyType="next"
            onSubmitEditing={() => senhaRef.current?.focus()} 
            placeholderTextColor="#000" 
            />
            <Input value={senha}
            ref={senhaRef}
             onChangeText={setSenha}
             autoCapitalize="none"  
             placeholder="password"  
             secureTextEntry
             returnKeyType="go"
             onSubmitEditing={validarLogin}
             placeholderTextColor="#000" 
             />
            <Button onPress={validarLogin} nome={"Entrar"} />
            <TouchableOpacity 
            onPress={() => navigation.navigate("Cadastro")}>
              <Text style={styles.texto}>
                Cadastre-se
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