import React, { useState }  from 'react';
import SearchBar from './SearchBar.js'
import SearchResults from './SearchResults.js'
import getTermV1 from './SearchApi'

export default function Search(props){
    const [searchTerm, setSearchTerm] = useState("");
    // todo have redux handle state
    const [data, setData] = useState([]);

    const searchBarHandler = async(event) =>{
        const ret = await getTermV1(searchTerm);
        setData(ret);
    };

    return(
        <React.Fragment>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchBarHandler={searchBarHandler}
                />
            <SearchResults data={data}/>
        </React.Fragment>
    );

};