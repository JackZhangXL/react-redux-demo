import fetch from 'isomorphic-fetch';

export const fetchDataApi = async(data) => {
    return fetch(`./api/fetchSampleData.json?num=${data}`)
        .then((response) => response.json());
};

