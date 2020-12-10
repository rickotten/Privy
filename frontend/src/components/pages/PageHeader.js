import React from 'react';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	text: {
		fontFamily: 'Nunito',
		fontWeight: 'bold',
		color: '#fff',
		display: 'flex',
		justifyContent: 'center'
	},
	centered: {
		display: 'flex',
		justifyContent: 'center'
	},
	coloredText: {
		fontFamily: 'Nunito',
		fontWeight: 'bold',
		color: '#5AFF3D',
		display: 'flex',
		justifyContent: 'center'
	},
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function PageHeader({
	title,
	description,
	dateCreated,
	owner,
	subscribeButton,
	members
}) {
	const classes = useStyles();

	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<h2 className={classes.text}>{title}</h2>
				</Grid>
				<Grid item xs={12}>
					<h3 className={classes.text}>{description}</h3>
				</Grid>
				<Grid item xs={12}>
					<h5 className={classes.text}>Managed by</h5>
					<h5 className={classes.coloredText}>{owner}</h5>
					<h5 className={classes.text}>since {dayjs(dateCreated).format('MMM D, YYYY')}</h5>
				</Grid>
			</Grid>
		</div >
	);
}

const membersButtonStyles = makeStyles((theme) => ({
	styledButton: {
		fontFamily: "Nunito",
	},
}))
export function MembersButton({
	menuLabel,
	members
}) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = membersButtonStyles();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<Button color='primary' variant="outlined" className={classes.styledButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				{menuLabel}
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{members.map((member) => (
					<a href={`#/profile/${member}`}><MenuItem onClick={handleClose}>{member}</MenuItem></a>
				))}
			</Menu>
		</div>
	);
}