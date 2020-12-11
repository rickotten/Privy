import React, { Component } from 'react';
import NavigationBar from './NavigationBar2';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import UserPost2 from "../posts/UserPost";
import axios from 'axios'
import NavBlocker from '../../util/NavBlocker'
import Footer from './Footer'
import Grid from '@material-ui/core/Grid';

const useStyles = theme => ({
	root: {
		flexGrow: '1',
		display: 'flex',
		justifyContent: 'center'
	},
	heading: {
		fontFamily: 'Nunito',
		fontWeight: 'bold',
		color: '#fff',
	},
	headingContainer: {
		display: 'flex',
		justifyContent: 'center'
	},
	posts: {
		padding: theme.spacing(2)
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
					this.setState({ userPosts: ([<h1 className={this.props.classes.heading}>No Posts yet!</h1>]), loading: false })
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
		const { loading, userPosts } = this.state
		return (
			<div>
				<NavigationBar authenticated />
				<NavBlocker />
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={12} className={classes.headingContainer}>
							<h2 className={classes.heading}>See what your friends are up to!</h2>
						</Grid>
						{!loading &&
							userPosts.map(each => (
								<Grid item xs={6}>
									{each}
								</Grid>
							))
						}
					</Grid>
					<Footer postable loading={this.state.loading} reload={this.reload} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(HomePage))
