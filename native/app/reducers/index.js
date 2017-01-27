import { combineReducers } from 'redux';


import countReducer from './count';
import roomsReducer from '../actions/rooms';
import modulesReducer from '../actions/modules';


export default combineReducers({
  count: countReducer,
  rooms: roomsReducer,
  modules: modulesReducer,
});
