import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import FeatureCard from './FeatureCard';
import useWindowPosition from '../../util/useWindowPosition';
import { Collapse } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	row: {
		display: 'flex',
		justifyContent: 'center'
	}
}))
export default function Features() {
	const classes = useStyles();
	const checked = useWindowPosition('header');

	const descriptions = {
		security: "We take user privacy very seriously at PrivySocial. Your data is securely encrypted in our databases. We do not perform any data selling of any kind nor do we implore the use of personalized ads. Registering is as simple as creating a username, and we do not require verification on your end. However, we do support logging in via Facebook and Google.",

		messaging: "We provide a fully functional chat solution that does not communicate any of your data with any outside services. Your messages are fully process by our services without any third party providers. Start a chat or group chat with friends today!",

		posts: "Share your thoughts with other users as you create posts about anything that comes to mind. You may also create communities with other users via our Pages. Create a page today with a theme, and users can posts freely!",

		crypto: "Because we do not sell your data nor emplore the use of ads, our operational costs are supported via our crypto currency PrivyCoin. Post items on the market to sell, and your transaction dollar value will be converted to our PrivyCoin! Sellers can hold on to PrivyCoins or cash out if they desire!"
	}
	return (

		<div className={classes.root} id="places-to-visit">
			<Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
				<div className={classes.row}>
					<FeatureCard
						image={'/static/images/security-lock.jpeg'}
						title={"Security"}
						description={descriptions.security}
						checked={checked}
					/>
					<FeatureCard
						image={'/static/images/userchat.jpg'}
						title={"Custom Chat Solution"}
						description={descriptions.messaging}
						checked={checked}
					/>
				</div>
				<div className={classes.row}>
					<FeatureCard
						image={'/static/images/messages.jpg'}
						title={"Freedom to Speak"}
						description={descriptions.posts}
						checked={checked}
					/>
					<FeatureCard
						image={'/static/images/cryptocoins.jpg'}
						title={"PrivyCoins"}
						description={descriptions.crypto}
						checked={checked}
					/>
				</div>
			</Collapse>
		</div>

	)
}
