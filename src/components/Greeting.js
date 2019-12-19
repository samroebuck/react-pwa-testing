import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

class Greeting extends React.Component {
  render () {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Hello! World
          </Typography>
          <Typography variant="subtitle1" component="p" gutterBottom>
            You will have a work:
          </Typography>
          <Typography component="ul">
            <li>Web Manifest for installing</li>
            <li>Service Worker for caching and offline</li>
            <li>
              Application Shell powered by&nbsp;
              <a href="https://material-ui.com">material-ui</a>
            </li>
            <li>PRPL pattern by code splitting</li>
            <li>Opt in ES2015</li>
          </Typography>
        </CardContent>
      </Card>
    )
  }
};

export default Greeting;
