import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Typewriter from 'typewriter-effect';
import Search from './search/Search.js'
import './HomePage.css'

const useStyles = makeStyles((theme) => ({
    content:{
        width: "70%",
        display:"flex",
        flexDirection:"column",
        fontSize:"72px"
    },
    title: {
        padding: "15px",
        alignContent: "left",
        display: "inherit"
    }
}));


function HomePage() {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <TitleBar/>
            <Search />
        </div>
    );
}

function TitleBar() {
    const classes = useStyles();
    const text = "言葉【ことば】";
    const text2 = "/kotoba/ : (a) language, speech";
    const text3 = "kotoba.info - A Japanese Dictionary";
    
    return (
        <Typography className={classes.title} variant="h4" component="h4">
            {text}
            <Typewriter 
                onInit={(typewriter) => {
                    typewriter.changeDelay(50)
                    .typeString(text2)
                    .changeDeleteSpeed(1)
                    .pauseFor(500)
                    .deleteAll()
                    .typeString(text3)
                    .start();
                }}
                />
        </Typography>
    );
}

export default HomePage;
