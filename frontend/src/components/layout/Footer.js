import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Zoom from '@material-ui/core/Zoom';
import NavigationIcon from '@material-ui/icons/Navigation';
import UserPostForm from '../posts/UserPostForm2';
import { IconButton, Slide, Menu, MenuItem } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import ForumIcon from '@material-ui/icons/Forum';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CreatePageForm from '../pages/CreatePageForm2'
import Chat from "../messages/Chat";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		top: 'auto',
		left: 20,
		bottom: 20,
		right: 'auto',
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
	messageIcon: {
		fontFamily: "Nunito",
		backgroundColor: 'rgb(50, 201, 209)'
	}
}));

export default function Footer({
	reload,
	loading,
	postable,
	page,
	noMessage
}) {
	const [anchorEl, setAnchorEl] = useState(null)
	const [navAnchorEl, setNavAnchor] = useState(null)
	const [pageFormAnchorEl, setPageAnchor] = useState(null)
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

	const showPageForm = (event) => {
		setPageAnchor(event.currentTarget)
	}

	const closePageForm = () => {
		setPageAnchor(null);
	}

	return (
		<div className={classes.root}>
			{loading &&
				<Zoom in={true}>
					<Fab >
						<CircularProgress />
					</Fab>
				</Zoom>}
			{postable &&
				<Zoom in={true}>
					<Fab color="secondary" aria-label="edit">
						<IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
							<EditIcon />
						</IconButton>
					</Fab>
				</Zoom>}
			<Zoom in={true}>
				<Fab>
					<IconButton aria-controls="page-form-menu" aria-haspopup="true" onClick={showPageForm} onClose={closePageForm}>
						<PostAddIcon />
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
			{!noMessage &&
				<Zoom in={true}>
					<Fab className={classes.messageIcon} variant="extended">
						<a href="#/messages">
							<IconButton>
								<ChatBubbleOutlineIcon className={classes.extendedIcon} />
					Messages
					</IconButton>
						</a>
					</Fab>
				</Zoom>}
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				TransitionComponent={Slide}
			>
				<UserPostForm page_id={page} reload={reload} />
			</Menu>
			<Menu
				id="page-form-menu"
				anchorEl={pageFormAnchorEl}
				keepMounted
				open={Boolean(pageFormAnchorEl)}
				onClose={closePageForm}
				TransitionComponent={Slide}
			>
				<CreatePageForm />
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
					{/* <a href="#/market">
						<MenuItem onClick={closeMenu}
							className={classes.toolMenu}>Market</MenuItem>
					</a> */}
					{/* <a href="#/logout">
						<MenuItem onClick={closeMenu}
							className={classes.toolMenu}>Logout</MenuItem>
					</a> */}
				</div>
			</Menu>
		</div >
	);
}