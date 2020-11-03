import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, makeStyles, Switch } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import NavigationBar from '../layout/NavigationBar'



export class PrivacyPage extends Component {

    render(){
        return(
            <div className="privPage">
                <NavigationBar/>
                <Grid container direction="column" alignItems="left" spacing = {3}>
                    <Grid item privatePage={12}>
                        <Paper>
                            <h1>Private Page:</h1>
                            <Switch></Switch>
                            <sub>This option will make your posts invisible to people who do not follow you</sub>
                        </Paper>
                    </Grid>
                    <Grid item emailPrivacy = {12}>
                        <Paper>
                            <h1>Show Email on Profile:</h1>
                            <Switch></Switch>
                            <sub>This option will hide your email from your profile</sub>
                        </Paper>
                    </Grid>
                    <Button>Save</Button>
                </Grid>
            </div>
        );
    }

}



export default PrivacyPage;