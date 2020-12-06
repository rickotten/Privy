import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'

const LightTheme = React.lazy(() => import('./LightMode'))
const DarkTheme = React.lazy(() => import('./DarkMode'))

export class ThemeSelector extends Component {
	static propTypes = {
		dark_mode: PropTypes.bool.isRequired,
		children: PropTypes.object.isRequired
	}
	render() {
		const { dark_mode, children } = this.props;
		console.log(dark_mode)
		return (
				<>
					<React.Suspense fallback={<></>}>
						{dark_mode ? <DarkTheme /> : <LightTheme />}
					</React.Suspense>
					{children}
				</>)
	}
}

const mapStateToProps = state => ({
	dark_mode: (state.auth.user ? state.auth.user.settings.dark_mode : false)
})

export default connect(mapStateToProps)(ThemeSelector);
