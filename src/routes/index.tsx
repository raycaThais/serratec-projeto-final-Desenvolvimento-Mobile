import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { Cadastro } from '../screens/Cadastro';
import GameScreen from '../screens/GameScreen/GameScreen';
import { BottomTabsNavigator } from './BottomTabs';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncService from '../services/Async';

export type RootStackParamList = {
  HomeTabs: undefined;
  Login: undefined;
  Cadastro: undefined;
  GameScreen: undefined;
  DeckScreen: undefined;
  PerfilScreen: undefined;  
};
 const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
   const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncService.getUser();
      setIsLogged(!!user);
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } 
  
 
    return (      
        <NavigationContainer>
          <Stack.Navigator initialRouteName={isLogged ? "HomeTabs" : "Login"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={BottomTabsNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="GameScreen" component={GameScreen} />         
          </Stack.Navigator>
        </NavigationContainer>
        
    );
}