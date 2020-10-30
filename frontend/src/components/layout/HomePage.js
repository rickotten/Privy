import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import Grid from '@material-ui/core/Grid';
import User from '../user/User';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import UserPost2 from "../posts/UserPost";

export class HomePage extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        posts: PropTypes.object.isRequired
    }

    userPosts = [];

    populatePosts = () => {
        if (this.props.posts.postsLoading) {
            return;
        }
        this.userPosts = [];
        const tempContent = {
            createdAt: "2020-01-31T12:59-0500",
            userImage: "/static/images/no-img.png"
        };
        const { _, userPosts } = this.props.posts;
        if (userPosts) {
            userPosts.forEach(post => {
                this.userPosts.push(<Grid key={post.id} item>
                    <UserPost2 key={post.id} tempContent={tempContent} post={post} />
                </Grid>);
            });
        }
    }

    render() {
        this.populatePosts();
        return (
            <div>
                <NavigationBar />
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="center">
                    {this.userPosts}
                </Grid>
                {/* <Jumbotron>
                    {this.userPosts}
                </Jumbotron> */}

                <User />
                {/* <CommentForm username={this.props.user["username"]}/> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    posts: state.posts,
})

export default connect(mapStateToProps)(HomePage)
