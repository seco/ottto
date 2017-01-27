// Action Types
const GET = 'MODULES/GET'
const GET_SUCCESS = 'MODULES/GET_SUCCESS'
const GET_ERROR = 'MODULES/GET_ERROR'


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
  return { type: GET }
}
export const getModuleSuccess = (module) => {
  return { type: GET_SUCCESS, module }
}
export const getModuleError = (error) => {
  return { type: GET_ERROR, error }
}


// Reducers
const initialState = {
  active: null,
  state: 'empty'
}

const modulesReducer = (state = initialState, action) => {
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
        active: action.module,
        state: 'success',
        error: false
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
