import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
		background: "rgba(0,0,0,0.5)",
	},
	image: {
		width: 128,
		height: 128,
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
	},
	text: {
		fontFamily: "Nunito",
		// fontWeight: "bold",
		// fontSize: "2rem",
		color: '#fff',
	}
}));

export default function MarketItem({
	id,
	name,
	description,
	price,
	image,
	stars
}) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img className={classes.img} alt="complex" src={image} />
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item xs>
								<Typography className={classes.text} gutterBottom variant="subtitle1">
									{name} via PrivyMarket
								</Typography>
								<Typography className={classes.text} variant="body2" gutterBottom>
									{description}
								</Typography>
								<Typography className={classes.text} variant="body2" color="textSecondary">
									ID: {id}
								</Typography>
								<Rating size='small' value={stars} readOnly />
							</Grid>
							<Grid item>
							</Grid>
						</Grid>
						<Grid item>
							<Typography className={classes.text} variant="subtitle1">${price}.00</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
