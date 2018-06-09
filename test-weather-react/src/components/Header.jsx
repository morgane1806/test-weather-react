// @flow

import React from 'react';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MenuItem, SelectField } from 'material-ui';
import axios from 'axios';
import { I18n } from 'react-redux-i18n';

import { MAIN_ROUTE, SUNRISE_ROUTE, WEATHER_API_KEY, WEATHER_ROUTE } from '../const';
import { getParisWeather, getUnit } from '../pages/pagesActions';
import type { Unit } from '../weatherTypes';

const parisData = {
  id: 6455259,
  name: 'Paris',
  country: 'FR',
  coord: {
    lon: 2.35236,
    lat: 48.856461,
  },
};

const units = [
  {
    id: 1,
    value: 'METRIC',
  }, {
    id: 2,
    value: 'IMPERIAL',
  },
];

type Props = {
  getParisWeather: Function,
  getUnit: Function,
  match: Object,
  unit: Unit,
}

class Header extends React.Component<void, Props, void> {
  componentDidMount() {
    this.fetchParisWeather(units[0].value);
  }

  fetchParisWeather = (unit) => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${parisData.id}&units=${unit}&lang=${I18n.t('app.LANG')}&APPID=${WEATHER_API_KEY}`)
      .then((res) => {
        this.props.getParisWeather(res.data);
      })
      .catch(console);
    this.props.getUnit(units[0]);
  };

  changeUnits = (e, id) => {
    this.fetchParisWeather(units[id].value);
    this.props.getUnit(units[id]);
  };

  render() {
    return (
      <div className="header">
        <Navbar className="navbar">
          <Nav navbar className="menu">
            <NavItem className="menu-item">
              <NavLink
                className={`menu-item-label ${(this.props.match.url === MAIN_ROUTE || this.props.match.url === WEATHER_ROUTE) ? 'selected' : ''}`}
                href={WEATHER_ROUTE}
              >
                {I18n.t('header.nav.WEATHER')}
              </NavLink>
            </NavItem>
            <NavItem className="menu-item">
              <NavLink
                className={`menu-item-label ${this.props.match.url === SUNRISE_ROUTE && 'selected'}`}
                href={SUNRISE_ROUTE}
              >
                {I18n.t('header.nav.SUNRISE')}
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <SelectField
          floatingLabelText={I18n.t('header.select.TITLE')}
          onChange={this.changeUnits}
          value={this.props.unit.id}
          className="content"
          floatingLabelStyle={{ color: 'black' }}
          iconStyle={{ color: 'black'}}
        >
          {units.map(option => (
            <MenuItem key={option.id} value={option.id} primaryText={I18n.t(`header.select.${option.value}`)} />
          ))}
        </SelectField>
        <h1 className="content-label">{I18n.t('app.CITY')}</h1>
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  unit: state.pages.get('unit'),
}), {
  getParisWeather,
  getUnit,
})(Header));
