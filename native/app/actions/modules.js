// Action Types
const MODULE_GET = 'MODULE_GET'
const MODULE_GET_SUCCESS = 'MODULE_GET_SUCCESS'
const MODULE_GET_ERROR = 'MODULE_GET_ERROR'


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

    case GET_ERROR:
      return {
        ...state,
        state: 'error',
        error: action.error,
      }

    default: return state;
  }
}


export default modulesReducer;
