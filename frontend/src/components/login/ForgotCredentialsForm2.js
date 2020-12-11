import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import NavigationBar from '../layout/NavigationBar2'
import { Paper, Typography, Grid, TextField, Button } from "@material-ui/core";
import { Email } from '@material-ui/icons'
import { connect } from "react-redux";
import { forgot } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		height: '100vh',
	},
	formContainer: {
		display: 'flex',
		justifyContent: 'center',
		margin: 'auto',
		width: '30%',
		height: '50%'
	},
	centerVertically: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		height: '100%'
	},
	spaceAroundHorizontal: {
		display: 'flex',
		justifyContent: 'space-around',
		width: '100%',
		alignItems: 'center'
	},
	centerHorizontally: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		alignItems: 'center'
	},
	colorText: {
		fontFamily: "Nunito",
		fontWeight: "bold",
		color: '#22e600'
	},
	forgotForm: {
		width: '60%',
		height: '80%',
		margin: 'auto',
	},
	forgotGreeting: {
		fontFamily: "Nunito",
		fontWeight: "bold",
		color: 'rgb(51, 51, 51)'
	},
	formGridContainer: {
		display: 'flex',
		justifyContent: 'center'
	}
}))
export function ForgotCredentialsForm({
	forgot
}) {
	const classes = useStyles();
	const [email, setEmail] = useState('')
	const onChange = (e) => {
		setEmail(e.target.value)
	}
	const onSubmit = (e) => {
		e.preventDefault();
		forgot(email)
	}
	return (
		<div className={classes.root}>
			<NavigationBar />
			<div className={classes.centerVertically}>
					<Paper className={classes.formContainer} elevation={5}>
						<form onSubmit={onSubmit} className={classes.forgotForm}>
						<Grid container spacing={3} className={classes.formGridContainer}>
							<Grid item xs={12}>
							<Typography variant={'h5'} className={`${classes.forgotGreeting} ${classes.centerHorizontally}`}>Forgot your</Typography>
								<Typography variant={'h5'} className={` ${classes.colorText} ${classes.centerHorizontally}`}>password?</Typography>
							</Grid>
								<Grid item xs={12} className={classes.spaceAroundHorizontal}>
									<Email styles={{paddingRight: 15}}/>
									<TextField  name="email" onChange={onChange} id="email" label="Email" type="email" autoFocus required />
								</Grid>
								<Grid item xs={12} className={classes.centerHorizontally}>
								<Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Send One Time Password</Button>
								</Grid>
								<Grid item xs={12} className={classes.spaceAroundHorizontal}>
										<a href="#/register"><Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Register</Button></a>
										<a href="#/login"><Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Login</Button></a>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</div>
		</div>
	)
}

export default connect(null, { forgot })(ForgotCredentialsForm)