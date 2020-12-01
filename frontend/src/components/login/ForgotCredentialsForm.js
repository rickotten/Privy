import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { forgot } from '../../actions/auth';


export class ForogtCredentialsForm extends Component {
    state = {
        email: ""
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        console.log("EMAIL: " + this.state.email);

        // send this to forgot request in actions/auth.js
        this.props.forgot(this.state.email);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { email, answer1, answer2, answer3 } = this.state;
        return (
            <div className="containter noBackgroundPattern">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <img src="..\static\images\forgot_icon.png" alt="login outhouse" width="80%" height="80%"></img>
                    </div>
                    <div className="col-md-6 m-auto">
                        <div className="lightBlueCard card-body mt-5">
                            <h2 className="text-center">Forgot Credentials</h2>
                            <form onSubmit={this.onSubmit}>
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
                                    <label>Security Question 1</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="answer1"
                                        onChange={this.onChange}
                                        value={answer1}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Security Question 2</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="answer2"
                                        onChange={this.onChange}
                                        value={answer2}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Security Question 3</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="answer3"
                                        onChange={this.onChange}
                                        value={answer3}
                                    />
                                </div>
                                <div className="form-group text-center">
                                    <button type="submit" className="btn btn-success btn-lg btn-primary">
                                        Email one-time password
                                    </button>
                                </div>
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

export default connect(mapStateToProps, { forgot })(ForogtCredentialsForm)
