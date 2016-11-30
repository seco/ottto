import { createAction } from 'redux-actions'


export const types = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
}


export const actions = {
  increment: createAction(types.INCREMENT),
  decrement: createAction(types.DECREMENT),
}
