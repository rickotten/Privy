import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/errors';
import GoogleOAuth from '../oauth/GoogleOAuth';
import FacebookOAuth from '../oauth/FacebookOAuth';

export class RegistrationForm extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (password !== password2) {
            this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
        } else {
            const newUser = {
                username,
                email,
                password
            }
            this.props.register(newUser);
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        const { username, email, password, password2 } = this.state;
        return (
            <div className="container noBackgroundPattern">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <img src="..\static\images\register_icon.png" alt="register icon" width="110%" height="60%"></img>
                    </div>
                    <div className="col-md-6 m-auto">
                        <div className="card card-body mt-5">
                            <h2 className="text-center">Register for Privy!</h2>
                            <form onSubmit={this.onSubmit}>
                                {/* email, username, password*/}
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        onChange={this.onChange}
                                        value={email}
                                    />
                                </div>
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
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password2"
                                        onChange={this.onChange}
                                        value={password2}
                                    />
                                </div>

                                {/* security questions */}
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Security Question 1
                        </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">What is you mother's maiden name?</a>
                                        <a className="dropdown-item" href="#">What city were you born in?</a>
                                        <a className="dropdown-item" href="#">What is your favorite movie?</a>
                                        <a className="dropdown-item" href="#">What year did you finish high school?</a>
                                        <a className="dropdown-item" href="#">What is your favorite food?</a>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="answer1Input">Answer 1</label>
                                        <input type="answer" className="form-control" id="answer1Input" />
                                    </div>
                                </div>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Security Question 2
                        </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">What is you mother's maiden name?</a>
                                        <a className="dropdown-item" href="#">What city were you born in?</a>
                                        <a className="dropdown-item" href="#">What is your favorite movie?</a>
                                        <a className="dropdown-item" href="#">What year did you finish high school?</a>
                                        <a className="dropdown-item" href="#">What is your favorite food?</a>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="answer2Input">Answer 2</label>
                                        <input type="answer" className="form-control" id="answer2Input" />
                                    </div>
                                </div>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Security Question 3
                        </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">What is you mother's maiden name?</a>
                                        <a className="dropdown-item" href="#">What city were you born in?</a>
                                        <a className="dropdown-item" href="#">What is your favorite movie?</a>
                                        <a className="dropdown-item" href="#">What year did you finish high school?</a>
                                        <a className="dropdown-item" href="#">What is your favorite food?</a>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="answer3Input">Answer 3</label>
                                        <input type="answer" className="form-control" id="answer3Input" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-success btn-lg btn-primary">Register!</button>
                                </div>
                                <br />
                                <p className="text-center">
                                    Already have an account? <Link className="linkColor" to="/login">Login</Link>
                                </p>
                                <p className="text-center">
                                    <GoogleOAuth /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <FacebookOAuth />
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, createMessage })(RegistrationForm)
