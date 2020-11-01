import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from 'react';
import { create_user_post} from '../../actions/posts';
import NavigationBar from '../layout/NavigationBar';

export class UserPostForm extends Component {
    state = {
        text_post: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        create_user_post: PropTypes.func.isRequired
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.create_user_post(this.state.text_post); 
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    //What is rendered for the user
    render() {
        const { text_post } = this.state;
        return (
            
            <div className="col-md-6 m-auto">
                <NavigationBar/>
                <div className="card card-body mt-5">
                    <h2 className="text-center">Create a Post</h2>
                    <form onSubmit={this.onSubmit}>
                        {/* The text for the user's post */}
                        <div className="form-group">
                            <label>Status</label>
                            <input
                                type="text"
                                name="text_post"
                                onChange={this.onChange}
                                value={text_post}
                            />
                            <button type="submit">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { create_user_post })(UserPostForm)
