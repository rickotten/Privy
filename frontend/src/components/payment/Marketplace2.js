import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Slide, Grid } from "@material-ui/core";
import NavigationBar from '../layout/NavigationBar2'
import MarketItem from "./MarketItem";
import NavBlocker from '../../util/NavBlocker'
import PaymentForm from './PaymentForm'

const useStyles = makeStyles((theme) => ({
	root: {
		// display: 'flex',
		height: '120vh',
		minWidth: '100'
	},
	containers: {
		// display: 'flex',
		// flexDirection: 'column',
		// justifyContent: 'center',
		margin: 'auto',
		width: '100%',
		height: '100%',
		background: 'none',
	},
	itemCards: {
		height: '80%',
		display: 'flex',
		justifyContent: 'space-around',
		flexDirection: 'column'
	}
}))
export function Marketplace({
}) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<NavigationBar authenticated />
			<NavBlocker />
			<Grid direction='row' container spacing={10} className={classes.containers}>
				<Grid item xs={6}>
					<Grid direction='column' container spacing={3}>
						<Grid item>
							<Slide direction="up" in={true} timeout={1000} mountOnEnter unmountOnExit>
								<div>
									<MarketItem id='1022318' name="PS5" description="Newest generation of consoles!" price={800} image="/static/images/ps5.png" stars={5} />
								</div>
							</Slide>
						</Grid>
						<Grid item>
							<Slide direction="up" in={true} timeout={1000} mountOnEnter unmountOnExit>
								<div>
									<MarketItem id='1021118' name="Beach House" description="Beautiful home in California with a gorgeous beach-side view. Price listed as rent per month" price={3000} image="/static/images/house.jpg" stars={5} />
								</div>
							</Slide>
						</Grid>
						<Grid item>
							<Slide direction="up" in={true} timeout={1000} mountOnEnter unmountOnExit>
								<div>
									<MarketItem id='1022318' name="Lawn Mower" description="Used Lawn Mower for sale" price={800} image="/static/images/lawnmower.png" stars={3} />
								</div>
							</Slide>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<PaymentForm />
				</Grid>
			</Grid>

		</div>
	)
}


export default Marketplace