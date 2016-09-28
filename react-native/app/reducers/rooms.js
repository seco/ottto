import { handleActions } from 'redux-actions';
import { types } from '../actions/rooms';


const defaultRooms = [
  { id: 1, name: 'Living Room', icon: 'television' },
  { id: 2, name: 'Kitchen', icon: 'cutlery' },
  { id: 3, name: 'Bedroom', icon: 'bed' },
];


const roomsReducer = handleActions({
  [types.ADD_ROOM]: (rooms, action) => {
    return [...rooms, action.payload]
  },

  [types.UPDATE_ROOM]: (rooms, action) => {
    return rooms.map((room) => {
      if (room.id == action.payload.id) {
        return { ...room, ...payload };
      } else {
        return room;
      }
    });
  },

  [types.REMOVE_ROOM]: (rooms, action) => {
    return rooms.filter((room) => {
      return room.id !== action.payload.id
    });
  },
}, defaultRooms);


export default roomsReducer;
