import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import  AsyncService  from "../../services/Async";
import { RootStackParamList } from '../../routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ButtonStart } from '../../components/Button Start';

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
    <View>
      <Text>Nome: {usuarios.nome}</Text>
      <Text>Email: {usuarios.email}</Text>
      <ButtonStart nome='Logout'
       onPress={() => {
        AsyncService.removeData();
        navigation.navigate('Login');
       }} 
       />

    </View>
  );
};