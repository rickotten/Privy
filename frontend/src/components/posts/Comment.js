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
        comment: PropTypes.string.isRequired
    }

    render() {
        const avatar = <Avatar> {this.props.authorName.toUpperCase().charAt(0)}</Avatar>
        return (
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
