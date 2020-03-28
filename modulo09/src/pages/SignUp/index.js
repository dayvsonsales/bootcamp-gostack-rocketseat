import React, { useRef } from 'react';
import { Image } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import {
  Container,
  Form,
  FormInput,
  SignLink,
  SignLinkText,
  SubmitButton,
} from './styles';

export default function SignUp({ navigation }) {
  const passwordRef = useRef();
  const emailRef = useRef();

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch({ type: '@auth/SIGN_UP_REQUEST' });
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Seu nome completo"
            returnKeyType="next"
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
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <FormInput
            ref={passwordRef}
            icon="lock-outline"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            placeholder="Sua senha secreta"
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Criar conta
          </SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.pop();
          }}>
          <SignLinkText>Já possuo uma conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.object,
};
