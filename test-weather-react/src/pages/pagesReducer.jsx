// @flow

import type { fromJS as Immut } from 'immutable';
import Immutable from 'immutable';

import {
  GET_PARIS_WEATHER,
  GET_UNIT,
} from './pagesActions';

const initialState = Immutable.fromJS({
  parisWeather: [],
  unit: {},
});

const pagesReducer = (
  state: Immut = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case GET_PARIS_WEATHER:
      return state.set('parisWeather', action.payload);
    case GET_UNIT:
      return state.set('unit', action.payload);
    default:
      return state;
  }
};

export default pagesReducer;
