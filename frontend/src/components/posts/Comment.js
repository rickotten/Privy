import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

export class Comment extends Component {
    static propTypes = {
        authorName: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        picture: PropTypes.string
    }

    render() {
        const avatar = <a href={"#profile/" + this.props.authorName}>
            <Avatar alt={this.props.authorName.toUpperCase().charAt(0)} src={this.props.picture}/>
                                </a>
        return (

            <div className="comment card-body" padding="20px">
                <main style={{display: "table"}}>
                    {avatar}
                    {this.props.authorName}
                </main>
                <div>
                    <Typography>{this.props.comment}</Typography>
                </div>
            </div>

            /*
            <Card>
                <CardHeader 
                    avatar={avatar}
                    title={this.props.authorName}
                />
                <CardContent>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {this.props.comment}
                    </Typography>
                </CardContent>
            </Card>
            */
        )

        // return (
        //     <Grid
        //         container
        //         direction="row"
        //         justify="flex-start"
        //         alignItems="center"
        //         spacing={4}
        //     >
        //         <Grid item>
        //             <Avatar>
        //                 {this.props.authorName.toUpperCase().charAt(0)}
        //             </Avatar>
        //         </Grid>
        //         <Grid item>
        //             <Typography variant="subtitle1" gutterBottom>
        //                 {this.props.comment}
        //             </Typography>
        //         </Grid>
        //     </Grid>
        // )
    }
}

export default Comment
