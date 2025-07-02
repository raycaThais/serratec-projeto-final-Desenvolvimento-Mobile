import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import  AsyncService  from "../../services/Async";
import { RootStackParamList } from '../../routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';
import fundo from '../../../assets/apenasFundo.png';
import foto from '../../../assets/perfil.png'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Button } from '../../components/Button';

type PerfilScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "PerfilScreen">;

export const PerfilScreen = ({navigation}: {navigation: PerfilScreenNavigationProp}) => {
  const [usuarios, setUsuarios] = useState<any>(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      const data = await AsyncService.getUser();
      setUsuarios(data);
    };

    carregarUsuario();
  }, []);

  if (!usuarios) return <Text>Carregando...</Text>;

  return (
    <ImageBackground source={fundo} style={styles.fundoImg}>
    <View style={styles.container}>
      <Image source={foto} style={styles.foto}/>
      <View style={styles.perfil}>
      <Text style={styles.nome}>
        <MaterialCommunityIcons name="account"
              color={"black"} size={24} /> 
             : {usuarios.nome}
              </Text>
      <Text style={styles.email}>
        <MaterialCommunityIcons name="email"
              color={"black"} size={24} /> 
        : {usuarios.email}
      </Text>
      </View>

      <View style={styles.button}>
      <Button nome='Logout'
       onPress={() => {
        AsyncService.removeData();
        navigation.navigate('Login');
       }} 
       />
        
      </View>

    </View>
    </ImageBackground>
  );
};