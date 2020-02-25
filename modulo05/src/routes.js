import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

const defaultNavigationOptions = {
  headerStyle: { backgroundColor: '#7159c1' },
  headerTintColor: '#FFF',
};

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        headerLayoutPreset="center"
        screenOptions={defaultNavigationOptions}>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: 'Usuário' }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={({ route }) => ({
            title: route.params.name,
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
