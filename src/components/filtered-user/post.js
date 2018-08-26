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
                <div className="content-container">
                    <p role="alert" className="error">{this.props.error}</p>
                    <img className="img-responsive" width="300" src={this.props.image} alt=""/>
                    <div className="post-meta-container">
                        {!this.props.numLikes ? <p>No likes yet</p>: <p>Number of likes so far {this.props.numLikes}</p>}
                        <button className="btn btn-success" onClick={this.likePost} value={this.props.id}>Like</button>
                    </div>
                </div>  
         )
           
    }
}

// function mapStateToProps(state) {
//     return {userId: state.app.userId}
// }

export default connect(null, actions)(Post);
