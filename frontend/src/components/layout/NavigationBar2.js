import React from 'react'
import { AppBar, IconButton, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import SortIcon from '@material-ui/icons/Sort';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchFormExample from "../searches/SearchFormExample";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
	appbarWrapper: {
		width: '80%',
		margin: '0 auto'
	},
	appbarTitle: {
		flexGrow: '1',
		fontFamily: "Nunito",
		fontWeight: 'bold',
		color: '#fff'
	},
	toolMenu: {
		fontFamily: "Nunito",
	},
	appbar: {
		backgroundColor: 'rgb(82, 106, 107, 0.6)'
	},
	colorText: {
		fontFamily: "Nunito",
		color: '#5AFF3D',
		fontWeight: 'bold'
	},
	icon: {
		color: '#fff',
		fontSize: '2rem'
	},
	logout: {
		color: '#fff',
		fontFamily: "Nunito",
		fontSize: '1rem',
		fontWeight: 'bold'
	}
}));

export function NavigationBar({
	authenticated,
	logout
}) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const unauthMenu = (<div>
		<a href="#/login"><MenuItem onClick={handleClose}
			className={classes.toolMenu}>Login</MenuItem></a>
		<a href="#/register">
			<MenuItem onClick={handleClose}
				className={classes.toolMenu}>Register</MenuItem></a>
		<a href="#/forgot">
			<MenuItem onClick={handleClose} className={classes.toolMenu}>
				Forgot Password
			</MenuItem>
		</a>
	</div>)

	const authMenu = (<div>
		<a href="#/profile">
			<MenuItem onClick={handleClose}
				className={classes.toolMenu}>Profile</MenuItem>
		</a>
		<a href="#/pages">
			<MenuItem onClick={handleClose}
				className={classes.toolMenu}>Pages</MenuItem>
		</a>
		<a href="#/messages">
			<MenuItem onClick={handleClose}
				className={classes.toolMenu}>Messages</MenuItem>
		</a>
		<a href='#/marketplace'>
			<MenuItem onClick={handleClose}
				className={classes.toolMenu}>Market</MenuItem>
		</a>

		{/* <a href="#/market">
			<MenuItem onClick={handleClose}
				className={classes.toolMenu}>Market</MenuItem>
		</a> */}
		{/* <a href="#/logout">
			<MenuItem onClick={handleClose}
				className={classes.toolMenu}>Logout</MenuItem>
		</a> */}
	</div>)

	const clickLogout = () => {
		logout();
		window.location.href = "#/"
	}

	return (
		<AppBar className={classes.appbar} elevation={0}>
			<Toolbar className={classes.appbarWrapper}>
				<a href="#/">
					<img className="key" src="/static/images/loginOuthouse.png" alt="yellow key" width='50' height='50'></img>
				</a>
				{/* <a href="#/"> */}
				<Button style={{ textTransform: 'none' }} onClick={() => window.location.href = "#/"}>
					{/* <Button href="#/" style={{ textTransform: 'none' }}> */}
					<h1 className={classes.appbarTitle}>
						{/* <Typography variant='h1' className={classes.appbarTitle}> */}
						Privy<span className={classes.colorText}>Social.</span>
						{/* </Typography> */}
					</h1>
				</Button>
				<div style={{ flexGrow: 1 }}>

				</div>
				{/* </a> */}
				{authenticated && <SearchFormExample />}
				<IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
					<SortIcon className={classes.icon} />
				</IconButton>
				{authenticated &&
					<IconButton onClick={clickLogout}>
						<ExitToAppIcon className={classes.icon} />
						<span className={classes.logout}>Logout</span>
					</IconButton>
				}
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					{authenticated && authMenu}
					{!authenticated && unauthMenu}
				</Menu>
			</Toolbar>
		</AppBar>
	)
}

export default connect(null, { logout })(NavigationBar)