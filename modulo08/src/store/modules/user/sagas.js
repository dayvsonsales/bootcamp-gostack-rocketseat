import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { updateProfileSuccess } from './action';

function* createAccount({ payload }) {
  const { name, email, password } = payload;

  try {
    yield call(api.post, '/users', { name, email, password, provider: true });

    toast.success('Usuário criado com sucesso!', {
      position: toast.POSITION.TOP_CENTER,
    });

    history.push('/');
  } catch (e) {
    toast.error('Não foi possível criar usuário, tente novamente mais tarde!', {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

function* updateProfile({ payload }) {
  const { name, email, avatar_id, ...rest } = payload.data;
  
  const profile = Object.assign({name, email, avatar_id}, rest.oldPassword ? rest : {});
  
  try {
    const response = yield call(api.put, '/users', profile);

    toast.success('Usuário atualizado com sucesso!', {
      position: toast.POSITION.TOP_CENTER,
    });

    yield put(updateProfileSuccess(response.data));
  } catch (e) {
    toast.error('Não foi possível atualizar seu usuário, confira seus dados!', {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

export default all([
  takeLatest('@user/USER_CREATE_ACCOUNT_REQUEST', createAccount),
  takeLatest('@user/USER_UPDATE_PROFILE_REQUEST', updateProfile),
]);
