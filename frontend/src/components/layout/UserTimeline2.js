import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import UserPost2 from '../posts/UserPost';
import { connect } from "react-redux";
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
	noPosts: {
		fontFamily: "Nunito",
		fontWeight: "bold",
		color: '#fff'
	}
})
export class UserTimeline extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userPosts: [],
			loading: true
		}
	}


	componentDidMount() {
		this.lookUpPosts()
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.username !== prevProps.match.params.username || this.props.reload) {
			this.lookUpPosts();

		}
	}

	lookUpPosts = () => {
		// Code below taken from auth.js action
		const token = this.props.auth.token;
		// Headers 
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}
		// If token, add to headers config
		if (token) {
			config.headers['Authorization'] = `Token ${token}`;
		}


		//Getting the user posts
		if (this.props.match.params.username !== "loading....") {
			axios.get(`/api/auth/${this.props.match.params.username}`, config)
				.then(res => {
					const localPosts = []
					res.data.forEach(post => {
						localPosts.push(<UserPost2 post={post} />);
					})
					this.setState({ userPosts: localPosts, loading: false });
				}).catch(err => {
					console.log(err);
					this.setState({ loading: false })
				});
		}
	}

	render() {
		const classes = this.props.classes
		return (
			<div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					{this.state.loading && <CircularProgress style={{ width: '10%', height: '10%' }} />}
					{!this.state.loading &&
						<div style={{ display: 'flex', flexDirection: 'column', width: "80%" }}>
							{this.state.userPosts.length === 0 ? <h1 className={classes.noPosts}>No Posts yet!</h1> : this.state.userPosts}
						</div>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(UserTimeline))
