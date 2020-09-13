const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var TrieSearch = require('trie-search');
var hepburn = require("hepburn");
var FuzzySearch = require('fuzzy-search');
const constants = require('./assets/constants');
//temp
const util = require('util');
const { popList } = require('./assets/constants');
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let rawdata_JMDICT = fs.readFileSync('./assets/JMdict_e.json');
let JMDICT = JSON.parse(rawdata_JMDICT);
delete rawdata_JMDICT;
let JMDICT_FORMATTED = {}
let DEF_FORMATTED = {}
var tsKanji = new TrieSearch();
var tsDef = new TrieSearch();
var JMDICT_SORTED_POPULARITY = [];
function containsAscii(stringInput) {
    const ascii = /^[ -~]+$/;
    if (ascii.test(stringInput) ) {
        return true;
    }
    ("false");
    return false;

}

const sortFunc = (a,b) => {
    const a_tags = a.kanji.length > 0 ? a.kanji[0] : a.kana[0];
    const b_tags = b.kanji.length > 0 ? b.kanji[0] : b.kana[0];
    if (a_tags.common.hasOwnProperty('nf') && b_tags.common.hasOwnProperty('nf')){
        if(a_tags.common['nf'] < a_tags.common['nf']){
            return -1;
        } else if (a_tags.common['nf'] > b_tags.common['nf']) {
            return 1;
        } else {
            // compare with popList
            const a_rank = popList.hasOwnProperty(a_tags.text) ? popList[a_tags.text] : 30000;
            const b_rank = popList.hasOwnProperty(b_tags.text) ? popList[b_tags.text] : 30001;
            return a_rank < b_rank ? -1 : 1;
        }
    } else if (a_tags.common.hasOwnProperty('nf')) {
        return -1;
    } else if (b_tags.common.hasOwnProperty('nf')) {
        return 1;
    } else {
        const a_rank = popList.hasOwnProperty(a_tags.text) ? popList[a_tags.text] : 30000;
        const b_rank = popList.hasOwnProperty(b_tags.text) ? popList[b_tags.text] : 30001;
        return a_rank < b_rank ? -1 : 1;
    }
};

function formatDictionary(){
    JMDICT.words.sort((a, b) => {
        return sortFunc(a,b);
    })

    // TODO replacing the same kanji atm
    JMDICT.words.forEach(item => {
        item.kanji.forEach(matchedKanji => {
            if (JMDICT_FORMATTED.hasOwnProperty(matchedKanji.text) == false) {
                JMDICT_FORMATTED[matchedKanji.text] = [];
            } 
            JMDICT_FORMATTED[matchedKanji.text].push(item);
        });
        item.kana.forEach(matchedKana => {
            if (JMDICT_FORMATTED.hasOwnProperty(matchedKana.text) == false) {
                JMDICT_FORMATTED[matchedKana.text] = [];
            } 
            JMDICT_FORMATTED[matchedKana.text].push(item);
        });
        item.sense.forEach(matchedSense => {
            matchedSense.gloss.forEach(englishDef => {
                if (DEF_FORMATTED.hasOwnProperty(englishDef.text) == false) {
                    DEF_FORMATTED[englishDef.text] = [];
                } 
                DEF_FORMATTED[englishDef.text].push(item);
            });
        });
    });



    tsKanji.addFromObject(JMDICT_FORMATTED);
    tsDef.addFromObject(DEF_FORMATTED);
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
// app.post('/getTermV2', (req, res) => {
//     //const term = hepburn.toHiragana(req.body.term);
//     const term = req.body.term;
//     const result = tsKanji.get(term).map(KV => {return KV.value});
//     console.log(tsKanji.get(term))

//     return res.send({res : result});
// });

app.post('/getTermV2', (req, res) => {
    //const term = hepburn.toHiragana(req.body.term);
    let term = req.body.term;
    const page = 0;
    const resPerPage = 25;
    let result = [];
    if(containsAscii(term)){
        result = [DEF_FORMATTED[term]];
        if (result[0] == undefined) {
            term = hepburn.toHiragana(term);
            result = tsKanji.get(hepburn.toHiragana(term)).map(KV => {return KV.value});
        }
    }
    if (result[0] == undefined) {
        result = tsKanji.get(term).map(KV => {return KV.value});
    }

    return res.send({res : result});
});



app.listen(3001, () =>
  console.log(`Example app listening on port 3001!`),
);