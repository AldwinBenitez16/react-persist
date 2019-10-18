// Imports
import rootReducer from './store';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Middleware: Redux Persist Config
const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
