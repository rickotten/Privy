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
        //login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        console.log("EMAIL: " + this.state.email);
        this.props.forgot(this.state.email);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            console.log("forgot authenticaded");
            return <Redirect to="/register" />;
        }
        const { email, answer1, answer2, answer3 } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
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
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Email one-time password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { forgot })(ForogtCredentialsForm)
