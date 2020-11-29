import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, makeStyles, Switch } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import NavigationBar from '../layout/NavigationBar'
import { connect } from 'react-redux'
import { save_user_settings } from "../../actions/users";
import PropTypes from 'prop-types'


export class PrivacyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dark_mode: this.props.settings.dark_mode,
            show_email_on_profile: this.props.settings.show_email_on_profile
        }
    }

    static propTypes = {
        settings: PropTypes.object.isRequired,
        save_user_settings: PropTypes.func.isRequired
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.save_user_settings(this.state.show_email_on_profile, this.state.dark_mode);
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.checked})
    }

    render(){
        return(
            <div>
                <NavigationBar/>
                <div className="card card-body mt-5">
                    <form onSubmit={this.onSubmit}>
                        <Grid container direction="column" alignItems="flex-start" spacing = {3}>
                            <Grid item>
                                    <h1>Dark Mode:</h1>
                                <h3>This option will give Privy a darker overlay</h3>
                                    <Switch
                                        name="dark_mode"
                                        onChange={this.onChange}
                                        checked={this.state.dark_mode}
                                    />
                            </Grid>
                            <Grid item>
                                    <h1>Show Email on Profile:</h1>
                                    <h3>This option will hide your email from your profile</h3>
                                    <Switch
                                        name="show_email_on_profile"
                                        onChange={this.onChange}
                                        checked={this.state.show_email_on_profile}
                                    />
                            </Grid>
                            <button style= {{fontSize:15, height:45, width:105}} type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </Grid>
                    </form>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    settings: state.auth.user.settings
})

export default connect(mapStateToProps, { save_user_settings })(PrivacyPage);