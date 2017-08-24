import * as ref from './refs';
import * as Cookies from 'js-cookie';

// Access Token Actions
export const setAccessToken = accessToken => ({
  type: ref.SET_ACCESS_TOKEN,
  accessToken
});
export const removeAccessToken = () => ({
  type: ref.REMOVE_ACCESS_TOKEN
});

export const signup_handler = (key, value) => ({
  type: ref.SIGNUP_HANDLER,
  key,
  value
});

export const textInput_handler = (key, value) => ({
  type: ref.TEXTINPUT_HANDLER,
  key,
  value
});

// Actions for PUT request to update profile.
export const update_request = () => ({
  type: ref.UPDATE_REQUEST
});
export const update_success = (profile) => ({
  type: ref.UPDATE_SUCCESS,
  profile
});
export const update_error = (error) => ({
  type: ref.UPDATE_ERROR,
  error
});

// Not working/tested yet.
export const update_profile = (githubId, updateBody) => dispatch => {
  disptach(update_request());
  //TODO: verify body formatting matches what DB expects
  const updateObj = {
    updateBody
  };
  const data = {
    method: 'PUT',
    body: JSON.stringify(updateObj)
  };
  fetch(`/api/update-user/${githubId}`, data).then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(profile => {
    console.log(profile);
    // dispatch(update_success(profile));
  }).catch(error => {
    dispatch(update_error(error));
  });
};

// Actions for Auth/Login requests.
export const login_request = () => ({
  type: ref.LOGIN_REQUEST
});
export const login_success = gitHub => ({
  type: ref.LOGIN_SUCCESS,
  gitHub
});
export const login_error = error => ({
  type: ref.UPDATE_ERROR,
  error
});
export const fetchUser = accessToken => dispatch => {
  dispatch(login_request());
  // dispatch(setAccessToken(accessToken));
  fetch('/api/profile/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        Cookies.remove('accessToken');
        dispatch(removeAccessToken());
        return;
      }
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(user => {
    dispatch(login_success(user.gitHub));
  }).catch(error => {
    dispatch(login_error(error));
  });
};


export const checkbox_handler = (key, array) => ({
  type: ref.CHECKBOX_HANDLER,
  key,
  array
});

export const checkboxNested_handler = (body) => ({
  type: ref.CHECKBOXNESTED_HANDLER,
  body
});
