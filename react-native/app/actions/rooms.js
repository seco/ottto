import { createAction } from 'redux-actions';

export const types = {
  ADD_ROOM: 'ADD_ROOM',
};

export const actions = {
  addRoom: createAction(types.ADD_ROOM),
};
