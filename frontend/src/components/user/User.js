import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { NavigationBar } from '../layout/NavigationBar';

export class User extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }
    render() {
        const { isAuthenticated, user } = this.props.auth
        return (
            <div>
                <NavigationBar />
                <h2>Hello you are logged in as {user['username']}</h2>

                <button onClick={this.props.logout} className="btn btn-info btn-sm text-light">Logout</button>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(User)
