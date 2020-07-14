import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactFuri from 'react-furi';
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
        display: 'flex',
    },
    pos: {
      fontSize: "12px",
    },
    def: {
      textIndent: "20px",
      marginBottom: "0px",
    },
    group: {
      borderLeft: "solid",
      marginBottom: "5px",
      textIndent: "10px",
    },
    content: {
      flex: '1 0 auto',
    },
}));

const DefinitionSubGroups = (props) => {
  const classes = useStyles();
  const definitions = props.definitions;
  let formattedGroups = [];
  
  definitions.forEach(element => {
      if(element.partsOfSpeech.length != 0) {
        let obj = {
          "partsOfSpeech": element.partsOfSpeech,
          "gloss" : []
        };
        obj.gloss.push(element.gloss);
        formattedGroups.push(obj);
      } else {
        formattedGroups[formattedGroups.length - 1].gloss.push(element.gloss);
      }
  });
  return(
    <div>
      {
        formattedGroups.map((def, idx) => {
          return <div className={classes.group} key={idx}><Typography className={classes.pos} color="textSecondary">
            {def.partsOfSpeech}
          </Typography>
            <Typography className={classes.def} component="p">
              {def.gloss.map((trans, idx) => {
                return <React.Fragment key={idx}> {
                  trans.map((trans2, idx2) => { 
                      return <React.Fragment key={idx2}> {trans2.text} </React.Fragment> 
                    })} 
                  </React.Fragment>
              })}
            </Typography>
          </div>
        })
      }
    </div>
  )  
}

const DefinitionCard = (props) => {
  const classes = useStyles();
  const definition = props.word;
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.content} >
        <Typography variant="h5" component="h5">
          <ReactFuri word={definition.kanji[0].text} reading={definition.kana[0].text} />
        </Typography>
        <DefinitionSubGroups definitions={definition.sense}/>
      </CardContent>
    </Card>
  )
};

export default function SearchResults(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const data = props.data;

  
    return (
        <div className={classes.root}>
            {data.map((word) => {
                return <DefinitionCard word={word}/>
            }) }

        </div>
    );
}