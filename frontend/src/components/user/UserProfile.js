import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
// MUI Icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import NoteIcon from '@material-ui/icons/Note';
import FaceIcon from '@material-ui/icons/Face';
import { connect } from "react-redux";
import NavigationBar from '../layout/NavigationBar';
import IconButton from '@material-ui/core/IconButton';
import User from './User';

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 1200,
        backgroundColor: theme.palette.background.paper,
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    profilePicture: {
        margin: "auto",
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
});

export class UserProfile extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    }

    state = {
        username: this.props.user.username,
        profilePicture: "/static/images/penguin.jpg",
        email: this.props.user.email,
        bio: "Here's a simple bio",
        createdAt: dayjs("2020-10-12T20:01:10.560000Z").format("dddd, MMMM D YYYY"),
        postCount: 5,
        friendsCount: 10
    }

    render() {
        const {username, profilePicture, email, bio, createdAt, postCount, friendsCount} = this.state;
        const classes = this.props.classes;
        return (
            <div className="col-md-18 m-auto">
                <NavigationBar/>
                <div className="card card-body">
                    <div className="card card-body">
                        <User/>
                    </div>
                    <Avatar alt="Richard" className={classes.profilePicture} src={profilePicture} />
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FaceIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={username} secondary="Username" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <NoteIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={bio} secondary="Bio" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AlternateEmailIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email} secondary="User Email" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccessTimeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={createdAt} secondary="Member since" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PostAddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={postCount} secondary="Number of Posts" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EmojiPeopleIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={friendsCount} secondary="Followers" />
                        </ListItem>
                    </List>
                </div>
                
            </div>
            
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfile));