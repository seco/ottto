import { combineReducers } from 'redux';


import countReducer from './count';
import roomsReducer from './rooms';


export default combineReducers({
  count: countReducer,
  rooms: roomsReducer
});
