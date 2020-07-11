import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';
import Typewriter from 'typewriter-effect';
import './HomePage.css'



const useStyles = makeStyles((theme) => ({
    content:{
        width: "80%",
        display:"flex",
        flexDirection:"column",
        fontSize:"72px"
    },
    title: {
        padding: "15px",
        alignContent: "left",
        display: "inherit"
    },
    searchBar: {
        display: "flex",
        borderColor:"grey",
        borderStyle: "solid",
        borderWidth: "1px"
    },
    searchBox: {
        marginLeft: "10px",
        flex: "1 0 auto", // fit the parent width
        background: "white",
    },
    searchBoxInput: {
        fontSize: "72px"
    },
    searchButton: {
        background: "grey",
        color:"white", // white text
        borderRadius: "0px", //remove corners
        fontSize: "18px"
    }
}));

function HomePage() {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <TitleBar/>
            <SearchBar/>
        </div>
    );
}
class Greeting extends React.Component {
    render() {
      return <Typewriter
                    options={{
                        strings: ['Hello', 'World'],
                        autoStart: true,
                        loop: true,
                    }}
                />
    }
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
                    typewriter.typeString(text2)
                    .pauseFor(500)
                    .deleteAll()
                    .typeString(text3)
                    .start();
                }}
                />
        </Typography>
    );
}

function SearchBar() {
    const classes = useStyles();
    const defaultSearchText = "English, 日本語, or Romaji"
    return(
        <Paper className={classes.searchBar} elevation={0}>
            <TextField 
                className={classes.searchBox} 
                id="standard-basic" 
                variant="standard"
                label=""
                placeholder={defaultSearchText}
                size="large"
                InputProps={{ disableUnderline: true}}
                type="search" />
            <Button 
                className={classes.searchButton} 
                variant="contained" 
                startIcon={<Icon>search</Icon>}
                disableElevation>
                    検索
            </Button>
        </Paper>
    )
}

export default HomePage;
