// @flow

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';

import TimeDate from '../../components/TimeDateComponent';
import { WeatherInfo } from '../../weatherTypes';

type Props = {
  parisWeather: WeatherInfo[],
}

const SunriseSunset = ({ parisWeather }: Props) => {
  if (parisWeather.size === 0) return false;
  return (
    <div className="content">
      <h2>{I18n.t('sunrise.TITLE')}</h2>
      <h3><TimeDate format={I18n.t('app.DATE_FORMAT')} /></h3>
      <div>{I18n.t('sunrise.SUNRISE')}<TimeDate date={moment.unix(parisWeather.sys.sunrise)} format="LTS" /></div>
      <div>{I18n.t('sunrise.SUNSET')}<TimeDate date={moment.unix(parisWeather.sys.sunset)} format="LTS" /></div>
    </div>
  );
};

export default (connect(state => ({
  parisWeather: state.pages.get('parisWeather'),
}))(SunriseSunset));
