import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import api from '~/services/api';

export default function Confirm({ route, navigation }) {
  const { provider, time } = route.params;

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    // navigation.pop(3);
    navigation.navigate('Home');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />

        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={() => handleAddAppointment()}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};
