import { handleActions, createAction } from 'redux-actions';

const initialState = {};
const getUser = createAction('USER_GET', user => user);

export function getUserRequest(appInfo) {
    return (dispatch, getState, api) => api.getUser
        .saveUser(appInfo)
        .then(({ data }) => dispatch(getUser(data)));
}

export default handleActions(
    {
        [getUser]: (state, action) => ({
            user: action.payload.user,
        }),
    },
    initialState,
);