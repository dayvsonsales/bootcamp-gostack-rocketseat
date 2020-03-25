import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import api from '~/services/api';
import { signInSuccess, signInFailure } from './action';

import { toast } from 'react-toastify';

export function* signIn({ payload }) {
  const { email, password } = payload;

  console.tron.log(payload);

  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      // eslint-disable-next-line
      throw { name: 'provider', message: 'Usuário não é prestador' };
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (e) {
    if (e.name !== 'provider') {
      toast.error('E-mail ou senha não estão corretos.', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.error(e.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }

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
