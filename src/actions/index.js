import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    FETCH_MESSAGE,
    SUBMIT_IMAGE,
    LOAD_ALL_POSTS,
    LOAD_USER_PROFILE,
    SUBMIT_IMAGE_ERROR,
    FILTER_USER_POSTS,
    SUBMIT_LIKE,
    SUBMIT_LIKE_ERROR,
    DELETE_POST

} from './types';
const ROOT_URL = 'https://morning-beyond-12420.herokuapp.com';

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
                localStorage.setItem('userId', response.data.id);
                //-redirect to the route '/feature'
                browserHistory.push('/');
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
            dispatch({type: AUTH_USER});
            //-save the JWT token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id);
            //-redirect to the route '/feature'
            browserHistory.push('/');
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
    localStorage.removeItem('userId');
    browserHistory.push('/');
    return {type: UNAUTH_USER};
}



export function loadAllPosts() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/all-posts`)
            .then((response) => {
                dispatch({
                    type: LOAD_ALL_POSTS,
                    payload: response.data['data']
                })
            })
    }
}

export function loadUserProfile() {
    return function(dispatch) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        axios.get(`${ROOT_URL}/user/${userId}`, {
            headers: { authorization: token }})
            .then(response => {
                dispatch({
                    type: LOAD_USER_PROFILE,
                    payload: response.data['data']
                })
            })
        }
    }

export function filterUserPosts() {
    let url = window.location.pathname;
    let ownerOfPosts = url.substring(url.lastIndexOf('/') + 1);
    
        return function(dispatch) {
            axios.get(`${ROOT_URL}/user-content/${ownerOfPosts}`)
            .then(response => {
                dispatch({
                    type: FILTER_USER_POSTS,
                    payload: response.data['data']
                })
            })
        
    }
  
    
}
export function submitOnlineImage(imgString) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return function(dispatch) {
        axios.post(`${ROOT_URL}/online-image`, {imgString, userId}, {
            headers: { authorization: token }})
            .then(response => {
            if( typeof response.data['data']=== 'string') {
                dispatch({
                    type: SUBMIT_IMAGE_ERROR,
                    payload: response.data['data']
                })
            }
            dispatch({
                type: SUBMIT_IMAGE,
                payload: response.data['data']
            })
        })
    }
}

export function onLike(postId) {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if(!token) {
        browserHistory.push(`/signup`);
    }
    else {
        return function(dispatch) {
            axios.post(`${ROOT_URL}/like-post`, {postId, userId}, {
                headers: { authorization: token }})

                .then(response => {
                    if(response.data['error']) {
                        dispatch({
                            type: SUBMIT_LIKE_ERROR,
                            payload: response.data
                        })
                    }
                    else {
                        dispatch({
                            type: SUBMIT_LIKE,
                            payload: response.data
                        })
                    }
                    
                    
                })
        }
    }
 
}
export function submitLocalImage(imgFile) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return function(dispatch) {
        const formData = new FormData();
        formData.append('file', imgFile)
        formData.append('userId', userId);
        axios.post(`${ROOT_URL}/localupload`, formData, {
            headers: { authorization: token }})
            .then(response => {
                if( typeof response.data['data']=== 'string') {
                    dispatch({
                        type: SUBMIT_IMAGE_ERROR,
                        payload: response.data['data']
                    })
                }
                dispatch({
                    type: SUBMIT_IMAGE,
                    payload: response.data['data']
                })
            })
    }
}

export function deletePost(postId) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return function(dispatch) {
        axios.post(`${ROOT_URL}/delete-post`, {postId, userId}, {
           headers:{authorization: token}})
           .then(response => {
               dispatch({
                   type: DELETE_POST,
                   payload: response.data['data']
               })
           })
    }
}