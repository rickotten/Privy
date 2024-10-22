import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { comment_on_post } from "../../actions/posts";
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

export class CommentForm extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        postId: PropTypes.number.isRequired,
        comment_on_post: PropTypes.func.isRequired,
        addCommentOnPost: PropTypes.func.isRequired // Not a redux function. This is passed in from the parent component (Post containing this)
    }

    state = {
        comment: null
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.addCommentOnPost(this.props.user["username"], this.state.comment);
        this.props.comment_on_post(this.props.user["id"], this.props.postId, this.state.comment);
    }

    onChange = e => this.setState({ comment: e.target.value });

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Form style={{ display: 'flex' }} onSubmit={this.onSubmit}>
                    <Form.Group controlId="commentForm">
                        <Form.Label className="textColor">Comment</Form.Label>
                        <Form.Control style={{ width: '100%' }} className="textField" type="text" placeholder="Type your comment..." onChange={this.onChange} />
                    </Form.Group>
                    <IconButton type="submit" size='small'>
                        <SendIcon />
                    </IconButton>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { comment_on_post })(CommentForm)
