import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/SignIn';
import SignUp from './pages/SignUp';
import NavigationService from './services/navigation/NavigationService';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer
      ref={(navigatorRef) => NavigationService.setNavigator(navigatorRef)}>
      {signed ? (
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeTintColor: '#FFF',
            inactiveTintColor: 'rgba(255, 255, 255, 0.3)',
            style: {
              backgroundColor: '#8d41a8',
            },
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Agendamentos',
              tabBarIcon: (props) => {
                return <Icon name="event" size={20} color={props.color} />;
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: (props) => {
                return <Icon name="person" size={20} color={props.color} />;
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
