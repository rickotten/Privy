import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	title: {
		fontSize: 14,
		fontStyle: 'italic',
		fontFamily: "Nunito",
	},
	header: {
		width: '100%',
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'space-around',
		fontFamily: "Nunito",
	},
	subHeader: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	review: {
		paddingLeft: 10,
		flexGrow: 2,
		fontFamily: "Nunito",
	}
});

export default function MockReviewCard({
	author,
	review,
	starCount
}) {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent className={classes.header}>
				<Avatar alt="Remy Sharp" src={`/static/images/${author}.jpg`} />
				<div className={classes.subHeader}>
					<Typography className={classes.title} color="textSecondary" gutterBottom>
						Review from {author}
					</Typography>
					<Rating name="read-only" value={starCount} readOnly />
				</div>

				<Typography className={classes.review} variant="body2" component="p">
					"{review}"
				</Typography>
			</CardContent>
		</Card>
	);
}