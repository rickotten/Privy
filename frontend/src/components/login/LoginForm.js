import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../../actions/auth';
import GoogleOAuth from '../oauth/GoogleOAuth';
import FacebookOAuth from '../oauth/FacebookOAuth';
import { get_user_posts } from "../../actions/posts";

export class LoginForm extends Component {
    state = {
        username: "",
        password: ""
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        get_user_posts: PropTypes.func.isRequired
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            /* 
            Update state before the HomePage component loads. That way, it is guranateed this action will 
            fire and reduce to update the state before the state is loaded immutably into the HomePage 
            component.
            */
            this.props.get_user_posts();
            return <Redirect to="/" />;
        }
        const { username, password } = this.state;
        return (
            <div className="col-md-6 m-auto" >
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                        <p>
                            <GoogleOAuth/>
                        </p>
                        <p>
                            <FacebookOAuth/>
                        </p>
                        <p>
                            Forgot your username or password? <Link to="/forgot">Forgot</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login, get_user_posts })(LoginForm)
