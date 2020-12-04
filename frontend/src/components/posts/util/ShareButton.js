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
		currentUser: PropTypes.object.isRequired,
		postAuthor: PropTypes.string.isRequired
	}

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget })
	}

	handleClose = () => {
		this.setState({ anchorEl: null })
	}

	render() {
		const { currentUser, postAuthor } = this.props

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
					onClose={this.handleClose}
				>
					<a href={`#/profile/${postAuthor}`}><MenuItem onClick={this.handleClose}>Profile</MenuItem></a>
					<MenuItem onClick={this.handleClose}>Share</MenuItem>
					<MenuItem onClick={this.handleClose}>Logout</MenuItem>
				</Menu>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.user
})

export default connect(mapStateToProps)(ShareButton)
