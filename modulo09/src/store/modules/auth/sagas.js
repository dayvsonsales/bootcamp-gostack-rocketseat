import { takeLatest, call, put, all } from 'redux-saga/effects';

import { Alert } from 'react-native';
import api from '~/services/api';
import { signInSuccess, signInFailure } from './action';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      // eslint-disable-next-line
      Alert.alert('Usuário não pode ser prestador');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (e) {
    Alert.alert('E-mail ou senha não estão corretos.');

    yield put(signInFailure());
  }
}

function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
