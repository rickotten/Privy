import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Zoom from '@material-ui/core/Zoom';
import NavigationIcon from '@material-ui/icons/Navigation';
import UserPostForm from '../posts/UserPostForm2';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, Slide } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		top: 'auto',
		right: 20,
		bottom: 20,
		left: 'auto',
		position: 'fixed',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	toolMenu: {
		fontFamily: "Nunito",
	},
}));

export default function Footer({
	reload
}) {
	const [anchorEl, setAnchorEl] = useState(null)
	const [navAnchorEl, setNavAnchor] = useState(null)
	const classes = useStyles();
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const showMenu = (event) => {
		setNavAnchor(event.currentTarget);
	}

	const closeMenu = () => {
		setNavAnchor(null);
	}

	return (
		<div className={classes.root}>
			{/* <Zoom in={true}>
				<Fab color="primary" aria-label="add">
					<AddIcon />
				</Fab>
			</Zoom> */}
			<Zoom in={true}>
				<Fab color="secondary" aria-label="edit">
					<IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
						<EditIcon />
					</IconButton>
				</Fab>
			</Zoom>
			<Zoom in={true}>
				<Fab variant="extended">
					<IconButton aria-controls="navigation-menu" aria-haspopup="true" onClick={showMenu}>
						<NavigationIcon className={classes.extendedIcon} />
					Navigate
					</IconButton>
				</Fab>
			</Zoom>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				TransitionComponent={Slide}
			>
				<UserPostForm reload={reload} />
			</Menu>
			<Menu
				id="simple-menu"
				anchorEl={navAnchorEl}
				keepMounted
				open={Boolean(navAnchorEl)}
				onClose={closeMenu}
				TransitionComponent={Slide}
			>
				<div>
					<a href="#/profile">
						<MenuItem onClick={closeMenu}
							className={classes.toolMenu}>Profile</MenuItem>
					</a>
					<a href="#/pages">
						<MenuItem onClick={closeMenu}
							className={classes.toolMenu}>Pages</MenuItem>
					</a>
					<a href="#/messages">
						<MenuItem onClick={closeMenu}
							className={classes.toolMenu}>Messages</MenuItem>
					</a>
					<a href="#/market">
						<MenuItem onClick={closeMenu}
							className={classes.toolMenu}>Market</MenuItem>
					</a>
					<a href="#/logout">
						<MenuItem onClick={closeMenu}
							className={classes.toolMenu}>Logout</MenuItem>
					</a>
				</div>
			</Menu>
		</div >
	);
}