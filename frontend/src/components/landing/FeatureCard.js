import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		maxWidth: '40%',
		background: "rgba(0,0,0,0.5)",
		margin: '20px'
	},
	media: {
		height: 240,
	},
	title: {
		fontFamily: "Nunito",
		fontWeight: "bold",
		fontSize: "2rem",
		color: '#fff',
	},
	description: {
		fontFamily: "Nunito",
		fontSize: "1.1rem",
		color: '#ddd',
	}
});

export default function FeatureCard({
	image,
	title,
	description
}) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				image={image}
				title={title}
			/>
			<CardContent>
				<Typography
					gutterBottom
					component="h1"
					className={classes.title}>
					{title}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
}