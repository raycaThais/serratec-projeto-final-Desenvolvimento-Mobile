import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Login';
import { Cadastro } from '../screens/Cadastro';
import GameScreen from '../screens/GameScreen/GameScreen';
import { BottomTabsNavigator } from './BottomTabs';

export type RootStackParamList = {
  HomeTabs: undefined;
  Login: undefined;
  Cadastro: undefined;
  GameScreen: undefined;
  DeckScreen: undefined;  
};
 const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
 
    return (      
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={BottomTabsNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="GameScreen" component={GameScreen} />        
          </Stack.Navigator>
        </NavigationContainer>
        
    );
}