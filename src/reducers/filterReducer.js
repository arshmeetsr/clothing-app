import { FILTER_BY_COLOR, FILTER_BY_MONTH } from '../actions/types';

const initialState = {
  colorFilters: [],
  monthFilters: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FILTER_BY_COLOR: {
      let newSate = {...state};
      let index = newSate.colorFilters.indexOf(action.payload);
      if (index !== -1) {
        newSate.colorFilters.splice(index, 1);
      } else {
        newSate.colorFilters.push(action.payload);
      }
      return newSate;
    }

    case FILTER_BY_MONTH: {
      let newSate = {...state};
      let index = newSate.monthFilters.indexOf(action.payload);
      if (index !== -1) {
        newSate.monthFilters.splice(index, 1);
      } else {
        newSate.monthFilters.push(action.payload);
      }
      return newSate;
    }

    default:
      return state;
  }
}