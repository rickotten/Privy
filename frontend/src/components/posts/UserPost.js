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
import ShareButton from './util/ShareButton';
import Box from '@material-ui/core/Box';
import { connect } from "react-redux";

const useStyles = theme => ({
    root: {
        // width: "67.75vw"
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
    text: {
        fontFamily: "Nunito",
    },
    commentsContainer: {
        display: 'flex',
        flexDirection: 'column',
    }
});


export class UserPost2 extends Component {

    static propTypes = {
        currentUser: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired,
        reload: PropTypes.func.isRequired
    }

    addCommentOnPost = (username, comment) => {
        this.setState({ comments: [...this.state.comments, <Comment key={comment} picture={this.props.currentUser.profile.profile_picture} authorName={username} comment={comment} />] });
    }

    state = {
        redirect: null,
        expanded: false,
        comments: this.props.post.comments.map(
            (comment, i) => (<Comment key={comment.id} authorName={comment.author} comment={comment.comment} picture={comment.profile_picture} />))
    }


    toggleCommentForm = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        dayjs.extend(relativeTime);
        const { expanded, comments } = this.state;
        const {
            classes,
            post
        } = this.props;
        const userImage = post.image;

        const avatar = <a href={"#profile/" + this.props.post.author}>
            <Avatar alt={this.props.post.author.toUpperCase().charAt(0)} aria-label="profile" className={classes.avatar} src={post.profile_picture}>
            </Avatar>
        </a>

        if (this.state.redirect) {
            return this.state.redirect;
        }
        const media = (userImage ? (<CardMedia
            className={classes.media}
            image={userImage}
            title="Post Image"
        />) : (<div></div>));

        const created_on = this.props.post.date_created ? this.props.post.date_created : "2020-01-31T12:59-0500";
        // <Card className={classes.root} style={{paddingbottom: 20}}>
        return (
            <Box width="100%"
                style={{ paddingTop: 10, paddingBottom: 10 }}
            >
                <Card>
                    <CardHeader className="post"
                        avatar={avatar}
                        action={
                            <ShareButton page_id={post.page} reload={this.props.reload} postAuthor={post.author} post_id={post.id} />
                        }
                        title={"Via " + post.author}
                        subheader={dayjs(created_on).fromNow()}
                    />
                    {media}
                    <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                            {post.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing className="post">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
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
                        </div>

                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent style={{ display: 'flex' }} className="post">
                            <CommentForm addCommentOnPost={this.addCommentOnPost} postId={post.id} />
                            <div style={{ display: 'flex', flexGrow: 2, justifyContent: 'center' }}>
                                <div className={classes.commentsContainer}>
                                    {comments}
                                </div>
                            </div>
                        </CardContent>
                    </Collapse>
                </Card>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.auth.user
})
export default connect(mapStateToProps)(withStyles(useStyles)(UserPost2));
