import axios from 'axios';

const getTermV1 = async(searchTerm) => {
    // TODO input sanitization
    const res = await axios.post(`/getTermV2`, { "term": searchTerm });
    console.log(res.data.res);
    return res.data.res;
};

export default getTermV1;