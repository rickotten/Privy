import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { facebook_oauth } from '../../actions/auth';

export class FacebookOAuth extends Component {
    static propTypes = {
        facebook_oauth: PropTypes.func.isRequired
    }

    responseFacebook = (response) => {
        this.props.facebook_oauth(response.accessToken);
    }

    render() {
        return (
            <FacebookLogin
                // DEPECRECATED EXPOSED KEY
                // appId="4397489906992106"
                appId={process.env.FACEBOOK_KEY}
                textButton="Facebook"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook}
                size="small" />
        )
    }
}

export default connect(null, { facebook_oauth })(FacebookOAuth)