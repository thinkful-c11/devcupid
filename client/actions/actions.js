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

// Onboarding Handlers
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
export const checkbox_handler = (key, obj) => ({
  type: ref.CHECKBOX_HANDLER,
  key,
  obj
});
export const checkboxNested_handler = (body) => ({
  type: ref.CHECKBOXNESTED_HANDLER,
  body
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

export const update_profile = (githubId, profile, accessToken) => dispatch => {
  dispatch(update_request());
  const updateObj = {
    profile
  };
  const data = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateObj)
  };
  fetch(`/api/update-user/${githubId}`, data)
    .then(res => {
      if(!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(user => {
      dispatch(update_success(user.profile));
    })
    .catch(error => {
      dispatch(update_error(error));
    });
};

export const update_skills = (githubId, profile, key, accessToken) => dispatch => {
  dispatch(update_request());

  const updateObj = profile.skills;

  const data = {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateObj)
  };
  fetch(`/api/update-skills/${key}/${githubId}`, data)
    .then(res => {
      if(!res.ok){
        return Promise.reject(res.statustext);
      }
      return res.json();
    })
    .then(user => {
      dispatch(update_success(user.profile));
    })
    .catch(error => {
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
  type: ref.LOGIN_ERROR,
  error
});
export const fetchUser = accessToken => dispatch => {
  dispatch(login_request());
  // dispatch(setAccessToken(accessToken));
  fetch('/api/profile/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    if (!res.ok) {
      if (res.status === 401) {
        Cookies.remove('accessToken');
        dispatch(removeAccessToken());
        return;
      }
      return Promise.reject(res.statusText);
    }
    return res.json();
  })
  .then(user => {
    dispatch(login_success(user.gitHub));
  })
  .catch(error => {
    dispatch(login_error(error));
  });
};

// Assign GitHub User data to redux store
export const assignGitHubProfile = () => ({
  type: ref.ASSIGN_GITHUB_PROFILE,
});

// Team Actions
export const team_request = () => ({
  type: ref.TEAM_REQUEST
});
// Pulls a single team to be used on an active page for that team.
export const team_single_success = team => ({
  type: ref.TEAM_SINGLE_SUCCESS,
  team
});
// Pulls a users list of teams to assign to user object.
export const team_list_success = teams = ({
  type: ref.TEAM_LIST_SUCCESS,
  teams
});
export const team_error = error => ({
  type: ref.TEAM_ERROR,
  error
});
/*
*   Creates a for a user.
*   @param (teamFormData) expected to be obj with keys:
*     teamName, teamDescription, teamAvatarUrl, teamCompany,
*     teamLocation, teamEmail
*/
export const create_team = (accessToken, userId, teamFormData) =>
  dispatch => {
    dispatch(team_request());
    // Create a req body from teamFormData and add in userId
    const newBody = Object.assign({}, { userId }, teamFormData);
    const data = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBody)
    };
    fetch('/api/teams', data)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(team => {
        dispatch(team_success(team));
      })
      .catch(error => {
        dispatch(team_error(error));
      });
  };

// Returns an array of the users teams
export const fetch_teams = (accessToken, userId) => dispatch => {
  dispatch(team_request());
  const data = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    body: JSON.stringify({ userId })
  };
  fetch(`/api/teams?userId=${userId}`, data)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(teams => {
      dispatch(team_list_success(teams));
    })
    .catch(error => {
      dispatch(team_error(error));
    });
};

// Fetch a single team by its id
export const fetch_team = (accessToken, teamId) => dispatch => {
  dispatch(team_request());
  const data = {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` },
  };
  fetch(`/api/teams/${teamId}`, data)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(team => {
      dispatch(team_single_success(team));
    })
    .catch(error => {
      dispatch(team_error(error));
    });
};

/*
*   Updates a static field on a team and returns it.
*   @param (updateData) expects object of with keys of key: and
*   value: and will only accept certain keys.
*/
export const update_team_info = (accessToken, teamId, updateData) =>
  dispatch => {
    dispatch(team_request());
    // validates key passed to outer fn.
    const requestBody = updateData => {
      const validKeys = [
        'url',
        'name',
        'description',
        'avatar_url',
        'company',
        'email',
        'GitHub'
      ];
      if (!validKeys.includes(udpateData.key)) {
        throw new Error('Invalid Key');
      }
      return updateData;
    };
    const data = {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: requestBody(updateData)
    };
    fetch(`/api/teams/${teamId}`, data)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(team => {
        dispatch(team_single_success(team));
      })
      .catch(error => {
        dispatch(team_error(error));
      });
  };
