import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import AsyncService from "../../services/Async";
import { RootStackParamList } from '../../routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';
import fundo from '../../../assets/apenasFundo.png';
import foto from '../../../assets/perfil.png'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Button } from '../../components/Button';
import fundoEscuro from "../../../assets/ModoNoturno.png"
import { useTema } from '../../context';
import { ButtonTema } from '../../components/ButtonTema';
import { ButtonTemaEscuro } from '../../components/ButtonTemaEscuro';

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "PerfilScreen">;


export const PerfilScreen = ({ navigation }: { navigation: PerfilScreenNavigationProp }) => {
  const [usuarios, setUsuarios] = useState<any>(null);
  const { tema } = useTema()
  const isEscuro = tema === "escuro";

  useEffect(() => {
    const carregarUsuario = async () => {
      const data = await AsyncService.getUser();
      setUsuarios(data);
    };

    carregarUsuario();
  }, []);

  if (!usuarios) return <Text>Carregando...</Text>;



  return (
    <ImageBackground source={isEscuro ? fundoEscuro : fundo} style={styles.fundoImg}>

      <View>
        <View>
          <ButtonTema />
        </View>
      </View>
      <View style={styles.container}>
        <Image source={foto} style={styles.foto} />

        <View style={styles.perfil}>


          <Text style={isEscuro? styles.nomeEscuro: styles.nome}>
            <MaterialCommunityIcons name="account"
              color={isEscuro? "white": "black"} size={24} />
            : {usuarios.nome}
          </Text>
          <Text style={isEscuro? styles.emailEscuro: styles.email}>
            <MaterialCommunityIcons name="email"
              color={isEscuro? "white": "black"} size={24} />
            : {usuarios.email}
          </Text>


        </View>

        <View style={styles.button}>
          {isEscuro ? (
            <ButtonTemaEscuro onPress={() => {
              AsyncService.removeData();
              navigation.navigate('Login');
            }} nome={"Sair"} />
          ) : (
            <Button onPress={() => {
              AsyncService.removeData();
              navigation.navigate('Login');
            }} nome={"Sair"} />
          )}
        </View>

      </View>

    </ImageBackground>
  );
};