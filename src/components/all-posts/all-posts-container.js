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
        if(this.props.allPostsList.length === 0) {
            return (
                <div>
                    <h1> No posts added yet!</h1>
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
                    <h1 className="text-center">Welcome to Pic Share!</h1>
                    <p className="text-center">Pic Share allows users to post online and local images so they can share content with other members of the community. It's a fun way to see what content is trending online and members also have the opportunity to share their personal photography and art with others. <Link to={"/signup"}>Create an account now</Link> or <Link to={"/signin"}>sign in</Link> to starting sharing content!</p> 
                <div className="post-container">
                    {posts}
                </div>
                </div>
            )
        }
    }
}
function mapStateToProps(state) {
    return {allPostsList: state.app.allPostsList, loadingPosts: state.app.loadingPosts}
}

export default connect(mapStateToProps, actions)(AllPostsContainer);