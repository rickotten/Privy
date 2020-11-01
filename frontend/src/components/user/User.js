import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout, friendRequest } from '../../actions/auth';
import NavigationBar from '../layout/NavigationBar';

export class User extends Component {
    state = {
        friendUsername: "",
        username: ""
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    onSubmit = e => {
        e.preventDefault();

        // send this to forgot request in actions/auth.js
        this.props.friendRequest(this.state.username, this.state.friendUsername);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { isAuthenticated, user, friendUsername } = this.props.auth
        return (
            <div>
<<<<<<< HEAD
                {/* <NavigationBar /> */}
                <h2>Hello you are logged in as {user['username']}</h2>
                <button onClick={this.props.logout} className="btn btn-info btn-sm text-light">Logout</button>
                
                {/*variable assignmen*/this.state.username = user['username']}
                
=======
                <NavigationBar /> 

>>>>>>> Added functionality to the navigation bar
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Friend's username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="friendUsername"
                            onChange={this.onChange}
                            value={friendUsername}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Send friend request
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout, friendRequest })(User)
