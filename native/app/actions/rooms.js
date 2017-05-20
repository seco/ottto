import _ from 'lodash'
import socket from '../socket'

// Action Types
const ROOMS_GET = 'ROOMS_GET'
const ROOMS_GET_SUCCESS = 'ROOMS_GET_SUCCESS'
const ROOMS_GET_ERROR = 'ROOMS_GET_ERROR'

const ROOM_POST = 'ROOM_POST'
const ROOM_POST_SUCCESS = 'ROOM_POST_SUCCESS'
const ROOM_POST_ERROR = 'ROOM_POST_ERROR'

const ROOM_PUT = 'ROOM_PUT'
const ROOM_PUT_SUCCESS = 'ROOM_PUT_SUCCESS'
const ROOM_PUT_ERROR = 'ROOM_PUT_ERROR'

const ROOM_DELETE = 'ROOM_DELETE'
const ROOM_DELETE_SUCCESS = 'ROOM_DELETE_SUCCESS'
const ROOM_DELETE_ERROR = 'ROOM_DELETE_ERROR'


// Action Creators
export const getRooms = () => {
  return (dispatch, getState) => {
    dispatch(gettingRooms())

    return socket.get('/api/modulegroups')
      .then(rooms => dispatch(getRoomsSuccess(rooms)))
      .catch(error => dispatch(getRoomsError(error)))
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
    dispatch(postingRoom(room))

    return socket.post('/api/modulegroups', room)
      .then(room => dispatch(postRoomSuccess(room)))
      .catch(error => dispatch(postRoomError(error)))
  }
}
export const postingRoom = (room) => {
  return { type: ROOM_POST, room }
}
export const postRoomSuccess = (room) => {
  return { type: ROOM_POST_SUCCESS, room }
}
export const postRoomError = (error) => {
  return { type: ROOM_POST_ERROR, error }
}

export const putRoom = (room) => {
  return (dispatch, getState) => {
    dispatch(puttingRoom(room))

    return socket.put('/api/modulegroups/' + room.id, room)
      .then(room => dispatch(putRoomSuccess(room)))
      .catch(error => dispatch(putRoomError(room)))
  }
}
export const puttingRoom = (room) => {
  return { type: ROOM_PUT, room }
}
export const putRoomSuccess = (room) => {
  return { type: ROOM_PUT_SUCCESS, room }
}
export const putRoomError = (error) => {
  return { type: ROOM_PUT_ERROR, error }
}

export const deleteRoom = (room) => {
  return (dispatch, getState) => {
    dispatch(deletingRoom(room))

    return socket.delete('/api/modulegroups/' + room.id)
      .then(room => dispatch(deleteRoomSuccess(room)))
      .catch(error => dispatch(deleteRoomError(room)))
  }
}
export const deletingRoom = (room) => {
  return { type: ROOM_DELETE, room }
}
export const deleteRoomSuccess = (room) => {
  return { type: ROOM_DELETE_SUCCESS, room }
}
export const deleteRoomError = (error) => {
  return { type: ROOM_DELETE_ERROR, error }
}


// Reducers
const initialState = {
  entities: [],
}

const roomsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ROOMS_GET:
      return {
        ...state,
      }

    case ROOMS_GET_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          ..._.keyBy(action.rooms, 'id'),
        }
      }

    case ROOMS_GET_ERROR:
      return {
        ...state,
      }

    case ROOM_POST_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.room.id]: action.room
        }
      }

    case ROOM_POST_ERROR:
      return {
        ...state,
      }

    case ROOM_PUT:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.room.id]: action.room
        }
      }

    case ROOM_DELETE:
      return {
        ...state,
      }

    case ROOM_DELETE_SUCCESS:
      return {
        ...state,
        entities: state.entities.filter((room) => {
          room.id !== action.room.id
        })
      }

    case ROOM_DELETE_ERROR:
      return {
        ...state,
      }

    default: return state;
  }
}


export default roomsReducer;
