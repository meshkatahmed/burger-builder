import * as actionTypes from './actionTypes';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}
export const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading
    }
}
export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg
    }
}
const storeLocally = token => {
    const decoded = jwt_decode(token);
    const userId = decoded.user_id;
    const expTime = decoded.exp;
    localStorage.setItem('token',token);
    localStorage.setItem('userId',userId);
    const expirationTime = new Date(expTime * 1000);
    localStorage.setItem('expirationTime',expirationTime);
    return userId;
}
export const auth = (email,password,mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
    }
    const header = {
        headers: {
            "Content-type": "application/json"
        }
    }
    let authURL = null;
    if (mode==='signup') {
        authURL = 'http://127.0.0.1:8000/api/user/';
    } else {
        authURL = 'http://127.0.0.1:8000/api/token/';
    }
    axios.post(authURL, authData, header)
    .then(response => {
        dispatch(authLoading(false));
        if (mode!=='signup') {
            const token = response.data.access;
            const userId = storeLocally(token);
            dispatch(authSuccess(token,userId));
        } else {
            dispatch(authLoading(true));
            return axios.post('http://127.0.0.1:8000/api/token/',authData,header)
            .then(response => {
                dispatch(authLoading(false));
                const token = response.data.access;
                const userId = storeLocally(token);
                dispatch(authSuccess(token,userId));
                console.log(response);
            });
        }
        console.log(response);
    })
    .catch(err => {
        dispatch(authLoading(false));
        const key = Object.keys(err.response.data)[0];
        dispatch(authFailed(`${key.charAt(0).toUpperCase()+key.slice(1)}
            : ${err.response.data[key]}`));
    })
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'));
        if (expirationTime<=new Date()) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token,userId));
        }
    }
}
