// @flow

import React from 'react';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';

const TimeDate = ({ date, format }: Props) => {
  if (date) {
    return (<span>{date.locale(I18n.t('app.LANG')).format(format)}</span>);
  }
  return (<span>{moment().locale(I18n.t('app.LANG')).format(format)}</span>);
};

export default TimeDate;
