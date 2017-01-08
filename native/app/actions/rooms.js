// Action Types
const GET = 'ROOMS/GET'
const GET_SUCCESS = 'ROOMS/GET_SUCCESS'
const GET_ERROR = 'ROOMS/GET_ERROR'

const CREATE = 'ROOMS/CREATE'
const CREATE_SUCCESS = 'ROOMS/CREATE_SUCCESS'
const CREATE_ERROR = 'ROOMS/CREATE_ERROR'

const ADD = 'ROOMS/ADD'
const UPDATE = 'ROOMS/UPDATE'
const REMOVE = 'ROOMS/REMOVE'


// Action Creators
export const getRooms = () => {
  return (dispatch, getState) => {
    dispatch(gettingRooms())

    return fetch('http://192.168.1.3:1337/api/modulegroups')
      .then( response => response.json() )
      .then( rooms => dispatch(getRoomsSuccess(rooms)) )
      .catch( error => dispatch(getRoomsError(error)) )
  }
}
export const gettingRooms = () => {
  return { type: GET }
}
export const getRoomsSuccess = (rooms) => {
  return { type: GET_SUCCESS, rooms }
}
export const getRoomsError = (error) => {
  return { type: GET_ERROR, error }
}

export const createRoom = (room) => {
  return (dispatch, getState) => {
    dispatch(creatingRoom())

    return fetch('http://192.168.1.3:1337/api/modulegroups', {
        method: 'POST',
        body: JSON.stringify(room)
      })
      .then( response => response.json() )
      .then( room => dispatch(createRoomSuccess(room)) )
      .catch( error => displatch(createRoomsError(error)) )
  }
}
export const creatingRoom = () => {
  return { type: CREATE }
}
export const createRoomSuccess = (room) => {
  return { type: CREATE_SUCCESS, room }
}
export const createRoomError = (error) => {
  return { type: CREATE_ERROR, error }
}

export const addRoom = (room) => {
  return { type: ADD, room }
}
export const updateRoom = (room) => {
  return { type: UPDATE, room }
}
export const removeRoom = (room) => {
  return { type: REMOVE, room }
}


// Reducers
const initialState = {
  rooms: [],
  state: 'empty'
}

const roomsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET:
      return {
        ...state,
        state: 'waiting',
        error: false
      }

    case GET_SUCCESS:
      return {
        ...state,
        rooms: action.rooms,
        state: 'success',
        error: false
      }

    case GET_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      }

    case ADD:
      return {
        ...state,
        rooms: [ ...state.rooms, action.room ]
      }

    case UPDATE:
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

    case REMOVE:
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
