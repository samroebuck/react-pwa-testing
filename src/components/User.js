import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import { ListItemText } from "@material-ui/core";
import usersDatabase from '../services/UsersDatabase';

class User extends React.Component {
	constructor(props) {
		super(props);

		this.state = Object.assign({}, props.params, props);
	}

	componentWillMount() {
		if (this.state.id && !this.state.user) {
			const user = usersDatabase().data(this.state.id);
			const get = user ? Promise.resolve(user) : usersDatabase().get();

			get.then(() => {
				this.setState({user: usersDatabase().data(this.state.id)})
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.id !== (nextProps.params && nextProps.params.id) ||
				this.state.user !== nextState.user) {
			return true;
		}

		return false;
	}

  render() {
    return (
      <React.Fragment>
        <Avatar>
          <PersonIcon />
        </Avatar>
        <ListItemText
          primary={this.state.user ? this.state.user.name : ""}
          secondary={this.state.user ? this.state.user.email : ""}
        />
      </React.Fragment>
    );
  }
}

User.propTypes = {
	user: PropTypes.object,
};

export default User;
