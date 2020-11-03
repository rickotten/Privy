import React, { Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types'
import LikeButton from '../../util/LikeButton'
import CommentForm from './CommentForm';
import Comment from './Comment';

const useStyles = theme => ({
    root: {
        width: "35vw"
    },
    media: {
        // height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(0deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});


export class UserPost2 extends Component {

    static propTypes = {
        tempContent: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired
    }

    addCommentOnPost = (username, comment) => {
        this.setState({ comments: [...this.state.comments, <Comment key={comment} authorName={username} comment={comment} />]});
        
    }

    state = {
        redirect: null,
        expanded: false,
        comments: this.props.post.comments.map(
            (comment, i) => (<Comment key={comment.id} authorName={comment.author} comment={comment.comment} />))
    }


    toggleCommentForm = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        dayjs.extend(relativeTime);
        const { expanded, comments } = this.state;
        const {
            classes,
            tempContent: {
                createdAt,
                userImage
            },
            post
        } = this.props;

        const avatar = <a href={"#profile/" + this.props.post.author}>
                                    <Avatar aria-label="profile" className=    {classes.avatar}>
                                                    {this.props.post.author.toUpperCase().charAt(0)}
                                    </Avatar>
                                </a>

        if (this.state.redirect) {
            return this.state.redirect;
        }
        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={avatar}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="A Creative Title"
                    subheader={dayjs(createdAt).fromNow()}
                />
                <CardMedia
                    className={classes.media}
                    image={userImage}
                    title="Post Image"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing >

                    <LikeButton post={post} postId={post.id} />

                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={this.toggleCommentForm}
                        aria-expanded={expanded}
                        aria-label="show comments"
                    >
                        <CommentIcon />
                    </IconButton>
                    <span>{comments.length} comments</span>

                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <CommentForm addCommentOnPost={this.addCommentOnPost} postId={post.id} />
                        {comments.slice().reverse()}
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

export default withStyles(useStyles)(UserPost2);
