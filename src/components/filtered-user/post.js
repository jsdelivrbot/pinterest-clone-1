import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';
class Post extends Component {
    constructor(props) {
        super(props);
        this.state={currentUser: ""};
        this.likePost = this.likePost.bind(this);
    }
    likePost(e) {
        this.props.onLike(e.target.value)
    }
    render() {
        return (
                <div className="post-container">
                    <span>{this.props.error}</span>
                    <img src={this.props.image} alt=""/>
                    <span>Number of likes so far {this.props.numLikes}</span>
                    <button className="btn btn-default" onClick={this.likePost} value={this.props.id}>Like</button>
                </div>  
         )
           
    }
}

// function mapStateToProps(state) {
//     return {userId: state.app.userId}
// }

export default connect(null, actions)(Post);
