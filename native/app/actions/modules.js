import socket from '../socket'

// Action Types
const MODULE_GET = 'MODULE_GET'
const MODULE_GET_SUCCESS = 'MODULE_GET_SUCCESS'
const MODULE_GET_ERROR = 'MODULE_GET_ERROR'

const MODULE_PUT = 'MODULE_PUT'
const MODULE_PUT_SUCCESS = 'MODULE_PUT_SUCCESS'
const MODULE_PUT_ERROR = 'MODULE_PUT_ERROR'

const MODULE_UPDATED = 'MODULE_UPDATED'


// Action Creators
export const getModule = (id) => {
  return (dispatch, getState) => {
    dispatch(gettingModule())

    socket.on('modules', message => {
      if(message.verb == 'updated') { dispatch(updatedModule(message.data)) }
    })

    return socket.get('/api/modules/' + id)
      .then( module => dispatch(getModuleSuccess(module)) )
      .catch( error => dispatch(getModuleError(error)) )
  }
}
export const gettingModule = () => {
  return { type: MODULE_GET }
}
export const getModuleSuccess = (module) => {
  return { type: MODULE_GET_SUCCESS, module }
}
export const getModuleError = (error) => {
  return { type: MODULE_GET_ERROR, error }
}

export const putModule = (module) => {
  return (dispatch, getState) => {
    dispatch(updatingModule())

    return socket.put('/api/modules/' + module.id, module)
      .then(module => dispatch(putModuleSuccess(module)))
      .catch(error => dispatch(putModuleError(module)))
  }
}
export const updatingModule = () => {
  return { type: MODULE_PUT }
}
export const putModuleSuccess = (response) => {
  // For some reason the response is an array, grab the first item
  return { type: MODULE_PUT_SUCCESS, module: response[0] }
}
export const putModuleError = (error) => {
  return { type: MODULE_PUT_ERROR, error }
}

export const updatedModule = (module) => {
  return { type: MODULE_UPDATED, module }
}


// Reducers
const initialState = {
  active: null,
  state: 'empty'
}

const modulesReducer = (state = initialState, action) => {
  switch(action.type) {
    case MODULE_GET:
      return {
        ...state,
        state: 'loading',
        error: false
      }

    case MODULE_GET_SUCCESS:
      return {
        ...state,
        active: action.module,
        state: 'success',
        error: false,
      }

    case MODULE_GET_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      }

    case MODULE_PUT:
      return {
        ...state,
        state: 'loading',
      }

    case MODULE_PUT_SUCCESS:
      return {
        ...state,
        state: 'success',
        error: false,
      }

    case MODULE_PUT_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      }

    case MODULE_UPDATED:
      return {
        ...state,
        active: { ...state.active, ...action.module }
      }

    default: return state;
  }
}


export default modulesReducer;
