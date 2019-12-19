import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { TextField, Snackbar, Typography } from '@material-ui/core';
import FirebaseMessaging from '../services/FirebaseMessaging';

class Notification extends React.Component {
  constructor(props) {
    super(props);

    this.message = new FirebaseMessaging({
      handleMessage: this.handleMessage.bind(this)
    });

    this.state = {
      token: '',
      toast: false,
      toastMessage: ''
    };
  }

  componentDidMount() {
    this.message.requirestPermission().then(token => {
      this.setState({token})
    })
    .catch(err => {
      console.log(err)
    });
  }

  handleMessage = ({notification: {title = 'Title', body = 'Body'} = {}}) => {
    this.setState({
      toast: true,
      toastMessage: `${title}: ${body}`
    });
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Message
          </Typography>
          <Typography variant="subtitle1" component="h5">
            Here is token for the browser
          </Typography>
          <TextField
            label="Token"
            disabled={true}
            fullWidth={true}
            multiline
            rows={2}
            value={this.state.token}
          />
          <Snackbar
            open={this.state.toast}
            message={this.state.toastMessage}
            autoHideDuration={4000}
            onRequestClose={() => this.setState({ toast: false })}
          />
        </CardContent>
      </Card>
    );
  }
}

export default Notification;
