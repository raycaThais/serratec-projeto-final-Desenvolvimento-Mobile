import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TelaInicial } from '../../screens/TelaInicial';
import { DeckScreen } from '../../screens/DeckScreen/DeckScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';
import { PerfilScreen } from '../../screens/PerfilScreen';

export type BottomTabs = {
  TelaInicial: undefined;
  DeckScreen: undefined;
  PerfilScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabs>();
// para garatir responsividade da barra de navegacao em diferentes telas
const { height } = Dimensions.get('window');
// pega a altura da tela do usuario com o dimensions
const barranav = height > 600 ? 70 : 60;
// se a altura for maior q 600 a height vai ser 70, caso nao, sera 60.

export const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: barranav,
        },
      }}
    >

      <Tab.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home"
              color={color} size={size} />
          ),

        }}
      />
      <Tab.Screen name="DeckScreen"
        component={DeckScreen}
        options={{
          tabBarLabel: 'Deck',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cards" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen name="PerfilScreen"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} />

    </Tab.Navigator>
  );
};



