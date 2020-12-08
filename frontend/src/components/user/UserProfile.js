import axios from 'axios';
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
import Badge from '@material-ui/core/Badge';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import NoteIcon from '@material-ui/icons/Note';
import FaceIcon from '@material-ui/icons/Face';
import { connect } from "react-redux";
import NavigationBar from '../layout/NavigationBar';
import IconButton from '@material-ui/core/IconButton';
import { MembersButton } from "../pages/PageHeader";
import UserTimeline from "../layout/UserTimeline2";

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
    wrapperLabel: {
        margin: "auto"
    },
    input: {
        // margin:'auto',
        display: 'none'
    }
});

export class UserProfile extends Component {
    static propTypes = {
        token: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    }

    state = {
        username: this.props.user.username,
        profilePicture: this.props.user.profile ? this.props.user.profile.profile_picture : "/static/images/penguin.jpg",
        email: this.props.user.email,
        // bio: "Here's a simple bio",
        createdAt: dayjs("2020-10-12T20:01:10.560000Z").format("dddd, MMMM D YYYY"),
        followers: [],
        following: [],
        reload: false
    }
    
    componentDidMount = () => {
        const token = this.props.token;
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

        axios.get(`/getsocialcircle/${this.props.user.username}`, config)
            .then(res => {
                this.setState({ followers: res.data.followers, following: res.data.following })
            }).catch(err => {
                console.log(err);
            })
    }

    // onChangeImage = e => this.setState({ [e.target.name]: e.target.files[0] });
    onChangeImage = e => {
        // this.setState({ [e.target.name]: e.target.files[0] });
        this.update_profile_picture(e.target.files[0]);
    }

    update_profile_picture = (media) => {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            }
        }
        let form_data = new FormData();
        form_data.append('image', media);

        axios.post(`/updateProfilePicture`, form_data, config)
            .then(res => {
                this.setState({ profilePicture: res.data.profile_picture, reload: true })
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        const {username, profilePicture, email, bio, createdAt, followers, following, reload} = this.state;
        const classes = this.props.classes;
        return (
            <div className="col-md-18 m-auto">
                <NavigationBar/>
                <div className="card card-body">
                    <input
                        name="uploadMedia"
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        onChange={this.onChangeImage}
                        multiple
                        type="file"
                    />
                    <label className={classes.wrapperLabel} htmlFor="contained-button-file" style={{display: 'flex', flexDirection: 'column'}}>
                        <IconButton component="span">
                            <Badge badgeContent={'edit'} color="primary">
                                <Avatar alt={username.toUpperCase().charAt(0)} className={classes.profilePicture} src={profilePicture} />
                            </Badge>
                        </IconButton>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Badge badgeContent={followers.length} color="primary">
                                <MembersButton
                                    menuLabel={"Followers"}
                                    members={followers}
                                />
                            </Badge>
                            <Badge badgeContent={following.length} color="primary">
                                <MembersButton
                                    menuLabel={"Following"}
                                    members={following}
                                />
                            </Badge>
                        </div>
                    </label>

                    <List className={classes.root}>
                        <ListItem className="goldenBackground">
                            <ListItemAvatar>
                                <Avatar>
                                    <FaceIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="textColor" primary={username} secondary="Username" />
                        </ListItem>
                        <ListItem className="lightYellowBackground">
                            <ListItemAvatar>
                                <Avatar>
                                    <AlternateEmailIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="textColor" primary={email} secondary="User Email" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem className="goldenBackground">
                            <ListItemAvatar>
                                <Avatar>
                                    <AccessTimeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="textColor" primary={createdAt} secondary="Member since" />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>
                </div>
                {reload && <UserTimeline reload match={{ params: { username: username } }} />}
                {!reload && <UserTimeline match={{ params: { username: username } }} />}
            </div>
            
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user
})

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfile));