import { handleActions } from 'redux-actions';
import { types } from '../actions/count';


const initialCount = 0;


const countReducer = handleActions({
  [types.INCREMENT]: (count, action) => {
    return count + (action.payload || 1)
  },
  [types.DECREMENT]: (count, action) => {
    return count - (action.payload || 1)
  },
}, initialCount);


export default countReducer;
