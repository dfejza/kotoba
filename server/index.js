const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var TrieSearch = require('trie-search');
//temp
const util = require('util')
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let rawdata_JMDICT = fs.readFileSync('./assets/JMdict_e.json');
let JMDICT = JSON.parse(rawdata_JMDICT);
let JMDICT_FORMATTED = {}
var tsKanji = new TrieSearch();

function formatDictionary(){
    // TODO replacing the same kanji atm
    JMDICT.words.forEach(item => {
        item.kanji.forEach(matchedKanji => {
            if (JMDICT_FORMATTED.hasOwnProperty(matchedKanji.text) == false) {
                JMDICT_FORMATTED[matchedKanji.text] = item;
            } else {
                let replacementName = matchedKanji.text + " ";
                while(JMDICT_FORMATTED.hasOwnProperty(replacementName)){
                    replacementName = replacementName + " ";
                }
                JMDICT_FORMATTED[replacementName] = item;
            }
        });
    });
    tsKanji.addFromObject(JMDICT_FORMATTED);
}
formatDictionary();

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
app.post('/getTermV2', (req, res) => {
    const term = req.body.term;
    const result = tsKanji.get(term).map(KV => {return KV.value});
    console.log(JMDICT_FORMATTED[term])

    return res.send({res : result});
});


app.listen(3001, () =>
  console.log(`Example app listening on port 3001!`),
);