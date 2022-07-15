import axios from 'axios';
import jwtDecode from 'jwt-decode';


const REST_ENDPOINT = 'http://localhost:8080/';
const AUTH_TOKEN_KEY = 'authToken';

export function loginUser(username, password) {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await axios({
                url: `${REST_ENDPOINT}authenticate`,
                method: 'POST',
                data: {
                    username: username,
                    password: password,
                    grant_type: 'password'
                }
            })
            setAuthToken(res.data.jwtToken)
            console.log("CORRECT TOKEN: "+res.data.jwtToken)
            resolve()
        }
        catch (err) {
            console.error('Caught an error during login:', err)
            reject(err)
        }
    })
}

export function logoutUser() {
    clearAuthToken()
}

export function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthToken() {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken && !isTokenExpired(authToken)
}

export function getUserInfo() {
    if (isLoggedIn()) {
        return jwtDecode(getAuthToken()) // decoode
    }
}

function getTokenExpirationDate(encodedToken) {
    let token = jwtDecode(encodedToken) // decode
    console.log("Token Decoded:  "+token);
    if (!token.exp) {
        console.log("**Token Expired**")
        return null
    }

    let date = new Date(0)
    date.setUTCSeconds(token.exp)

    return date
}

function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}