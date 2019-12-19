import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ListItem,
  List
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import User from './User'
import usersDatabase from '../services/UsersDatabase';

const styles = theme => ({
  container: {
    flexGrow: 1
  },
  button: {
    position: "fixed",
    bottom: theme.spacing.unit,
    right: theme.spacing.unit
  }
});

class Users extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: Users.database().data(),
			dialog: false,
      name: "",
      email: ""
		};
	}

	static database() {
		 return usersDatabase(firebaseConfig);
	}

	componentDidMount() {
		Users.database().get()
			.then(users => this.setState({users}))
			.catch(err => {
			  console.log(err);
		  });
	}

	shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.match.params.id || nextProps.match.params.id !== this.props.match.params.id;
	}

	handleOpenDialog = () => this.setState({dialog: true})

	handleCloseDialog = () => this.setState({dialog: false})

	handleSubmit = () => {
    const { name, email } = this.state;
    const user = {
      name,
      email
    };

		if (!user.name || !user.email) {
			this.handleCloseDialog();
			return;
		}

		Users.database().post(user).then(users => {
			this.setState({
				users: Users.database().data(),
				dialog: false
			});
		}).catch(err => {
			console.log(err);
		});
	}

  handleInputChange = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value });
  };

	render() {
		const users = () => {
			if (!this.state.users) {
				return;
			}

      if (this.props.match.params.id) {
        return (
          <List>
            <ListItem>
              <User user={this.state.users[this.props.match.params.id]} />
            </ListItem>
          </List>
				);
      }

			return (
        <List>
          {Object.keys(this.state.users).map(id => (
            <ListItem button component={Link} to={`/users/${id}`} key={id}>
              <User user={this.state.users[id]} />
            </ListItem>
          ))}
        </List>
      );
    };

    const addButton = () => {
      if (this.props.match.params.id) {
        return null;
      }

      const { classes } = this.props;
      return (
        <React.Fragment>
          <Button
            className={classes.button}
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={this.handleOpenDialog}
          >
            <AddIcon />
          </Button>
          <Dialog open={this.state.dialog} onClose={this.handleCloseDialog}>
            <DialogTitle>Adding New User</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Input your name and email address.
              </DialogContentText>
              <TextField
                margin="dense"
                autoFocus
                fullWidth
                label="Name"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
              <TextField
                margin="dense"
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
    };

    return (
      <React.Fragment>
        {users()}
        {addButton()}
      </React.Fragment>
    );
	}
}

Users.propTypes = {
  params: PropTypes.object
};

export default withStyles(styles)(Users);
