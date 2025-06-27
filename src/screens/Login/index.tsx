import { TouchableOpacity, View, Text, Image } from "react-native"
import React from "react"
import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { styles } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import { getUserItems } from "../../services/LoginApi";
import logo from '../../assets/imagens/logo.png'

export const Login = () => {

   const validarLogin = async () => {
      try {
          const response = await getUserItems();
          console.log(response.data);
      } catch (error) {
          console.error("Erro ao buscar usuários:", error);
      }
  }

    return(
      <LinearGradient colors={['#1976D2', '#1976D2']} style={{paddingBottom: 117, marginTop: 33, }}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.container}>          
          <View style={styles.login}>
              <Text style={styles.titulo}>Login</Text>
              <Input  placeholder="email" placeholderTextColor="#000"/>
                <Input  placeholder="password" placeholderTextColor="#000"/>
              <Button onPress={validarLogin} nome={"Entrar"} />
              <TouchableOpacity>
                  <Text style={styles.texto}>
                      Cadastre-se
                  </Text>
              </TouchableOpacity> 
          </View>           
        </View>
      </LinearGradient>
    )
}