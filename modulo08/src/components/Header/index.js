import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Content, Profile } from './styles';

import Notifications from '~/components/Notifications';

import constants from '~/config/Constants';

import logo from '~/assets/logo-purple.svg';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gobarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                profile.avatar
                  ? profile.avatar.url
                  : constants.defaultImageProfile
              }
              alt={profile.name}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
