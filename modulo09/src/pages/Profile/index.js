import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';

import { updateProfileRequest } from '~/store/modules/user/action';

import {
  Title,
  Container,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

import { persistor } from '~/store';

export default function Profile() {
  const profile = useSelector((state) => state.user.profile);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const oldPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        email,
        name,
        password,
        oldPassword,
        confirmPassword: passwordConfirm,
      })
    );
  }

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setPasswordConfirm('');
  }, [profile]);

  function handleLogout() {
    persistor.purge();
  }

  return (
    <Background>
      <Container>
        <Title>Meu perfil</Title>

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Seu nome completo"
            returnKeyType="next"
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => emailRef.current.focus()}
          />

          <FormInput
            ref={emailRef}
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
          />

          <Separator />

          <FormInput
            ref={oldPasswordRef}
            icon="lock-outline"
            secureTextEntry
            returnKeyType="next"
            value={oldPassword}
            onChangeText={setOldPassword}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="Sua senha antiga"
          />

          <FormInput
            ref={passwordRef}
            icon="lock-outline"
            secureTextEntry
            returnKeyType="next"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
            placeholder="Sua senha secreta"
          />

          <FormInput
            ref={passwordConfirmRef}
            icon="lock-outline"
            secureTextEntry
            returnKeyType="send"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            onSubmitEditing={handleSubmit}
            placeholder="Confirme sua senha"
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Atualizar perfil
          </SubmitButton>
          <LogoutButton loading={loading} onPress={handleLogout}>
            Sair do GoBarber
          </LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}
