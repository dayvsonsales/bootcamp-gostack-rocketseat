import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import * as NavigationService from '~/services/navigation/NavigationService';
import { updateProfileSuccess } from './action';

function* createAccount({ payload }) {
  const { name, email, password } = payload;

  try {
    yield call(api.post, '/users', { name, email, password });

    Alert.alert('Usuário criado com sucesso!');

    NavigationService.navigate('Login');
  } catch (e) {
    Alert.alert('Não foi possível criar usuário, tente novamente mais tarde!');
  }
}

function* updateProfile({ payload }) {
  const { name, email, ...rest } = payload.data;

  const profile = { name, email, ...(rest.oldPassword ? rest : {}) };

  try {
    const response = yield call(api.put, '/users', profile);

    Alert.alert('Usuário atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (e) {
    Alert.alert('Não foi possível atualizar seu usuário, confira seus dados!');
  }
}

export default all([
  takeLatest('@user/USER_CREATE_ACCOUNT_REQUEST', createAccount),
  takeLatest('@user/USER_UPDATE_PROFILE_REQUEST', updateProfile),
]);
