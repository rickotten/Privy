import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createMessage } from "../../../actions/errors";

export class ShareButton extends Component {
	state = {
		anchorEl: null
	}

	static propTypes = {
		currentUser: PropTypes.object.isRequired,
		postAuthor: PropTypes.string.isRequired,
		token: PropTypes.string.isRequired,
		createAlert: PropTypes.func.isRequired,
		post_id: PropTypes.number.isRequired
	}

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget })
	}

	handleClose = () => {
		this.setState({ anchorEl: null })
	}

	deletePost = (post_id) => () => {
		const token = this.props.token;
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}
		// If token, add to headers config
		if (token) {
			config.headers['Authorization'] = `Token ${token}`;
		}

		axios.delete(`/posts/${post_id}`, config)
			.then(res => {
				this.props.createAlert("Deleted Post! Reload page")
				// window.location.reload()
			}).catch(err => {
				this.props.createAlert("Can't delete!")
				console.log(err);
			})

	}

	render() {
		const { currentUser, postAuthor, post_id } = this.props

		const deleteButton = (currentUser.username === postAuthor) ? (<MenuItem onClick={this.deletePost(post_id)}>Delete</MenuItem>) : undefined

		return (
			<div>
				<IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
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
					{deleteButton}
				</Menu>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.user,
	token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
	createAlert: (message) => { dispatch(createMessage({postDeleteSuccess: message}))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ShareButton)
