import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout, friendRequest } from '../../actions/auth';
import NavigationBar from '../layout/NavigationBar';

export class User extends Component {
    state = {
        friendUsername: "",
        username: this.props.auth.user.username
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
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h2>Follow a user</h2>
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="friendUsername"
                            onChange={this.onChange}
                            value={friendUsername}
                            size="20"
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
