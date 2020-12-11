import React from 'react';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Grid, Badge } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	text: {
		fontFamily: 'Nunito',
		fontWeight: 'bold',
		color: '#fff',
		display: 'flex',
		justifyContent: 'center'
	},
	text2: {
		fontFamily: 'Nunito',
		fontWeight: 'bold',
		color: '#fff',
		display: 'flex',
		justifyContent: 'flex-end'
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
		justifyContent: 'flex-end'
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
	id,
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
					<a style={{ textDecoration: 'none' }} href={`#/pages/${id}`}><h2 className={classes.text}>{title}</h2>
					</a>
				</Grid>
				<Grid item xs={12}>
					<a style={{ textDecoration: 'none' }} href={`#/pages/${id}`}><h3 className={classes.text}>{description}</h3></a>
				</Grid>
				<Grid item xs={6}>
					<h5 className={classes.text2}>Managed by</h5>
					<h5 className={classes.coloredText}>{owner}</h5>
					<h5 className={classes.text2}>since {dayjs(dateCreated).format('MMM D, YYYY')}</h5>
				</Grid>
				<Grid item xs={6}>
					{subscribeButton}
					<MembersButton showMembers pageType menuLabel='members' members={members} />
				</Grid>
			</Grid>
		</div >
	);
}

const membersButtonStyles = makeStyles((theme) => ({
	styledButton: {
		fontFamily: "Nunito",
	},
	whiteButton: {
		fontFamily: "Nunito",
		color: '#fff',
		borderColor: '#fff'
	}
}))
export function MembersButton({
	menuLabel,
	members,
	pageType,
	showMembers
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
			{showMembers &&
				<Badge badgeContent={members.length} color="primary">
					<Button color='primary' variant="outlined" className={pageType ? classes.whiteButton : classes.styledButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
						{menuLabel}
					</Button>
				</Badge>
			}
			{!showMembers &&
				<Button color='primary' variant="outlined" className={pageType ? classes.whiteButton : classes.styledButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
					{menuLabel}
				</Button>
			}
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