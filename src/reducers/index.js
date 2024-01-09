import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Import your reducers here

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;