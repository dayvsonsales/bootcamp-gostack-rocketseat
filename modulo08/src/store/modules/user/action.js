export function createAccountRequest(name, email, password) {
  return {
    type: '@user/USER_CREATE_ACCOUNT_REQUEST',
    payload: {
      name,
      email,
      password,
    },
  };
}

export function updateProfileRequest(data) {
  return {
    type: '@user/USER_UPDATE_PROFILE_REQUEST',
    payload: { data }
  }
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/USER_UPDATE_PROFILE_SUCCESS',
    payload: { profile }
  }
}

export function updateProfileFailure() {
  return {
    type: '@user/USER_UPDATE_PROFILE_FAILURE',
  }
}


