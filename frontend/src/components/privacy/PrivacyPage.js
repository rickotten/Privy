import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, makeStyles, Switch } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import NavigationBar from '../layout/NavigationBar'



export class PrivacyPage extends Component {

    render(){
        return(
            <div>
                <NavigationBar/>
                <div className="card card-body mt-5">
                    <Grid container direction="column" alignItems="left" spacing = {3}>
                        <Grid item privatePage={12}>
                                <h1 className="textColor">Private Page:</h1>
                                <h3 className="textColor">This option will make your posts invisible to people who do not follow you</h3>
                                <Switch></Switch>
                        </Grid>
                        <Grid item emailPrivacy = {12}>
                                <h1 className= "textColor">Show Email on Profile:</h1>
                                <h3 className="textColor">This option will hide your email from your profile</h3>
                                <Switch></Switch>
                        </Grid>
                        <Grid item darkMode = {12}>
                            <h1 className="textColor">Dark Mode:</h1>
                            <h3 className="textColor">This option will give Privy a darker overlay</h3>
                            <Switch></Switch>

                        </Grid>
                        <button style= {{fontSize:15, height:45, width:105}} type="submit" className="btn btn-primary">
							Save
						</button>                        
                    </Grid>
                </div>
            </div>
        );
    }

}



export default PrivacyPage;