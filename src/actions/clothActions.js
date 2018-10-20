import { FETCH_CLOTHES } from './types';

export const fetchClothList = () => dispatch => {
  fetch("http://localhost:5000/clothes")
      .then(response => response.json())
      .then(response => 
        dispatch({
          type: FETCH_CLOTHES,
          payload: response.data
        })
      );
}