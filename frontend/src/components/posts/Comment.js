import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {

    },
    title: {
        fontSize: 14,
        fontStyle: 'italic',
        fontFamily: "Nunito",
    },
    header: {
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-around',
        fontFamily: "Nunito",
    },
    subHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    review: {
        paddingLeft: 10,
        flexGrow: 2,
        fontFamily: "Nunito",
    }
})
export class Comment extends Component {
    static propTypes = {
        authorName: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        picture: PropTypes.string,
        classes: PropTypes.object.isRequired
    }

    render() {
        const { authorName, comment, picture, classes } = this.props
        const avatar = <a href={"#profile/" + this.props.authorName}>
            <Avatar alt={this.props.authorName.toUpperCase().charAt(0)} src={picture} />
        </a>
        return (
            <Card className={classes.root}>
                <CardContent className={classes.header}>
                    {avatar}
                    <div className={classes.subHeader}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Via {authorName}
                        </Typography>
                    </div>

                    <Typography className={classes.review} variant="body2" component="p">
                        "{comment}"
				</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(useStyles)(Comment)
