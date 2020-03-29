import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

import api from '~/services/api';

function Home({ isFocused }) {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('/appointments');

    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    await api.delete(`/appointments/${id}`);

    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Home.propTypes = {
  isFocused: PropTypes.bool,
};

export default withNavigationFocus(Home);
