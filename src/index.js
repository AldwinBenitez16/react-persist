import React from 'react';
import ReactDOM from 'react-dom';
import Persist from './Persist';
import * as serviceWorker from './serviceWorker';

// Root Reducer
import RootReducer from './Store/store';
import { createStore } from 'redux';

// Provider from react redux
import { Provider } from 'react-redux';

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch(e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) return undefined
        return JSON.parse(serializedState);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

// Persisted State Using Own Functions
// const persistedState = loadFromLocalStorage();
// const store = createStore(RootReducer, persistedState);

const store = createStore(RootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Persist />
    </Provider>
, document.getElementById('root'));

localStorage.removeItem('state');

// store.subscribe(() => saveToLocalStorage(store.getState()));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
