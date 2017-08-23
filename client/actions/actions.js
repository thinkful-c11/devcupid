import * as ref from './refs';

export const login_request = () => ({
  type: ref.LOGIN_REQUEST
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

  fetch(`/api/update-user/${githubId}`, (req, res) => {
    if (!res.ok) {
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
