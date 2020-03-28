import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/SignIn';
import SignUp from './pages/SignUp';
import NavigationService from './services/navigation/NavigationService';
import Confirm from '~/pages/New/Confirm';
import SelectDateTime from '~/pages/New/SelectDateTime';
import SelectProvider from '~/pages/New/SelectProvider';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarIcon = (props, name) => {
  return <Icon name={name} size={20} color={props.color} />;
};

const defaultStackNavigatorOptions = (navigation) => {
  return {
    headerShown: true,
    headerTransparent: true,
    headerTintColor: '#fff',
    headerLeftContainerStyle: {
      marginLeft: 20,
    },
    headerStyle: {
      backgroundColor: '#7159c1',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#eee',
    },
    headerLeft: (props) => <HeaderLeft navigation={navigation} {...props} />,
  };
};

const HeaderLeft = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  );
};

const NewStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectProvider"
      screenOptions={({ navigation }) =>
        defaultStackNavigatorOptions(navigation)
      }>
      <Stack.Screen
        name="SelectProvider"
        component={SelectProvider}
        options={{
          title: 'Selecione o prestador',
        }}
      />
      <Stack.Screen
        name="SelectDateTime"
        component={SelectDateTime}
        options={{
          title: 'Selecione o horário',
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          title: 'Confirme',
        }}
      />
    </Stack.Navigator>
  );
};

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
              tabBarIcon: (props) => tabBarIcon(props, 'event'),
            }}
          />
          <Tab.Screen
            name="New"
            component={NewStack}
            options={{
              unmountOnBlur: true,
              tabBarVisible: false,
              tabBarLabel: 'Agendar',
              tabBarIcon: (props) => tabBarIcon(props, 'add-circle-outline'),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: (props) => tabBarIcon(props, 'person'),
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

tabBarIcon.propTypes = {
  color: PropTypes.string,
};

HeaderLeft.propTypes = {
  navigation: PropTypes.object,
};
