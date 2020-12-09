import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Collapse, IconButton, Toolbar } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpandMore } from '@material-ui/icons';

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
	useEffect(() => {
		setChecked(true);
	})
	return (
		<div className={classes.root}>
			<AppBar className={classes.appbar} elevation={0}>
				<Toolbar className={classes.appbarWrapper}>
					<h1 className={classes.appbarTitle}>
						Privy<span className={classes.colorText}>Social.</span>
					</h1>
					<IconButton>
						<SortIcon className={classes.icon} />
					</IconButton>
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
		</div>
	)
}
