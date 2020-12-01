import { Grid, Paper } from "@material-ui/core";
import React, { Component } from 'react';
import NavigationBar from "../layout/NavigationBar";
import CreatePageForm from "./CreatePageForm";


export class MyPages extends Component {

    render() {
        return(
            <div>
                <NavigationBar/>
                <CreatePageForm/>
                <div className="card card-body mt-5">
                    <h1 className="text-center">My Pages</h1>
                    <Grid>
                        <Grid>
                            <Paper>
                                <h3>You're not subscribed to any pages!</h3>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default MyPages