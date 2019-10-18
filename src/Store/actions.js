import * as ActionTypes from './actiontypes';

export function updateUser(name) {
    return {
        type: ActionTypes.UPDATE_USER,
        name
    };
}
