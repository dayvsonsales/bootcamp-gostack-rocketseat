import React from 'react';

import Home from './pages/Home';
import Cart from './pages/Cart';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text } from 'react-native';

import Header from './components/Header';

import NavigationService from './services/navigation';

const Stack = createStackNavigator();

const defaultNavigationOptions = {
  headerStyle: { backgroundColor: 'black' },
  headerTintColor: '#FFF',
  headerTitleAlign: 'left',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  header: navigation => <Header {...navigation} />,
  cardStyle: {
    backgroundColor: 'black',
  },
};

const Routes = () => (
  <NavigationContainer
    ref={navigatorRef => NavigationService.setNavigator(navigatorRef)}>
    <Stack.Navigator
      initialRouteName="Home"
      headerLayoutPreset="center"
      screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'ROCKETSHOES' }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ title: 'Meu Carrinho', headerBackTitleVisible: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
