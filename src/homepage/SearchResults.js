import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 20,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    card: {
        marginTop: 10,
    },
    pos: {
      marginBottom: 12,
    },
}));


export default function SearchResults(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const data = props.data;
  
    return (
        <div className={classes.root}>
            {data.map((word) => {
                return <Card className={classes.card} variant="outlined">
                        <CardContent>
                            {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
                            </Typography> */}
                            <Typography variant="h5" component="h2">
                            {word.kanji} -      
                            {word.definition}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            {word.type}
                            </Typography>
                            <Typography variant="body2" component="p">
                            {word.definition}
                            <br />
                            {word.example}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
            }) }

        </div>
    );
}