import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TelaInicial } from '../../screens/TelaInicial';
import { DeckScreen } from '../../screens/DeckScreen/DeckScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type BottomTabs = {
  TelaInicial: undefined;  
  DeckScreen: undefined;
  Perfil: undefined;
};

const Tab = createBottomTabNavigator<BottomTabs>();

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
          height: 100,
        },
      }}
    >
      <Tab.Screen 
            name="TelaInicial" 
            component={TelaInicial}
            options={{
              tabBarLabel: 'Início',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name= "home"
                color={color} size={size}/>
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

    </Tab.Navigator>
  );
};



