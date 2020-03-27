import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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
import { signInRequest } from '~/store/modules/auth/action';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const passwordRef = useRef();

  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current.focus()}
          />

          <FormInput
            ref={passwordRef}
            icon="lock-outline"
            secureTextEntry
            onChangeText={setPassword}
            placeholder="Sua senha secreta"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.object,
};
