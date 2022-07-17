import axios from 'axios';
const REST_ENDPOINT = 'http://localhost:8080/'; 

// Cargar Especies
export function loadSpecies(species) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                url: `${REST_ENDPOINT}api/specie/getSpecies`,
                method: 'GET',
                Headers: {
                    'Content-Type': 'application/json'
                }
            })
            resolve()
        } catch (e) {
            reject(e)
        }
    });
}