import { combineReducers } from 'redux';


import roomsReducer from './actions/rooms';
import modulesReducer from './actions/modules';


export default combineReducers({
  rooms: roomsReducer,
  modules: modulesReducer,
});
