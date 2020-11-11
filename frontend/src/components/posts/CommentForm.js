import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { comment_on_post } from "../../actions/posts";

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
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="commentForm">
                    <Form.Label>Comment</Form.Label>
                    <Form.Text className="text-muted">
                        Hello {this.props.user.username}! What would you like to say?
                    </Form.Text>
                    <Form.Control type="text" placeholder="Comment" onChange={this.onChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, { comment_on_post })(CommentForm)
