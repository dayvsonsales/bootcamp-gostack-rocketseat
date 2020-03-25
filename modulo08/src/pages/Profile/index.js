import React from 'react';

import AvatarInput from '~/pages/Profile/AvatarInput';

import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from './styles';
import { persistor } from '~/store';

import { updateProfileRequest } from '~/store/modules/user/action';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleLogout() {
    persistor.purge().then(
      window.location.reload()
    );
  }

  return (<Container>
    <Form initialData={profile} onSubmit={handleSubmit}>
      <AvatarInput name="avatar_id" />

      <Input name="name" placeholder="Nome completo" />
      <Input name="email" type="email" placeholder="Seu endereço de email" />

      <hr />

      <Input type="password" name="oldPassword" placeholder="Nova senha" />
      <Input type="password" name="password" placeholder="Nova senha" />
      <Input type="password" name="confirmPassword" placeholder="Confirmar nova senha" />
      
      <button type="submit">Atualizar perfil</button>
    </Form>

    <button type="button" onClick={handleLogout}>Sair do GoBarber</button>
  </Container>);
}
