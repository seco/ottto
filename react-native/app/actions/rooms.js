import { createAction } from 'redux-actions';

export const types = {
  ADD_ROOM: 'ADD_ROOM',
  UPDATE_ROOM: 'UPDATE_ROOM',
  REMOVE_ROOM: 'REMOVE_ROOM',

};

export const actions = {
  addRoom: createAction(types.ADD_ROOM),
  updateRoom: createAction(types.UPDATE_ROOM),
  removeRoom: createAction(types.REMOVE_ROOM),
};
