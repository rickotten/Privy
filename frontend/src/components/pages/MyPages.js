import { Grid, Paper } from "@material-ui/core";
import React, { Component } from 'react';
import NavigationBar from "../layout/NavigationBar";


export class MyPages extends Component {

    render() {
        return(
            <div>
                <NavigationBar/>
                <div className="card card-body mt-5">
                    <h1 className="text-center">My Pages</h1>
                    <Grid>
                        <Grid>
                            <Paper>
                                <h3>Add user's pages here</h3>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default MyPages