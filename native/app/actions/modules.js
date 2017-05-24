import socket from '../socket'
import _ from 'lodash'

// Action Types
// const MODULES_GET = 'MODULES_GET'
const MODULES_GET_SUCCESS = 'MODULES_GET_SUCCESS'
const MODULES_GET_ERROR = 'MODULES_GET_ERROR'

const MODULE_GET = 'MODULE_GET'
const MODULE_GET_SUCCESS = 'MODULE_GET_SUCCESS'
const MODULE_GET_ERROR = 'MODULE_GET_ERROR'

const MODULE_UPDATE = 'MODULE_UPDATE'
const MODULE_UPDATE_SUCCESS = 'MODULE_UPDATE_SUCCESS'
const MODULE_UPDATE_ERROR = 'MODULE_UPDATE_ERROR'

const MODULE_ACTIVATE = 'MODULE_ACTIVATE'
const MODULE_DEACTIVATE = 'MODULE_DEACTIVATE'


// Action Creators
export const getModules = () => {
  return (dispatch, getState) => {
    // dispatch(gettingModules())

    socket.on('modules', (msg) => {
      switch(msg.verb) {
        case 'updated': dispatch(moduleUpdated(msg.data))
      }
    })

    return socket.get('/api/modules/')
      .then( modules => dispatch(getModulesSuccess(modules)) )
      .then( error => dispatch(getModuleError(error)) )
  }
}
// export const gettingModules = () => {
//   return { type: MODULES_GET }
// }
export const getModulesSuccess = (modules) => {
  return { type: MODULES_GET_SUCCESS, modules }
}
export const getModulesError = (error) => {
  return { type: MODULES_GET_ERROR, error }
}


export const getModule = (id) => {
  return (dispatch, getState) => {
    // dispatch(gettingModule())

    return socket.get('/api/modules/' + id)
      .then( module => dispatch(getModuleSuccess(module)) )
      // .catch( error => dispatch(getModuleError(error)) )
  }
}
// export const gettingModule = () => {
//   return { type: MODULE_GET }
// }
export const getModuleSuccess = (module) => {
  return { type: MODULE_GET_SUCCESS, module }
}
export const getModuleError = (error) => {
  return { type: MODULE_GET_ERROR, error }
}

export const updateModule = (module) => {
  return (dispatch, getState) => {
    // dispatch(updatingModule(module))

    return socket.put('/api/modules/' + module.id, module)
      // .then(module => dispatch(moduleUpdated(module)))
      .catch(error => dispatch(moduleUpdateError(error)))
  }
}
// export const updatingModule = (module) => {
//   return { type: MODULE_UPDATE, module }
// }
export const moduleUpdated = (module) => {
  // For some reason the response is an array, grab the first item
  return { type: MODULE_UPDATE_SUCCESS, module: module }
}
export const moduleUpdateError = (error) => {
  return { type: MODULE_UPDATE_ERROR, error }
}

export const activateModule = (module_id) => {
  return { type: MODULE_ACTIVATE, module_id }
}

export const deactivateModule = () => {
  return { type: MODULE_DEACTIVATE }
}


// Reducers
const defaultState = {
  entities: [],
  active: null
}

const modulesReducer = (state = {}, action) => {
  switch(action.type) {
    // case MODULES_GET:
    //   return {
    //     ...state,
    //   }

    case MODULES_GET_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          ..._.keyBy(action.modules, 'id'),
        }
      }

    // case MODULE_GET:
    //   return {
    //     ...state,
    //   }

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

    // case MODULE_UPDATE:
    //   return {
    //     ...state,
    //   }

    case MODULE_UPDATE_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.module.id]: {
            ...state.entities[action.module.id],
            ...action.module
          }
        }
      }

    case MODULE_UPDATE_ERROR:
      return {
        ...state,
      }

    case MODULE_ACTIVATE:
      return {
        ...state,
        active: state.entities[action.module_id]
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
