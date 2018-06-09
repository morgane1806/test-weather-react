// @flow

import { createAction } from 'redux-actions';

export const GET_PARIS_WEATHER = 'GET_PARIS_WEATHER';
export const GET_UNIT = 'GET_UNIT';

export const getParisWeather = createAction(GET_PARIS_WEATHER);
export const getUnit = createAction(GET_UNIT);
