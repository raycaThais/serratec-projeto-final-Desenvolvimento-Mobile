import { View, Text, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, ImageBackground, Image, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { styles } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { postUserItem, getUserItems } from "../../services/LoginApi";
import logo from '../../../assets/LogoSemFundo.png';
import fundo from '../../../assets/apenasFundo.png';
import { RootStackParamList } from "../../routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import FloatingAnimation from "../../components/FloatingAnimation";
import { useTema } from "../../context";
import { ButtonTema } from "../../components/ButtonTema";
import { ButtonTemaEscuro } from "../../components/ButtonTemaEscuro";
import fundoEscuro from "../../../assets/ModoNoturno.png"

export const Cadastro = () => {

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [mostraAlertaEmail, setMostraAlertaEmail] = useState<boolean>(false);
  const [mostraAlertaNome, setMostraAlertaNome] = useState<boolean>(false);
  const [mostraAlertaSenha, setMostraAlertaSenha] = useState<boolean>(false);
  const [mostraAlertaEmailInvalido, setMostraAlertaEmailInvalido] = useState<boolean>(false);
  const [mostraAlertaSenhaInvalida, setMostraAlertaSenhaInvalida] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // add validaçao ao email
  function emailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  // add validacao a senha
  function senhaValida(senha: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(senha)
  }
  const senhaRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const { tema } = useTema()
  const isEscuro = tema === "escuro";


  const botaoCadastrar = async () => {

    if (email.trim() === "" || nome.trim() === "" || senha.trim() === "") {

      if (email.trim() === "") {
        setMostraAlertaEmail(true)
      } if (nome.trim() === "") {
        setMostraAlertaNome(true)
      } if (senha.trim() === "") {
        setMostraAlertaSenha(true)
      }
      return
    }
    // se email e senha nao forem validos eu lanco para a funcao de mostrar email/senha invalida
    if (!emailValido(email)) {
      setMostraAlertaEmailInvalido(true);
      return
    }

    if (!senhaValida(senha)) {
      setMostraAlertaSenhaInvalida(true);
      return
    }

    try {
      const response = await getUserItems();
      const ListarUsuarios = Array.isArray(response.data) ? response.data : [];
      const emailExistente = ListarUsuarios.some(usuarios => usuarios.email === email);
      if (emailExistente) {
        Alert.alert("Email já cadastrado")
        return
      }
      await postUserItem({ nome, email, senha });
      Alert.alert("Usuario cadastrado com sucesso")
      navigation.navigate("Login")

    } catch (error) {
      Alert.alert("Erro ao cadastrar o usuario")

    }
  }

  return (
    <>
      <ImageBackground source={isEscuro ? fundoEscuro : fundo} style={styles.fundoImg}>
        <KeyboardAvoidingView
          behavior="height"
          style={{ flex: 1 }}
        >
          <View>
            <ButtonTema />
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <FloatingAnimation duration={4000} distance={5} rotationAmount={3}>
                <Image source={logo} style={styles.logo} />
              </FloatingAnimation>
              <View style={styles.cadastro}>
                <Text style={styles.title}>Cadastre-se</Text>
                {mostraAlertaNome && <Text style={{ color: 'red', fontWeight: 'bold' }}>Nome em branco</Text>}
                <Input onChangeText={setNome}
                  value={nome} placeholder="Nome"
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  placeholderTextColor="#000"
                />
                {mostraAlertaEmail && <Text style={{ color: 'red', fontWeight: 'bold' }}>Email em branco</Text>}
                {mostraAlertaEmailInvalido && <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>Formato de email inválido</Text>}
                <Input onChangeText={setEmail}
                  ref={emailRef}
                  value={email} placeholder="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => senhaRef.current?.focus()}
                  placeholderTextColor="#000"
                />
                {mostraAlertaSenha && <Text style={{ color: 'red', fontWeight: 'bold' }}>Senha em branco</Text>}
                {mostraAlertaSenhaInvalida && <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula{"\n"} e 1 caractere especial</Text>}
                <Input onChangeText={setSenha}
                  value={senha} placeholder="Senha"
                  secureTextEntry
                  ref={senhaRef}
                  returnKeyType="go"
                  onSubmitEditing={botaoCadastrar}
                  autoCapitalize="none"
                  placeholderTextColor="#000"
                />
                {isEscuro ? (
                  <ButtonTemaEscuro onPress={botaoCadastrar} nome={"Entrar"} />
                ) : (
                  <Button onPress={botaoCadastrar} nome={"Entrar"} />
                )}
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
      </ImageBackground >
    </>
  )
}