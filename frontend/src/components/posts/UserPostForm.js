import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import { create_user_post} from '../../actions/posts';
import NavigationBar from '../layout/NavigationBar';

export class UserPostForm extends Component {
    state = {
        text_post: '',
        media: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        create_user_post: PropTypes.func.isRequired
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.create_user_post(this.state.text_post, this.state.media); 
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });


    //What is rendered for the user
    render() {
        const { text_post, media } = this.state;
        return (
            <div className="form-group">
                <NavigationBar/>
                    <h2 className="text-center">Create a Post</h2>
                    <form onSubmit={this.onSubmit}>
                        {/* The text for the user's post */}

                                <Form.Group controlId="exampleForm.ControlInput1">
                                    
                                    <Form.Control type="text" placeholder="What do you want to say?"
                                        type="text"
                                        name="text_post"
                                        onChange={this.onChange}
                                        value={text_post} />

                                </Form.Group>

                                <Form.Group>
                                    <Form.File label="Want to Attach a File?" 
                                    type="file"
                                    name="media"
                                    onChange={this.onChange}
                                    value={media}
                                    />
            
                                    
                                </Form.Group>

                                <a href = "/">
                                    <button type="submit" className="btn btn-info btn-sm text-light">Create Post</button>
                                </a>
                    </form>
                </div>
        )
    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { create_user_post })(UserPostForm)
