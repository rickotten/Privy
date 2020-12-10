import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import GoogleOAuth from '../oauth/GoogleOAuth';
import FacebookOAuth from '../oauth/FacebookOAuth';
import NavigationBar from '../layout/NavigationBar2'
import { Paper, Grid, TextField, Button, FormControlLabel, Checkbox, makeStyles, Typography } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import MockReviewCard from './MockReviewCard';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		// margin: 'auto',
		// justifyContent: 'column'
		height: '100vh',
		minWidth: '100'
	},
	containers: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		margin: 'auto',
		width: '40%',
		height: '100%',
		background: 'none',
		// backgroundColor: 'blue'
	},
	loginForm: {

	},
	padding: {
		padding: theme.spacing.unit * 6,
		backgroundColor: '#ffffff'
	},
	loginGreeting: {
		fontFamily: "Nunito",
		fontWeight: "bold",
		color: 'rgb(51, 51, 51)'
	},
	reviewsTop: {
		fontFamily: "Nunito",
		fontWeight: "bold",
		color: '#fff'
	},
	textFields: {
		backgroundColor: 'rgb(123, 147, 172)',
		fontFamily: "Nunito",
	},
	colorText: {
		color: '#22e600'
	},
	margin: {
		margin: theme.spacing.unit * 2,
	},
}))

export function LoginForm({
	login,
	isAuthenticated
}) {
	if (isAuthenticated) {
		/* 
		Update state before the HomePage component loads. That way, it is guranateed this action will 
		fire and reduce to update the state before the state is loaded immutably into the HomePage 
		component.
		*/
		return <Redirect to="/" />;
	}
	const classes = useStyles();
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const onSubmit = e => {
		e.preventDefault();
		login(username, password);
	}

	const onChange = e => {
		switch (e.target.name) {
			case "username":
				setUsername(e.target.value)
				break;

			case "password":
				setPassword(e.target.value)
				break;

			default:
				console.log('error')
				break;
		}
	}

	return (
		<div className={classes.root}>
			<NavigationBar />
			<div className={classes.containers}>
				<Slide direction="up" in={true} timeout={1000} mountOnEnter unmountOnExit>
					<Paper elevation={4} className={classes.paper}>
						<MockReviewCard />
					</Paper>
				</Slide>
			</div>
			<div className={classes.containers}>
				<form onSubmit={onSubmit}>
					<Paper className={classes.padding} elevation={5}>
						<Typography variant={'h5'} className={classes.loginGreeting}>Thank you for choosing Privy<span className={classes.colorText}>Social</span>!</Typography>
						<div className={classes.margin}>
							<Grid container spacing={8} alignItems="flex-end">
								<Grid item>
									<Face />
								</Grid>
								<Grid item md={true} sm={true} xs={true}>
									{/* <TextField id="username" label="Username" type="email" fullWidth autoFocus required /> */}
									<TextField name="username" onChange={onChange} id="username" label="Username" fullWidth autoFocus required />
								</Grid>
							</Grid>
							<Grid container spacing={8} alignItems="flex-end">
								<Grid item>
									<Fingerprint />
								</Grid>
								<Grid item md={true} sm={true} xs={true}>
									<TextField
										onChange={onChange}
										name="password"
										color='secondary' id="password" label="Password" type="password" fullWidth required />
								</Grid>
							</Grid>
							<Grid container alignItems="center" justify="space-between">
								<Grid item>
									<FormControlLabel control={
										<Checkbox
											color="primary"
										/>
									} label="Remember me" />
								</Grid>
								<Grid item>
									<a href="#/forgot"><Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button></a>
								</Grid>
							</Grid>
							<Grid container justify="center" style={{ marginTop: '10px' }}>
								<Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
							</Grid>
							<Grid container justify="center" style={{ marginTop: '10px' }}>
								<div style={{ display: 'flex', margin: 'auto' }}>
									<GoogleOAuth />
									<FacebookOAuth />
								</div>
							</Grid>
						</div>
					</Paper>
				</form>
			</div>
		</div >
	)
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(LoginForm)
