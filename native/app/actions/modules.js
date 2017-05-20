import socket from '../socket'
import _ from 'lodash'

// Action Types
const MODULES_GET = 'MODULES_GET'
const MODULES_GET_SUCCESS = 'MODULES_GET_SUCCESS'
const MODULES_GET_ERROR = 'MODULES_GET_ERROR'

const MODULE_GET = 'MODULE_GET'
const MODULE_GET_SUCCESS = 'MODULE_GET_SUCCESS'
const MODULE_GET_ERROR = 'MODULE_GET_ERROR'

const MODULE_PUT = 'MODULE_PUT'
const MODULE_PUT_SUCCESS = 'MODULE_PUT_SUCCESS'
const MODULE_PUT_ERROR = 'MODULE_PUT_ERROR'

const MODULE_UPDATED = 'MODULE_UPDATED'

const MODULE_ACTIVATE = 'MODULE_ACTIVATE'
const MODULE_DEACTIVATE = 'MODULE_DEACTIVATE'


// Action Creators
export const getModules = () => {
  return (dispatch, getState) => {
    dispatch(gettingModules())

    return socket.get('/api/modules/')
      .then( modules => dispatch(getModulesSuccess(modules)) )
      .then( error => dispatch(getModuleError(error)) )
  }
}
export const gettingModules = () => {
  return { type: MODULES_GET }
}
export const getModulesSuccess = (modules) => {
  return { type: MODULES_GET_SUCCESS, modules }
}
export const getModulesError = (error) => {
  return { type: MODULES_GET_ERROR, error }
}


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

export const activateModule = (module_id) => {
  return { type: MODULE_ACTIVATE, module_id }
}

export const deactivateModule = () => {
  return { type: MODULE_ACTIVATE }
}


// Reducers
const defaultState = {
  entities: [],
  active: null
}

const modulesReducer = (state = {}, action) => {
  switch(action.type) {
    case MODULES_GET:
      return {
        ...state,
      }

    case MODULES_GET_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          ..._.keyBy(action.modules, 'id'),
        }
      }

    case MODULE_GET:
      return {
        ...state,
      }

    case MODULE_GET_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.module.id]: action.module
        }
      }

    case MODULE_GET_ERROR:
      return {
        ...state,
      }

    case MODULE_PUT:
      return {
        ...state,
      }

    case MODULE_PUT_SUCCESS:
      return {
        ...modules,
        entities: {
          ...state.entities,
          [action.module.id]: action.module
        }
      }

    case MODULE_PUT_ERROR:
      return {
        ...state,
      }

    case MODULE_UPDATED:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.module.id]: action.module
        }
      }

    case MODULE_ACTIVATE:
      return {
        ...state,
        active: action.module_id
      }


    case MODULE_DEACTIVATE:
      return {
        ...state,
        active: null
      }

    default: return state;
  }
}


export default modulesReducer;
