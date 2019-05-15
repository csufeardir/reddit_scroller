import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import LaunchIcon from '@material-ui/icons/Launch'
import withStyles from "@material-ui/core/es/styles/withStyles";

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});



class Image extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

	render(){
        const { classes } = this.props;
		
		return this.props.data.map((post) =>(


		<Card className={classes.card}>
            <CardHeader avatar={
                <Avatar className={classes.avatar} >{post.author.charAt(0)}</Avatar>
            }
                        action={
                            <IconButton >
                                <LaunchIcon />
                            </IconButton>
                        }
                        title={post.title}
                        subheader={post.author}
                        />
                        <CardActionArea>
                            <a href={post.src} data-lity onClick={() => this.setState({ isOpen: true })}>
                        <CardMedia
                            className={classes.media}
                            image={post.src}
                            title={post.title}
                            />

                            </a>
                        </CardActionArea>
            <CardContent>
                <Typography component='p'>

                </Typography>
            </CardContent>
            <CardActions className="action" disableActionSpacing>

            </CardActions>
		</Card>



		))
	
	}
}

export default withStyles(styles)(Image);