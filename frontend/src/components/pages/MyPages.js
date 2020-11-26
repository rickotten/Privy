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
                    <h1 className="centeredText">My Pages</h1>
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