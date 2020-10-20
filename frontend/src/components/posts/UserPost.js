import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import LikeButton from '../../util/LikeButton';
//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200,
        minHeight: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

export class UserPost extends Component {
    static propTypes = {
        tempContent: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired
    }

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            tempContent: {
                createdAt,
                userImage,
                commentCount
            },
            post
        } = this.props;

        const deleteButton = <h3>title</h3>

        return(
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${post.author}`}
                        color="primary"
                    >
                        {post.author}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{post.description}</Typography>
                    <LikeButton post={post} postId={post.id} />
                    <MyButton tip="comments">
                            <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} comments</span>
                    {/* <ScreamDialog
                            screamId={screamId}
                            userHandle={userHandle}
                            openDialog={this.props.openDialog}
                        /> */}
                </CardContent>
            </Card>
        )
    }
}


export default connect(null)(withStyles(styles)(UserPost));


