import React from 'react';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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
			<AppBar position="static" style={{ backgroundColor: 'lightskyblue' }}>
				<Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<Typography variant="h4" className={classes.title}>
							{title}
						</Typography>
						<Typography variant="h5" className={classes.title}>
							{description}
						</Typography>
						<Typography variant="h7" className={classes.title}>
							Managed by {owner}. Created on {dayjs(dateCreated).format('MMM D, YYYY')}
						</Typography>
					</div>
					<div style={{ display: 'flex' }}>
						{subscribeButton}
						<MembersButton menuLabel={"Members"} members={members} />
					</div>
				</Toolbar>
			</AppBar>
		</div>
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