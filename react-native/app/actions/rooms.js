// Action Types
const ADD = 'ROOMS/ADD';
const UPDATE = 'ROOMS/UPDATE';
const REMOVE = 'ROOMS/REMOVE';


// Action Creators
export const addRoom = (room) => { return { type: ADD, room } };
export const updateRoom = (room) => { return { type: UPDATE, room } };
export const removeRoom = (room) => { return { type: REMOVE, room } };


// Reducers
const initialRooms = [
  { id: 1, name: 'Living Room', icon: 'television' },
  { id: 2, name: 'Kitchen', icon: 'cutlery' },
  { id: 3, name: 'Bedroom', icon: 'bed' },
];

const roomsReducer = (rooms = initialRooms, action) => {
  switch(action.type) {
    case 'ROOMS/ADD':
      return [...rooms, action.room]

    case 'ROOMS/UPDATE':
      return rooms.map((room) => {
        if (room.id == action.payload.id) {
          return { ...room, ...action.room };
        } else {
          return room;
        }
      });

    case 'ROOMS/REMOVE':
      return rooms.filter((room) => {
        return room.id !== action.room.id
      });

    default:
      return rooms;
  }
}


export default roomsReducer;
