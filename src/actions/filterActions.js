import { FILTER_BY_COLOR, FILTER_BY_MONTH } from './types';

export const filterByColor = color => ({
  type: FILTER_BY_COLOR,
  payload: color
});

export const filterByMonth = month => ({
  type: FILTER_BY_MONTH,
  payload: month
})