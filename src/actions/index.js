import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    FETCH_MESSAGE,
    SUBMIT_IMAGE_FROM_LOCAL,
    SUBMIT_IMAGE_FROM_ONLINE

} from './types';
const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}) {
    //redux thunk is allowing us to return a function from an action creator instead of an action object
    return function(dispatch) {
        //submit email/password to server
        //{ email: email, password: password }
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                //if request is good....
                //-update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                //-save the JWT token
                localStorage.setItem('token', response.data.token);
                //-redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch(() => {
            //If request is bad...
            //-Show an error to the user
            dispatch(authError('Bad login Info'))
            })
    }  
}

export function signupUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
        .then(response => {
            //if request is good....
            //-update state to indicate user is authenticated
            console.log(response)
            dispatch({type: AUTH_USER});
            //-save the JWT token
            localStorage.setItem('token', response.data.token);
            //-redirect to the route '/feature'
            browserHistory.push('/feature');
        })
        .catch(e => dispatch(authError(e.response.data.error)));
            
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {type: UNAUTH_USER};
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
    }
}

export function submitOnlineImage(imgString) {
    return function(dispatch) {
        console.log('submitted image from internet ' + imgString);
    }
}

export function submitLocalImage(imgFile) {
    return function(dispatch) {
        
        console.log('file from local computer' + imgFile);
    }
}