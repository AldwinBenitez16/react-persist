import { createStore } from "redux";
import * as ActionTypes from './actiontypes';

const initialState = {
    user: {
        username: '',
        login: false
    }
};

export default function Store(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.UPDATE_USER:
            return {
                ...state,
                user: {
                    ...action.data
                }
            };
        default: 
            return state;
    }
}
