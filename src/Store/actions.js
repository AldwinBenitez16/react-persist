import * as ActionTypes from './actiontypes';

export function updateUser(data) {
    return {
        type: ActionTypes.UPDATE_USER,
        data
    };
}