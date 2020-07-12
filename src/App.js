import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomePage from './homepage/HomePage.js'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexShrink: 0,
  },
  content: {
    flexBasis: '80%', 
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HomePage className={classes.content}/>
    </div>
  );
}

export default App;
