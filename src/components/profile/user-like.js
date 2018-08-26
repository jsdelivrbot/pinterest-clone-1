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
                <div className="content-container">
                    <p role="alert" className="error">{this.props.error}</p>
                    <img className="img-responsive" width="300" src={this.props.image} alt=""/>
                    <div className="post-meta-container">
                        <p>Submitted By: <Link to={"/user-content/"+this.props.userId}>{this.props.email}</Link> Number of likes so far {this.props.numLikes}</p>
                        <button className="btn btn-danger" onClick={this.likePost} value={this.props.id}>Unlike Post</button>
                    </div>
                </div>  
            )
        
    }
}
export default connect(null, actions)(UserLike);
