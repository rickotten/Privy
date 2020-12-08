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
import NavigationBar from "../layout/NavigationBar"
import { MembersButton } from "../pages/PageHeader";
import Badge from '@material-ui/core/Badge';

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 1200,
        // backgroundColor: theme.palette.background.paper,
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
            showEmail: true,
            following: false,
            followers: [],
            followingUsers: []
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
                this.ifAlreadyFriends()
            }).catch(err => {
                console.log(err);
            });
        axios.get(`/getsocialcircle/${this.props.match.params.username}`, config)
            .then(res => {
                this.setState({ followers: res.data.followers, followingUsers: res.data.following})
            }).catch(err => {
                console.log(err);
            })
    }

    ifAlreadyFriends = () => {
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
        const friendUsername = this.props.match.params.username;
        const body = JSON.stringify({ friendUsername });
        axios.post(`/alreadyfriends`, body, config)
            .then(res => {
                if (res.data) {
                    this.setState({ following: true })
                } else {
                    this.setState({ following: false })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    follow = () => {
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
        const username = this.props.auth.user.username;
        const friendUsername = this.props.match.params.username;
        const body = JSON.stringify({ username, friendUsername });

        if (this.state.following) {
            this.setState({ following: false })
        } else {
            axios.post('/api/auth/friendRequest', body, config)
                .then(res => {
                    this.setState({ following: true })
                })
        }
    }

    ifAlreadyFriends = () => {
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
        const friendUsername = this.props.match.params.username;
        const body = JSON.stringify({ friendUsername });
        axios.post(`/alreadyfriends`, body, config)
            .then(res => {
                if (res.data) {
                    this.setState({ following: true })
                } else {
                    this.setState({ following: false })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    follow = () => {
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
        const username = this.props.auth.user.username;
        const friendUsername = this.props.match.params.username;
        const body = JSON.stringify({ username, friendUsername });

        if (this.state.following) {
            this.setState({ following: false })
        } else {
            axios.post('/api/auth/friendRequest', body, config)
                .then(res => {
                    this.setState({ following: true })
                })
        }
    }

    render() {
        const {username, profilePicture, email, bio, createdAt, showEmail, following, followers, followingUsers } = this.state;
        const classes = this.props.classes;

        return (
            <div className="col-md-18 m-auto">
                <NavigationBar/>
                <div className="card card-body">
                    <div>
                    <Avatar alt={username.toUpperCase()} className={classes.profilePicture} src={profilePicture} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Badge badgeContent={followers.length} color="primary">
                                <MembersButton
                                    menuLabel={"Followers"}
                                    members={followers}
                                />
                            </Badge>
                            <Badge badgeContent={followingUsers.length} color="primary">
                                <MembersButton
                                    menuLabel={"Following"}
                                    members={followingUsers}
                                />
                            </Badge>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {(this.props.auth.user.username !== username) && <button onClick={this.follow} style= {{fontSize:15, height:50, width:150}} className="btn btn-primary">{following ? "Following" : "Follow"}</button>}
                        </div>
                        
                    </div>
                    <List className={classes.root}>
                        <ListItem className="goldenBackground">
                            <ListItemAvatar>
                                <Avatar>
                                    <FaceIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="textColor" primary={username} secondary="Username" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <Divider variant="inset" component="li" />
                        {showEmail && (<ListItem className="goldenBackground">
                            <ListItemAvatar>
                                <Avatar>
                                    <AlternateEmailIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="textColor" primary={email} secondary="User Email" />
                        </ListItem>)}
                        <Divider variant="inset" component="li" />
                        <ListItem className="goldenBackground">
                            <ListItemAvatar>
                                <Avatar>
                                    <AccessTimeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="textColor" primary={createdAt} secondary="Member since" />
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