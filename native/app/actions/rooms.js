import socket from '../socket'

// Action Types
const ROOMS_GET = 'ROOMS_GET'
const ROOMS_GET_SUCCESS = 'ROOMS_GET_SUCCESS'
const ROOMS_GET_ERROR = 'ROOMS_GET_ERROR'

const ROOM_POST = 'ROOM_POST'
const ROOM_POST_SUCCESS = 'ROOM_POST_SUCCESS'
const ROOM_POST_ERROR = 'ROOM_POST_ERROR'

const ROOM_PUT = 'ROOM_PUT'
const ROOM_DELETE = 'ROOM_DELETE'


// Action Creators
export const getRooms = () => {
  return (dispatch, getState) => {
    dispatch(gettingRooms())

    return socket.get('/api/modulegroups')
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

export const postRoom = (room) => {
  return (dispatch, getState) => {
    dispatch(postingRoom())

    return socket.post(
      '/api/modulegroups',
      response => dispatch(postRoomSuccess(response)),
      response => dispatch(postRoomError(response)),
    )
  }
}
export const postingRoom = () => {
  return { type: ROOM_POST }
}
export const postRoomSuccess = (room) => {
  return { type: ROOM_POST_SUCCESS, room }
}
export const postRoomError = (error) => {
  return { type: ROOM_POST_ERROR, error }
}

export const putRoom = (room) => {
  return { type: ROOM_PUT, room }
}
export const deleteRoom = (room) => {
  return { type: ROOM_DELETE, room }
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
        error: false,
      }

    case ROOMS_GET_SUCCESS:
      return {
        ...state,
        rooms: action.rooms,
        state: 'loaded',
        error: false,
      }

    case ROOMS_GET_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      }

    case ROOM_POST_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.concat([action.room]),
        state: 'loaded',
        error: false,
      }

    case ROOM_POST_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      }

    case ROOM_PUT:
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

    case ROOM_DELETE:
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
