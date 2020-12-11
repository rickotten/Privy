import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigationBar from '../layout/NavigationBar2'


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

	return (
		<div className={classes.root} id="header">
			<NavigationBar />
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
