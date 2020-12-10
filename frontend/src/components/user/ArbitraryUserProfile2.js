import axios from 'axios';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types'
import dayjs from 'dayjs';
// MUI Icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import NoteIcon from '@material-ui/icons/Note';
import FaceIcon from '@material-ui/icons/Face';
import { connect } from "react-redux";
import NavigationBar from "../layout/NavigationBar2"
import { MembersButton } from "../pages/PageHeader";
import Badge from '@material-ui/core/Badge';
import UserTimeline from "../layout/UserTimeline2";
import { Grid, Paper } from "@material-ui/core";
import NavBlocker from "../../util/NavBlocker";
import Footer from "../layout/Footer";

const useStyles = (theme) => ({
	root: {
		flexGrow: 1
	},
	gridItem: {
		padding: theme.spacing(2),
	},
	list: {
		width: '100%',
		maxWidth: 1200,
		// backgroundColor: theme.palette.background.paper,
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
	profilePicture: {
		margin: "auto",
		width: theme.spacing(15),
		height: theme.spacing(15),
	},
	wrapperLabel: {
		margin: "auto"
	},
	input: {
		// margin:'auto',
		display: 'none'
	},
	profile: {
		backgroundColor: 'white'
	},
	textFields: {
		fontFamily: 'Nunito',
		color: '#fff'
	},
	centered: {
		display: 'flex',
		justifyContent: 'center'
	},
	paperBackground: {
		margin: 'auto'
	},
	postsContainer: {
		maxHeight: 550,
		overflowY: 'scroll'
	},
	columnCentered: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	}
});

export class ArbitraryUserProfile extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		auth: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			username: "loading....",
			profilePicture: "/static/images/penguin.jpg",
			email: "loading...",
			bio: "Here's a simple bio",
			createdAt: "Loading...",
			postCount: 5,
			friendsCount: 10,
			showEmail: true,
			following: false,
			followers: [],
			followingUsers: []
		}
	}

	componentDidMount() {
		this.lookUpProfile();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.username !== prevProps.match.params.username) {
			this.lookUpProfile();
		}
	}

	lookUpProfile = () => {
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

		axios.get(`/profiles/${this.props.match.params.username}`, config)
			.then(res => {
				this.setState({
					username: res.data.user.username,
					email: res.data.user.email,
					createdAt: dayjs(res.data.user.date_joined).format("dddd, MMMM D YYYY"),
					profilePicture: res.data.user.profile ? res.data.user.profile.profile_picture : "/static/images/penguin.jpg",
					showEmail: res.data.user.settings ? res.data.user.settings.show_email_on_profile : true
				})
				this.ifAlreadyFriends()
			}).catch(err => {
				console.log(err);
			});
		axios.get(`/getsocialcircle/${this.props.match.params.username}`, config)
			.then(res => {
				this.setState({ followers: res.data.followers, followingUsers: res.data.following })
			}).catch(err => {
				console.log(err);
			})
	}

	ifAlreadyFriends = () => {
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
		const friendUsername = this.props.match.params.username;
		const body = JSON.stringify({ friendUsername });
		axios.post(`/alreadyfriends`, body, config)
			.then(res => {
				if (res.data) {
					this.setState({ following: true })
				} else {
					this.setState({ following: false })
				}
			})
			.catch(err => {
				console.log(err);
			})
	}

	follow = () => {
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
		const username = this.props.auth.user.username;
		const friendUsername = this.props.match.params.username;
		const body = JSON.stringify({ username, friendUsername });

		if (this.state.following) {
			this.setState({ following: false })
		} else {
			axios.post('/api/auth/friendRequest', body, config)
				.then(res => {
					this.setState({ following: true })
				})
		}
	}

	ifAlreadyFriends = () => {
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
		const friendUsername = this.props.match.params.username;
		const body = JSON.stringify({ friendUsername });
		axios.post(`/alreadyfriends`, body, config)
			.then(res => {
				if (res.data) {
					this.setState({ following: true })
				} else {
					this.setState({ following: false })
				}
			})
			.catch(err => {
				console.log(err);
			})
	}

	follow = () => {
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
		const username = this.props.auth.user.username;
		const friendUsername = this.props.match.params.username;
		const body = JSON.stringify({ username, friendUsername });

		if (this.state.following) {
			this.setState({ following: false })
		} else {
			axios.post('/api/auth/friendRequest', body, config)
				.then(res => {
					this.setState({ following: true })
				})
		}
	}

	render() {
		const { username, profilePicture, email, bio, createdAt, showEmail, following, followers, followingUsers } = this.state;
		const classes = this.props.classes;

		return (
			<div className={classes.root}>
				<NavigationBar authenticated />
				<NavBlocker />
				<Grid container spacing={3}>
					<Grid item xs>
						<Paper className={classes.paperBackground}>
							<Grid container spacing={3}>
								<Grid item xs={6} className={classes.centered}>
									<Badge badgeContent={followers.length} color="primary">
										<MembersButton
											menuLabel={"Followers"}
											members={followers}
										/>
									</Badge>
								</Grid>
								<Grid item xs={6} className={classes.centered}>
									<Badge badgeContent={followingUsers.length} color="primary">
										<MembersButton
											menuLabel={"Following"}
											members={followingUsers}
										/>
									</Badge>
								</Grid>
								<Grid item xs={6}>
									<div className={classes.columnCentered}>
										<div className={classes.centered}>
											<Avatar alt={username.toUpperCase().charAt(0)} className={classes.profilePicture} src={profilePicture} />
										</div>
									</div>
								</Grid>
								<Grid item xs={6} className={classes.centered}>
									<List>
										<ListItem >
											<ListItemAvatar>
												<Avatar>
													<FaceIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary={username} secondary="Username" />
										</ListItem>
										<ListItem >
											<ListItemAvatar>
												<Avatar>
													<AlternateEmailIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary={email} secondary="User Email" />
										</ListItem>
										<ListItem className="goldenBackground">
											<ListItemAvatar>
												<Avatar>
													<AccessTimeIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary={createdAt} secondary="Member since" />
										</ListItem>
									</List>
								</Grid>
							</Grid>
						</Paper>
					</Grid>

					<Grid item xs className={classes.postsContainer}>
						<UserTimeline match={{ params: { username: username } }} />
					</Grid>
				</Grid>
				<Footer />
			</div >

		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(ArbitraryUserProfile));