import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { google_oauth } from '../../actions/auth';

export class GoogleOAuth extends Component {
    static propTypes = {
        google_oauth: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    responseGoogle = (response) => {
        this.props.google_oauth(response['accessToken']);
    }

    render() {
        if (!this.props.isAuthenticated) {
            return (
                <GoogleLogin
                    // DEPCRECATED CLIENT_ID
                    // clientId="449793272806-rmmuu0tqqflvroe6r09bbul8e6scndbq.apps.googleusercontent.com"
                    clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}
                    buttonText="Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            )
        }
        return null
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { google_oauth })(GoogleOAuth)