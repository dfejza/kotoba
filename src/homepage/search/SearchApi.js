import axios from 'axios';

const getTermV1 = async(searchTerm) => {
    // TODO input sanitization
    const res = await axios.post(`/getTermV2`, { "term": searchTerm });
    let returnData =res.data.res;
    console.log(returnData);
    if(returnData[0] == null ) 
        returnData = [];
    return returnData;
};

export default getTermV1;