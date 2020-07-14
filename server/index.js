const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//temp
const util = require('util')
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let rawdata_JMDICT = fs.readFileSync('./assets/JMdict_e.json');
let JMDICT = JSON.parse(rawdata_JMDICT);

app.post('/getTerm', (req, res) => {
    const term = req.body.term;
    var arrayFound = JMDICT.words.filter(function(item) {
        for(let i = 0; i < item.kanji.length; i++){
            if(item.kanji[i].text === term) {
                console.log(item.kanji[i].text);
                return true;
            }
        };
        return false;
    });
    
    console.log(util.inspect(arrayFound, {showHidden: false, depth: null}))
    return res.send({res : arrayFound});
});


app.listen(3001, () =>
  console.log(`Example app listening on port 3001!`),
);