// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Weather from './pages/weather/Weather';
import './app.css';
import { MAIN_ROUTE, SUNRISE_ROUTE, WEATHER_ROUTE } from './const';
import Header from './components/Header';
import SunriseSunset from './pages/sunriseSunset/SunriseSunset';

function Layout({ component: Component, route }: Props) {
  return (
    <div>
      <Header />
      <Component route={route} />
    </div>
  );
}

export default function App() {
  const layoutRender = component => route => <Layout component={component} route={route} />;
  return (
    <MuiThemeProvider>
      <div className="container">
        <Switch>
          <Route exact path={MAIN_ROUTE} render={layoutRender(Weather)} />
          <Route exact path={WEATHER_ROUTE} render={layoutRender(Weather)} />
          <Route exact path={SUNRISE_ROUTE} render={layoutRender(SunriseSunset)} />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}
