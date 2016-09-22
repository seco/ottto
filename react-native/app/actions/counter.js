import * as types from './types';


export function increment(amount = 1) {
  return {
    type: types.INCREMENT
  };
}


export function decrement() {
  return {
    type: types.DECREMENT
  };
}
