import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class ShareButton extends Component {
	state = {
		anchorEl: null
	}

	static propTypes = {
		user: PropTypes.object.isRequired
	}

	render() {
		const handleClick = (event) => {
			this.setState({ anchorEl: event.currentTarget })
		};

		const handleClose = () => {
			this.setState({ anchorEl: null })
		};

		return (
			<div>
				<IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={this.state.anchorEl}
					keepMounted
					open={Boolean(this.state.anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={handleClose}>Share</MenuItem>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps)(ShareButton)
