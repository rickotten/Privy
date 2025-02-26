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
import { like_user_post } from "../actions/posts";

export class LikeButton extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        currentUser: PropTypes.object.isRequired,
        like_user_post: PropTypes.func.isRequired
    }

    state = {
        liked: this.props.post.usersLiked.reduce(
            (accumulator, username) => accumulator || (username === this.props.currentUser.username),false),
        likesCount: this.props.post.likesCount
    }

    likedScream = () => {
        return this.state.liked
    }

    likeScream = () => {
        this.setState({ liked: true, likesCount: this.state.likesCount + 1 });
        this.props.like_user_post(this.props.currentUser.id, this.props.post.id);
    }

    unlikeScream = () => {
        this.setState({ liked: false, likesCount: this.state.likesCount - 1 });
        this.props.like_user_post(this.props.currentUser.id, this.props.post.id);
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
    currentUser: state.auth.user
})

export default connect(mapStateToProps, { like_user_post })(LikeButton);