import { createStore } from "redux";
import * as ActionTypes from './actiontypes';

const initialState = {
    username: ''
};

export default function Store(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.UPDATE_USER:
            return {
                username: action.name
            };
        default: 
            return state;
    }
}
