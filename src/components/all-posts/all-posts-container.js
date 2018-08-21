import React, {Component} from 'react';
import Post from './post';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';

class AllPostsContainer extends Component {
    constructor(props) {
        super(props);
       
    }
    componentWillMount() {
        this.props.loadAllPosts();
    }
    
    render() {
        if(this.props.loadingPosts) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        else {
            let posts = this.props.allPostsList.map((post, i) => {
                return (
                    <Post key={i}
                          image={post.image}
                          email={post.poster.email}
                          numLikes={post.numLikes}
                          userId = {post.poster._id}
                          error={post.error}
                          id={post._id}
                          />
                
                )
                
            })
            return (
                <div>
                    {posts}
                </div>
            )
        }
    }
}
function mapStateToProps(state) {
    return {allPostsList: state.app.allPostsList, loadingPosts: state.app.loadingPosts}
}

export default connect(mapStateToProps, actions)(AllPostsContainer);