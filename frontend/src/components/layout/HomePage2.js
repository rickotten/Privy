import React, { Component } from 'react';
import NavigationBar from './NavigationBar2';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import UserPost2 from "../posts/UserPost";
import UserPostForm from '../posts/UserPostForm2';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBlocker from '../../util/NavBlocker'
import Footer from './Footer'

const useStyles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center'
	},
	posts: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
})
export class HomePage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: 'Loading...',
			userPosts: [],
			reload: false,
			loading: true
		}
	}

	static propTypes = {
		auth: PropTypes.object.isRequired
	}

	componentDidMount() {
		// Hackey method to set the dark_mode theme.
		localStorage.setItem('DARK_THEME', this.props.auth.user.settings.dark_mode);
		this.lookUpPosts();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.username !== prevProps.match.params.username || this.state.reload) {
			this.lookUpPosts();
		}
	}

	reload = () => {
		this.setState({ reload: true })
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

		const tempContent = {
			createdAt: "2020-01-31T12:59-0500"
		};


		//Getting the user posts
		axios.get(`/api/auth/home/${this.props.auth.user.username}`, config)
			.then(res => {
				const localPosts = [];
				res.data.forEach(post => {
					localPosts.push(<UserPost2 reload={this.reload}
						key={post.id} tempContent={tempContent} post={post} />);
				})
				if (localPosts.length === 0) {
					this.setState({ userPosts: (<h1 style={{ paddingTop: 10 }}>No Posts yet!</h1>), loading: false })
				}
				else {
					this.setState({ userPosts: localPosts, loading: false });
				}

			}).catch(err => {
				console.log(err);
			});
		this.setState({ reload: false })
	}

	render() {
		const { classes } = this.props
		console.log(this.state.loading)
		return (
			<div>
				<NavigationBar authenticated />
				<NavBlocker />
				<div className={classes.root}>

					{/* <div className="card card-body">
					<UserPostForm reload={this.reload} />
				</div> */}
					<div className={classes.posts}>
						{this.state.loading && <CircularProgress style={{ width: '100%', height: '100%' }} />}
						{!this.state.loading &&
							<div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
								{this.state.userPosts}
							</div>
						}
						{/* <UserPostForm reload={this.reload} /> */}
						<Footer loading={this.state.loading} reload={this.reload} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(HomePage))
