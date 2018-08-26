import {
    LOAD_ALL_POSTS,
    SUBMIT_IMAGE,
    LOAD_USER_PROFILE,
    SUBMIT_IMAGE_ERROR,
    FILTER_USER_POSTS,
    SUBMIT_LIKE,
    SUBMIT_LIKE_ERROR,
    DELETE_POST
} from '../actions/types';
export default function(state = {allPostsList: [], loadingPosts: true, userPostsList: [], loadingUserProfile: true, submissionError: '', userName: '', filteredUserPosts: [], likes: null, likeError: '', userId: '', userLikes: []}, action) {
    switch(action.type) {
        case LOAD_ALL_POSTS:
            return {...state, allPostsList: action.payload, loadingPosts: false};
        case SUBMIT_IMAGE:
            return {...state, allPostsList:[...state.allPostsList, action.payload], userPostsList: [...state.userPostsList, action.payload]};
        case LOAD_USER_PROFILE:
            return {...state, userPostsList: action.payload.posts, loadingUserProfile: false, userId: action.payload._id, userName: action.payload.email, userLikes: action.payload.userLikes};
        case SUBMIT_IMAGE_ERROR:
            return {...state, submissionError: action.payload }
        case FILTER_USER_POSTS: 
            return {...state, filteredUserPosts: action.payload.posts, userName: action.payload.email, userId: action.payload._id};
        case SUBMIT_LIKE_ERROR:
        let updatedAllPostsListWithError = state.allPostsList.map((post, i) => {
            if(action.payload.post._id === post._id) {
                post.error = action.payload.error;
                return post;
            }
            else {
                post.error = '';
                return post;
            }
        })
        let updatedfilteredUserListWithError = state.filteredUserPosts.map((post, i) => {
            if(action.payload.post._id === post._id) {
                post.error = action.payload.error;
                return post;
            }
            else {
                return post;
            }
        })
        return {...state, filteredUserPosts: updatedfilteredUserListWithError, allPostsList: updatedAllPostsListWithError};

        case SUBMIT_LIKE:
        let updatedAllPostsList = state.allPostsList.map((post, index) => {
            if(post._id !== action.payload.updatedPost._id) {
                return post;
            }
            post.numLikes = action.payload.updatedPost.numLikes;
            return post;
        })
        let updatedFilteredUserPosts = state.filteredUserPosts.map((post, index) => {
            if(post._id !== action.payload.updatedPost._id) {
                return post;
            }
                post.numLikes = action.payload.updatedPost.numLikes;
                return post;
            })
        let updatedUserLikes = action.payload.updatedUser.userLikes;
            return {...state, allPostsList: updatedAllPostsList, filteredUserPosts: updatedFilteredUserPosts, userLikes: updatedUserLikes};

        case DELETE_POST:
        let updatedUserPostsList = state.userPostsList.filter((post, index) => {
            if(post._id !== action.payload._id) {
                return post;
            }
        })
        return {...state, userPostsList: updatedUserPostsList};
        
    }
    return state;
}