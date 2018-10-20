import { FETCH_CLOTHES } from '../actions/types';

const initialState = {
  clothList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLOTHES:
      return {
        clothList: action.payload
      };

    default:
      return state;
  }
}