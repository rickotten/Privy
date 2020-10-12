import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { google_oauth } from '../../actions/auth';

export class GoogleOAuth extends Component {
    static propTypes = {
        google_oauth: PropTypes.func.isRequired
    }

    responseGoogle = (response) => {
        this.props.google_oauth(response['accessToken']);
    }

    render() {
        return (
            <GoogleLogin
                clientId="449793272806-rmmuu0tqqflvroe6r09bbul8e6scndbq.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        )
    }
}

export default connect(null,  { google_oauth })(GoogleOAuth)