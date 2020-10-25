import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { create_user_post} from '../../actions';

export class UserPost extends Component {
    state = {
        text_post: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        const text_post = {
            text_post
        }
        this.props.textPost(text_post); 
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    //What is rendered for the user
    render() {
        const { text_post } = this.state;
        return (
            <div className="col-md-6 m-auto">
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
                            <Button type="submit">Post</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    text_post: PropTypes.func.isRequired
})

export default connect(mapStateToProps, { create_user_post })(UserPostForm)
