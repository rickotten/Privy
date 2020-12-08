import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import { create_user_post } from '../../actions/posts';
import NavigationBar from '../layout/NavigationBar';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


export class UserPostForm extends Component {
    state = {
        text_post: '',
        media: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        create_user_post: PropTypes.func.isRequired,
        page_id: PropTypes.string, // optional page_id to post to
        reload: PropTypes.func.isRequired
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.create_user_post(this.state.text_post, this.state.media, this.props.page_id, this.props.reload);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onChangeImage = e => this.setState({ [e.target.name]: e.target.files[0] });


    //What is rendered for the user
    render() {
        const { text_post, media } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Grid>
                            <Paper>
                                <div className="form-group linedPaper">
                                    <form onSubmit={this.onSubmit}>
                                        {/* The text for the user's post */}

                                        <Form.Group controlId="exampleForm.ControlInput1">

                                            <Form.Control type="text" placeholder="What do you want to say?"
                                                type="text"
                                                name="text_post"
                                                onChange={this.onChange}
                                                value={text_post}
                                                style={{ height: 40 }} />

                                        </Form.Group>

                                        <Form.Group>
                                            <Form.File label="Attach a File:"
                                                type="file"
                                                name="media"
                                                onChange={this.onChangeImage}
                                            />
                                        </Form.Group>
                                        <div className="text-center">
                                        <a href="/">
                                            <button style={{ fontSize: 15, height: 35, width: 115 }} type="submit" className="btn btn-primary btn-success btn-lg">Post!</button>
                                        </a>
                                        </div>
                                    </form>
                                </div>
                            </Paper>
                        </Grid>
                    </div>
                    <div className="col-md-6">
                        <img src="..\static\images\pen_icon.png" alt="pen" width="90%" height="90%"></img>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { create_user_post })(UserPostForm)
