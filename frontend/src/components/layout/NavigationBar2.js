import React from 'react'
import { AppBar, Collapse, IconButton, Toolbar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import SortIcon from '@material-ui/icons/Sort';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
	appbarWrapper: {
		width: '80%',
		margin: '0 auto'
	},
	appbarTitle: {
		flexGrow: '1'
	},
	toolMenu: {
		fontFamily: "Nunito",
	},
	appbar: {
		background: 'none'
	},
	colorText: {
		color: '#5AFF3D'
	},
	icon: {
		color: '#fff',
		fontSize: '2rem'
	},
}));

export default function NavigationBar() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar className={classes.appbar} elevation={0}>
			<Toolbar className={classes.appbarWrapper}>
				<img className="key" src="/static/images/loginOuthouse.png" alt="yellow key" width='50' height='50'></img>
				<h1 className={classes.appbarTitle}>
					Privy<span className={classes.colorText}>Social.</span>
				</h1>
				<IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
					<SortIcon className={classes.icon} />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<a href="#/login"><MenuItem onClick={handleClose}
						className={classes.toolMenu}>Login</MenuItem></a>
					<a href="#/register">
						<MenuItem onClick={handleClose}
							className={classes.toolMenu}>Register</MenuItem></a>
				</Menu>
			</Toolbar>
		</AppBar>
	)
}
