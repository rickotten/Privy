import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
		backgroundImage: "url(../../static/images/background.jpg)",
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	},
	altBackground: {
		minHeight: '100vh',
		backgroundImage: "url(../../static/images/galaxy.jpg)",
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	}
}))
export function ThemeSelector({
	user,
	children
}) {
	const classes = useStyles();

	var root_class = classes.root;
	try {
		const use_dark_background = user.settings.dark_mode;
		root_class = use_dark_background ? classes.altBackground : classes.root
	} catch (error) {
		console.log("No settings")
	}

	return (
		<div className={root_class}>
			{children}
		</div>
	)
}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps)(ThemeSelector)
