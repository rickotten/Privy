import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Zoom from '@material-ui/core/Zoom';
import NavigationIcon from '@material-ui/icons/Navigation';

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
}));

export default function Footer() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Zoom in={true}>
				<Fab color="primary" aria-label="add">
					<AddIcon />
				</Fab>
			</Zoom>
			<Zoom in={true}>
				<Fab color="secondary" aria-label="edit">
					<EditIcon />
				</Fab>
			</Zoom>
			<Zoom in={true}>
				<Fab variant="extended">
					<NavigationIcon className={classes.extendedIcon} />
					Navigate
					</Fab>
			</Zoom>
		</div >
	);
}