import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Collapse, IconButton, Toolbar } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: "100vh",
		fontFamily: "Nunito"
	},
	goDown: {
		color: '#5AFF3D',
		fontSize: "4em"
	},
	appbar: {
		background: 'none'
	},
	toolMenu: {
		fontFamily: "Nunito",
	},
	container: {
		textAlign: 'center'
	},
	appbarWrapper: {
		width: '80%',
		margin: '0 auto'
	},
	icon: {
		color: '#fff',
		fontSize: '2rem'
	},
	appbarTitle: {
		flexGrow: '1'
	},
	colorText: {
		color: '#5AFF3D'
	},
	title: {
		color: '#fff',
		fontSize: '4.5rem'
	}
}))
export default function Header() {
	const classes = useStyles();
	const [checked, setChecked] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);

	useEffect(() => {
		setChecked(true);
	})

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root} id="header">
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
			<Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}
			>
				<div className={classes.container}>
					<img className="key" src="..\static\images\key.png" alt="yellow key" width='50%'></img>
					<h1 className={classes.title}>
						Welcome to <br /> Privy<span className={classes.colorText}>Social.</span></h1>
					<IconButton>
						<ExpandMoreIcon className={classes.goDown} />
					</IconButton>
				</div>
			</Collapse>
		</div >
	)
}
