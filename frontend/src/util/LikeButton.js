import React, { Component } from 'react';
import MyButton from './MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
// import { likeScream, unlikeScream } from '../../redux/actions/dataActions';
import { update_user_post } from "../actions/posts";

export class LikeButton extends Component {
    // likedScream = () => {
    //     if (
    //         this.props.user.likes &&
    //         this.props.user.likes.find(
    //             (like) => like.screamId === this.props.screamId
    //         )
    //     )
    //         return true;
    //     else return false;
    // };
    // likeScream = () => {
    //     this.props.likeScream(this.props.screamId);
    // };
    // unlikeScream = () => {
    //     this.props.unlikeScream(this.props.screamId);
    // };
    
    static propTypes = {
        update_user_post: PropTypes.func.isRequired,
        post: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        userId: PropTypes.number.isRequired
    }

    state = {
        liked: this.props.post.usersLiked.reduce(
            (accumulator, user) => accumulator || (user.id === this.props.userId),false),
        likesCount: this.props.post.likesCount
    }

    // alreadylikedByUser() > {
    //     for (const user in this.props.post.usersLiked) {
    //         if (user.id === this.props.userId) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    likedScream = () => {
        return this.state.liked
    }

    likeScream = () => {
        this.setState({ liked: true });
        const updatedPost = {
            ...this.props.post,
            likesCount: (this.props.post.likesCount + 1),
            usersLiked: [...this.props.post.usersLiked, {"id": this.props.userId}]
        }
        this.setState({ likesCount: this.state.likesCount + 1 });
        this.props.update_user_post(updatedPost);
    }

    unlikeScream = () => {
        this.setState({ liked: false });
        const updatedPost = {
            ...this.props.post,
            likesCount: (this.props.post.likesCount - 1),
            usersLiked: this.props.post.usersLiked.filter((user, i) => {
                return this.props.userId !== user.id
            })
        }
        this.setState({ likesCount: this.state.likesCount - 1 });
        this.props.update_user_post(updatedPost);
    }

    render() {

        const authenticated = this.props.isAuthenticated;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorder color="primary" />
                </MyButton>
            </Link>
        ) : this.likedScream() ? (
            <MyButton tip="Undo like" onClick={this.unlikeScream}>
                <FavoriteIcon color="primary" />
            </MyButton>
        ) : (
                    <MyButton tip="Like" onClick={this.likeScream}>
                        <FavoriteBorder color="primary" />
                    </MyButton>
                );

        return <div>
                {likeButton}
                <span>{this.state.likesCount} Likes</span>
            </div>;
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.user.id
})

export default connect(mapStateToProps, { update_user_post })(LikeButton);