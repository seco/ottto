import { handleActions } from 'redux-actions';
import { types } from '../actions/rooms';


const defaultRooms = [
  { name: 'Living Room', icon: 'television' },
  { name: 'Kitchen', icon: 'cutlery' },
  { name: 'Bedroom', icon: 'bed' },
];


const roomsReducer = handleActions({
  [types.ADD_ROOM]: (rooms, action) => {
    return [...rooms, action.payload]
  },
}, defaultRooms);


export default roomsReducer;
