import React from 'react';
import { View, Button } from 'react-native';

import { persistor } from '~/store';

import Background from '~/components/Background';

// import { Container } from './styles';

export default function Home() {
  function logout() {
    persistor.purge();
  }

  return (
    <Background>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button title="Sair" onPress={logout}></Button>
      </View>
    </Background>
  );
}
