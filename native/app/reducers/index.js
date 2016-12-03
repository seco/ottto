import { combineReducers } from 'redux';


import countReducer from './count';
import roomsReducer from '../actions/rooms';


export default combineReducers({
  count: countReducer,
  rooms: roomsReducer
});
