import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Typewriter from 'typewriter-effect';
import SearchBar from './SearchBar.js'
import SearchResults from './SearchResults.js'
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

const stubBackendApiCall = (searchTerm) => {
    const exampleData = [
        {
            "kanji" : "言葉",
            "furigana" : "【ことば】",
            "phonetic" : "kotoba",
            "type" : "adjective",
            "definition" : "language, speech",
            "example" : "言葉が で 出てこなかった。Words failed me."
        },
        {
            "kanji" : "言葉",
            "furigana" : "【ことば】",
            "phonetic" : "kotoba",
            "type" : "adjective",
            "definition" : "language, speech",
            "example" : "言葉が で 出てこなかった。Words failed me."
        },
        {
            "kanji" : "言葉",
            "furigana" : "【ことば】",
            "phonetic" : "kotoba",
            "type" : "adjective",
            "definition" : "language, speech",
            "example" : "言葉が で 出てこなかった。Words failed me."
        }
    ];
    return exampleData;
};


function HomePage() {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    // todo have redux handle state
    const [data, setData] = useState([]);

    const searchBarHandler = (event) =>{
        console.log(searchTerm);
        let ret = stubBackendApiCall(searchTerm);
        setData(ret);
    };
    return (
        <div className={classes.content}>
            <TitleBar/>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchBarHandler={searchBarHandler}
                />
            <SearchResults data={data}/>
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
