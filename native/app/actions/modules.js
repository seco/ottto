// Action Types
const MODULE_GET = 'MODULE_GET'
const MODULE_GET_SUCCESS = 'MODULE_GET_SUCCESS'
const MODULE_GET_ERROR = 'MODULE_GET_ERROR'

const MODULE_UPDATE = 'MODULE_UPDATE'
const MODULE_UPDATE_SUCCESS = 'MODULE_UPDATE_SUCCESS'
const MODULE_UPDATE_ERROR = 'MODULE_UPDATE_ERROR'


// Action Creators
export const getModule = (id) => {
  return (dispatch, getState) => {
    dispatch(gettingModule())

    return fetch('http://localhost:1337/api/modules/' + id)
      .then( response => response.json() )
      .then( modules => dispatch(getModuleSuccess(modules)) )
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

export const updateModule = (module) => {
  return (dispatch, getState) => {
    dispatch(updatingModule())

    return fetch('http://localhost:1337/api/modules/' + module.id, {
        method: 'PUT',
        body: JSON.stringify(module)
      })
      .then(response => response.json())
      .then(module => dispatch(updateModuleSuccess(module)))
      .catch(error => dispatch(updateModuleError(error)))
  }
}
export const updatingModule = () => {
  return { type: MODULE_UPDATE }
}
export const updateModuleSuccess = (response) => {
  // For some reason the response is an array, grab the first item
  return { type: MODULE_UPDATE_SUCCESS, module: response[0] }
}
export const updateModuleError = (error) => {
  return { type: MODULE_UPDATE_ERROR, error }
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

    case MODULE_UPDATE:
      return {
        ...state,
        state: 'loading',
      }

    case MODULE_UPDATE_SUCCESS:
      return {
        ...state,
        state: 'success',
        error: false,
      }

    case MODULE_UPDATE_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      }

    default: return state;
  }
}


export default modulesReducer;
