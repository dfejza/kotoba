import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    minWidth: 600,
  },
  title: {
    fontSize: 22,
  },
  card: {
    marginTop: 10,
    display: "flex",
  },
  pos: {
    fontSize: "12px",
  },
  def: {
    textIndent: "20px",
    marginBottom: "0px",
  },
  cardTitle: {
    display: "flex",
  },
  ol: {
    margin: "0px",
    overflow: "hidden",
  },
  ReactFuri: {
    paddingRight: "10px",
  },
  furigana: {
    paddingTop: "5px",
    fontSize: "14px",
  },
  chipHolder: {
    display: "flex",
    flexFlow: "row-reverse",
  },
  chip: {
    marginLeft: "10px",
    marginTop: "25px",
  },
  content: {
    width: "fit-content",
    paddingTop: 0,
    flex: "1 0 auto",
  },
}));


// TODO BREAK THIS FILE UP INTO COMPONENTS
const DefinitionSubGroups = (props) => {
  const classes = useStyles();
  const definitions = props.definitions;
  let formattedGroups = [];

  definitions.forEach((element) => {
    //if(element.partsOfSpeech.length != 0) {
    let obj = {
      partsOfSpeech: element.partsOfSpeech,
      gloss: [],
    };
    obj.gloss.push(element.gloss);
    //console.log(element.gloss)
    formattedGroups.push(obj);
    // } else {
    //   formattedGroups[formattedGroups.length - 1].gloss.push(element.gloss);
    // }
  });

  return (
    <ol className={classes.ol}>
      {formattedGroups.map((def, idx) => {
        return (
          <div className={classes.group} key={idx}>
            <Typography className={classes.pos} color="textSecondary">
              {def.partsOfSpeech}
            </Typography>
            <Typography className={classes.def} component="p">
              {def.gloss.map((trans, idx2) => {
                return (
                  <li key={idx2}>
                      {trans.map((trans2, idx3) => {
                        return (
                          <React.Fragment key={idx3}>
                            {trans2.text};{" "}
                          </React.Fragment>
                        );
                      })}{" "}
                  </li>
                );
              })}
            </Typography>
          </div>
        );
      })}
    </ol>
  );
};

function ReactFuri(props) {
  const classes = useStyles();
  const truncatedFurigana = () => {
    let a = props.reading.length - 1;
    let b = props.word.length - 1;
    while (props.reading.charAt(a) === props.word.charAt(b)) {
      a--;
      b--;
    }
    return props.reading.substring(0, a + 1);
  };
  let reading = truncatedFurigana();
  return (
    <div className={classes.ReactFuri}>
      <div className={classes.furigana}>{reading}</div>
      <Typography variant="h4" component="h4" className={classes.cardTitle}>
        {props.word}
      </Typography>
    </div>
  );
}
const toolTips = {
  "news" : "Appears in the 'wordfreq' file compiled by Alexandre Girardi from the Mainichi Shimbun. Words in the first 12,000 in that file are marked 'news1' and words in the second 12,000 are marked 'news2'",
  "ichi" : 'Appears in the "Ichimango goi bunruishuu", Senmon Kyouiku Publishing, Tokyo, 1998. (The entries marked "ichi2" were demoted from ichi1 because they were observed to have low frequencies in the WWW and newspapers.)',
  "spec" : 'Small number of words use this marker when they are detected as being common, but are not included in other lists.',
  "gai" : 'Common loanwords, also based on the wordfreq file.',
  "nf" : 'Indicator of frequency-of-use ranking in the wordfreq file.'
}

const DefinitionCard = (props) => {
  const classes = useStyles();
  const definition = props.word;
  const word =
    definition.kanji.length == 0 ? definition.kana[0] : definition.kanji[0];
  const reading = definition.kanji.length == 0 ? "" : definition.kana[0].text;
  let common = [];
  for (let key in word.common) {
    // todo move to backend
    common.push({"commonTag" : String(key) + String(word.common[key]), "tooltip" : toolTips[key] + (key=="nf" ? " Top " + String((word.common[key]-1)*500) + "-" + String(word.common[key]*500) + " words." : "")});
  }
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent className={classes.content}>
        <Typography variant="h5" component="h5" className={classes.cardTitle}>
          <ReactFuri word={word.text} reading={reading} />
          <div className={classes.chipHolder}>
            {common.map((feat,idx) => {
              return (
                <Tooltip key={idx} title={feat.tooltip}>
                  <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    label={feat.commonTag}
                  />
                </Tooltip>
              );
            })}
          </div>
        </Typography>
        <DefinitionSubGroups definitions={definition.sense} />
      </CardContent>
    </Card>
  );
};

export default React.memo(function SearchResults(props) {
  const classes = useStyles();
  const data = props.data;
  return (
    <div className={classes.root}>
      {data.map((word) => {
        return (
          <React.Fragment>
            {word.map((subWord, idx) => {
              return <DefinitionCard key={idx} className={classes.root} word={subWord} />;
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
});
