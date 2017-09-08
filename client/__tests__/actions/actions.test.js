import * as ref from '../../actions/refs';
import {
    setAccessToken,
    removeAccessToken,
    signup_handler,
    textInput_handler,
    checkbox_handler,
    checkboxNested_handler,
    update_request,
    update_success,
    update_error,
    onboard_progress,
    update_profile,
    update_skills,
    login_request,
    login_success,
    login_error,
    fetchUser,
    profileRequest,
    profileSuccess,
    profileError,
    fetchProfile,
    assignGitHubProfile,
    team_request,
    team_single_success,
    team_list_success,
    team_error,
    create_team,
    fetch_teams,
    fetch_team,
    update_team_info,
    searchRequest,
    searchSuccess,
    searchError,
    search
} from '../../actions/actions';

describe('setAccessToken', () => {
    it('should return action', () =>{
        const accessToken = undefined;
        const action = setAccessToken();
        expect(action.type).toEqual(ref.SET_ACCESS_TOKEN);
        expect(action.accessToken).toEqual(accessToken);
    })
})