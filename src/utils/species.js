import axios from 'axios';
const REST_ENDPOINT = 'http://localhost:8080/'; 


export const loadSpecies = async() => {
    const response = await axios({
        url: `${REST_ENDPOINT}api/specie/getSpecies`,
        method: 'GET',
        Headers: {
            'Content-Type': 'application/json'
        }
    })
    return response;
};