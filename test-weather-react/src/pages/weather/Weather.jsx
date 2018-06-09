// @flow

import React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import TimeDate from '../../components/TimeDateComponent';
import { WeatherInfo } from '../../weatherTypes';
import type { Unit } from '../../weatherTypes';

type Props = {
  parisWeather: WeatherInfo[],
  unit: Unit,
}

const Weather = ({ parisWeather, unit }: Props) => {
  if (parisWeather.size === 0) return false;
  return (
    <div className="content">
      <h2>{I18n.t('weather.TITLE')}</h2>
      <h3><TimeDate format={I18n.t('app.DATE_FORMAT')} /></h3>
      <div>{I18n.t('weather.TEMP')}{parisWeather.main.temp}{I18n.t(`weather.TEMP_${unit.value}`)}</div>
      <div>{I18n.t('weather.DESCRIPTION')}{parisWeather.weather[0].description}</div>
      <div>{I18n.t('weather.WIND')}{parisWeather.wind.speed}{I18n.t(`weather.WIND_${unit.value}`)}</div>
    </div>
  );
};

export default (connect(state => ({
  parisWeather: state.pages.get('parisWeather'),
  unit: state.pages.get('unit'),
}))(Weather));
