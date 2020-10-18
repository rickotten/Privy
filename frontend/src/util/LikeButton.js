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
    liked = false;

    likedScream = () => {
        return this.liked;
    }

    likeScream = () => {
        console.log('like');
        this.liked = true;
        console.log(this.liked);
    }

    unlikeScream = () => {
        console.log('unlike');
        this.liked = false;
    }
    render() {
        // const { authenticated } = this.props.user;
        // const likeButton = !authenticated ? (
        //     <Link to="/login">
        //         <MyButton tip="Like">
        //             <FavoriteBorder color="primary" />
        //         </MyButton>
        //     </Link>
        // ) : this.likedScream() ? (
        //     <MyButton tip="Undo like" onClick={this.unlikeScream}>
        //         <FavoriteIcon color="primary" />
        //     </MyButton>
        // ) : (
        //             <MyButton tip="Like" onClick={this.likeScream}>
        //                 <FavoriteBorder color="primary" />
        //             </MyButton>
        //         );
        const likeButton = this.likedScream() ? (
            <MyButton tip="Undo like" onClick={this.unlikeScream}>
                 <FavoriteIcon color="primary" />
             </MyButton>
        ) : (
            <MyButton tip="Like" onClick={this.likeScream}>
                <FavoriteBorder color="primary" />
            </MyButton>
        )
        return likeButton;
    }
}

LikeButton.propTypes = {
    // user: PropTypes.object.isRequired,
    postId: PropTypes.number.isRequired
    // likeScream: PropTypes.func.isRequired,
    // unlikeScream: PropTypes.func.isRequired
};

// const mapStateToProps = (state) => ({
//     user: state.user
// });

// const mapActionsToProps = {
//     likeScream,
//     unlikeScream
// };

export default connect(null)(LikeButton);