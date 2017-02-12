// Action Types
const ROOMS_GET = 'ROOMS_GET'
const ROOMS_GET_SUCCESS = 'ROOMS_GET_SUCCESS'
const ROOMS_GET_ERROR = 'ROOMS_GET_ERROR'

const ROOM_CREATE = 'ROOM_CREATE'
const ROOM_CREATE_SUCCESS = 'ROOM_CREATE_SUCCESS'
const ROOM_CREATE_ERROR = 'ROOM_CREATE_ERROR'

const ROOM_ADD = 'ROOM_ADD'
const ROOM_UPDATE = 'ROOM_UPDATE'
const ROOM_REMOVE = 'ROOM_REMOVE'


// Action Creators
export const getRooms = () => {
  return (dispatch, getState) => {
    dispatch(gettingRooms())

    return fetch('http://localhost:1337/api/modulegroups')
      .then( response => response.json() )
      .then( rooms => dispatch(getRoomsSuccess(rooms)) )
      .catch( error => dispatch(getRoomsError(error)) )
  }
}
export const gettingRooms = () => {
  return { type: ROOMS_GET }
}
export const getRoomsSuccess = (rooms) => {
  return { type: ROOMS_GET_SUCCESS, rooms }
}
export const getRoomsError = (error) => {
  return { type: ROOMS_GET_ERROR, error }
}

export const createRoom = (room) => {
  return (dispatch, getState) => {
    dispatch(creatingRoom())

    return fetch('http://localhost:1337/api/modulegroups', {
        method: 'POST',
        body: JSON.stringify(room)
      })
      .then( response => response.json() )
      .then( room => dispatch(createRoomSuccess(room)) )
      .catch( error => displatch(createRoomsError(error)) )
  }
}
export const creatingRoom = () => {
  return { type: ROOM_CREATE }
}
export const createRoomSuccess = (room) => {
  return { type: ROOM_CREATE_SUCCESS, room }
}
export const createRoomError = (error) => {
  return { type: ROOM_CREATE_ERROR, error }
}

export const addRoom = (room) => {
  return { type: ROOM_ADD, room }
}
export const updateRoom = (room) => {
  return { type: ROOM_UPDATE, room }
}
export const removeRoom = (room) => {
  return { type: ROOM_REMOVE, room }
}


// Reducers
const initialState = {
  rooms: [],
  state: 'empty'
}

const roomsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ROOMS_GET:
      return {
        ...state,
        state: 'loading',
        error: false
      }

    case ROOMS_GET_SUCCESS:
      return {
        ...state,
        rooms: action.rooms,
        state: 'success',
        error: false
      }

    case ROOMS_GET_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      }

    case ROOM_ADD:
      return {
        ...state,
        rooms: [ ...state.rooms, action.room ]
      }

    case ROOM_UPDATE:
      return {
        ...state,
        rooms: state.rooms.map((room) => {
          if (room.id == action.payload.id) {
            return { ...room, ...action.room };
          } else {
            return room;
          }
        })
      }

    case ROOM_REMOVE:
      return {
        ...state,
        rooms: state.rooms.filter((room) => {
          return room.id !== action.room.id
        })
      }

    default: return state;
  }
}


export default roomsReducer;
