import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';
class UserLike extends Component {
    constructor(props) {
        super(props);
        this.likePost = this.likePost.bind(this);
        this.state={currentUser: ""};
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
                    <h3>Submitted By: <Link to={"/user-content/"+this.props.userId}>{this.props.email}</Link></h3>
                    <button className="btn btn-default" onClick={this.likePost} value={this.props.id}>Unlike Post</button>
                </div>  
            )
        
    }
}
export default connect(null, actions)(UserLike);
