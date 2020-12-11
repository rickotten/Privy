import axios from 'axios';
import React, { Component, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
// MUI Icons
import Badge from '@material-ui/core/Badge';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import FaceIcon from '@material-ui/icons/Face';
import { connect } from "react-redux";
import NavigationBar from '../layout/NavigationBar2';
import IconButton from '@material-ui/core/IconButton';
import { MembersButton } from "../pages/PageHeader";
import UserTimeline from "../layout/UserTimeline2";
import { Grid, Paper, FormGroup, FormControlLabel, Switch, Button } from "@material-ui/core";
import NavBlocker from "../../util/NavBlocker";
import Footer from "../layout/Footer";
import { save_user_settings } from "../../actions/auth";

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
		margin: 'auto',
		paddingTop: 10
	},
	postsContainer: {
		maxHeight: 550,
		overflowY: 'scroll'
	},
	columnCentered: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	},
	profileWrapper: {
		margin: 'auto'
	}
});

export class UserProfile extends Component {
	static propTypes = {
		token: PropTypes.string.isRequired,
		classes: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
		save_user_settings: PropTypes.func.isRequired,
		settings: PropTypes.object.isRequired
	}

	state = {
		username: this.props.user.username,
		profilePicture: this.props.user.profile ? this.props.user.profile.profile_picture : "/static/images/penguin.jpg",
		email: this.props.user.email,
		// bio: "Here's a simple bio",
		createdAt: dayjs("2020-10-12T20:01:10.560000Z").format("dddd, MMMM D YYYY"),
		followers: [],
		following: [],
		reload: false
	}

	// componentDidUpda

	componentDidMount = () => {
		const token = this.props.token;
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

		axios.get(`/getsocialcircle/${this.props.user.username}`, config)
			.then(res => {
				this.setState({ followers: res.data.followers, following: res.data.following })
			}).catch(err => {
				console.log(err);
			})
	}

	// onChangeImage = e => this.setState({ [e.target.name]: e.target.files[0] });
	onChangeImage = e => {
		// this.setState({ [e.target.name]: e.target.files[0] });
		this.update_profile_picture(e.target.files[0]);
	}

	update_profile_picture = (media) => {
		const config = {
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Token ${this.props.token}`
			}
		}
		let form_data = new FormData();
		form_data.append('image', media);

		axios.post(`/updateProfilePicture`, form_data, config)
			.then(res => {
				this.setState({ profilePicture: res.data.profile_picture, reload: true })
			}).catch(err => {
				console.log(err);
			})
	}

	render() {
		const { username, profilePicture, email, bio, createdAt, followers, following, reload } = this.state;
		const {classes, settings, save_user_settings} = this.props;
		return (
			<div className={classes.root}>
				<NavigationBar authenticated />
				<NavBlocker />
				<Grid container spacing={3}>
					<Grid item xs>
						<Paper className={classes.paperBackground}>
							<Grid container spacing={3} className={classes.profileWrapper}>
								<Grid item xs={6}>
									<Badge badgeContent={followers.length} color="primary">
										<MembersButton
											menuLabel={"Followers"}
											members={followers}
										/>
									</Badge>
								</Grid>
								<Grid item xs={6} className={classes.centered}>
									<Badge badgeContent={following.length} color="primary">
										<MembersButton
											menuLabel={"Following"}
											members={following}
										/>
									</Badge>
								</Grid>
								<Grid item xs={6}>
									<div className={classes.columnCentered}>
										<div className={classes.centered}>
											<input
												name="uploadMedia"
												accept="image/*"
												className={classes.input}
												id="contained-button-file"
												onChange={this.onChangeImage}
												multiple
												type="file"
											/>
											<label htmlFor="contained-button-file">
											<IconButton component="span">
												<Badge badgeContent={'edit'} color="primary">
													<Avatar alt={username.toUpperCase().charAt(0)} className={classes.profilePicture} src={profilePicture} />
												</Badge>
											</IconButton>
											</label>
										</div>
										<UserSettings settings={settings} save_settings={save_user_settings}/>
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
										{settings.show_email_on_profile && <ListItem >
											<ListItemAvatar>
												<Avatar>
													<AlternateEmailIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary={email} secondary="User Email" />
										</ListItem>}
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
						{reload && <UserTimeline reload match={{ params: { username: username } }} />}
						{!reload && <UserTimeline match={{ params: { username: username } }} />}
					</Grid>
				</Grid>
				<Footer />

			</div >

		)
	}
}

const settingsStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-around',
		width: '100%'
	},
	saveButton: {
		textTransform: "none" ,
		fontFamily: "Nunito"
	}
}))
function UserSettings({
	settings,
	save_settings
}) {
	const classes = settingsStyles();
	const [state, setState] = React.useState({
		checkedDark: settings.dark_mode,
		checkedShowEmail: settings.show_email_on_profile,
	});
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		save_settings(state.checkedShowEmail, state.checkedDark);
	}
	return (
		<form className={classes.root} onSubmit={handleSubmit}>
			<FormGroup column>
				<FormControlLabel
					control={<Switch checked={state.checkedDark} onChange={handleChange} name="checkedDark" />}
					label="Galaxy Background"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={state.checkedShowEmail}
							onChange={handleChange}
							name="checkedShowEmail"
							color="primary"
						/>
					}
					label="Show Email on Profile"
				/>
				<Button
				type="submit"
				disableFocusRipple
				disableRipple
				className={classes.saveButton}
				variant="outlined"
				color="primary">
					SAVE
				</Button>
			</FormGroup>
		</form>
	)
}

const mapStateToProps = state => ({
	auth: state.auth,
	token: state.auth.token,
	user: state.auth.user,
	settings: state.auth.user.settings
})

export default connect(mapStateToProps, { save_user_settings })(withStyles(useStyles)(UserProfile));