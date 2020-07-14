import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import '../HomePage.css'



const useStyles = makeStyles((theme) => ({
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
    searchButton: {
        background: "black",
        color:"white", // white text
        borderRadius: "0px", //remove corners
        fontSize: "18px",
    }
}));

export default function SearchBar(props) {
    const classes = useStyles();
    const defaultSearchText = "Search in English, 日本語, or Romaji"
    return(
        <Paper className={classes.searchBar} elevation={0}>
            <TextField 
                className={classes.searchBox} 
                id="standard-basic" 
                variant="standard"
                label=""
                value={props.searchTerm}
                onChange={e => props.setSearchTerm(e.target.value)}
                placeholder={defaultSearchText}
                InputProps={{ disableUnderline: true}}
                type="search" />
            <Button 
                className={classes.searchButton} 
                variant="contained" 
                startIcon={<Icon>search</Icon>}
                onClick={props.searchBarHandler}
                disableElevation>
                    検索
            </Button>
        </Paper>
    )
}