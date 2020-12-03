import axios from 'axios';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types'
import dayjs from 'dayjs';
// MUI Icons
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import NoteIcon from '@material-ui/icons/Note';
import FaceIcon from '@material-ui/icons/Face';
import { connect } from "react-redux";

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
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

export class ArbitraryUserProfile extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            username: "loading....",
            profilePicture: "/static/images/penguin.jpg",
            email: "loading...",
            bio: "Here's a simple bio",
            createdAt: "Loading...",
            postCount: 5,
            friendsCount: 10,
            showEmail: true
        }
    }

    componentDidMount() {
        this.lookUpProfile();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.username !== prevProps.match.params.username) {
            this.lookUpProfile();
        }
    }

    lookUpProfile = () => {
        // Code below taken from auth.js action
        const token = this.props.auth.token;
        // Headers 
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        // If token, add to headers config
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        axios.get(`/profiles/${this.props.match.params.username}`, config)
            .then(res => {
                this.setState({
                    username: res.data.user.username,
                    email: res.data.user.email,
                    createdAt: dayjs(res.data.user.date_joined).format("dddd, MMMM D YYYY"),
                    profilePicture: res.data.user.profile ? res.data.user.profile.profile_picture : "/static/images/penguin.jpg",
                    showEmail: res.data.user.settings ? res.data.user.settings.show_email_on_profile : true
                })
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const { username, profilePicture, email, bio, createdAt, postCount, friendsCount } = this.state;
        const classes = this.props.classes;
        const emailElem = this.state.showEmail ? (<ListItem>
            <ListItemAvatar>
                <Avatar>
                    <AlternateEmailIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} secondary="User Email" />
        </ListItem>) : <div></div>
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <Avatar alt="R" className={classes.profilePicture} src={profilePicture} />
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <FaceIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={username} secondary="Username" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <NoteIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={bio} secondary="Bio" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        {emailElem}
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
                                    <EmojiPeopleIcon />
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

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(ArbitraryUserProfile));