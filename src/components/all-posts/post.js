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
    componentWillMount() {
        this.setState({currentUser: localStorage.getItem('userId')});
    }
    likePost(e) {
        this.props.onLike(e.target.value)
    }
    render() {
        if(this.state.currentUser !== this.props.userId) {
            return (
                <div className="content-container">
                    <p role="alert" className="error">{this.props.error}</p>
                    <img className="img-responsive"  width="300"src={this.props.image} alt=""/>
                    <div className="post-meta-container">
                        <p className="text-center">Submitted By: <Link to={"/user-content/"+this.props.userId}>{this.props.email}</Link> {!this.props.numLikes ? <span>No likes yet</span>: <span>Number of likes so far {this.props.numLikes}</span>}</p>
                        <button className="btn btn-success" onClick={this.likePost} value={this.props.id}>Like</button>
                    </div>
                </div>  
         )
        }
         else {
            return (
                <div className="content-container">
                   <p role="alert" className="error">{this.props.error}</p>
                    <img className="img-responsive"  width="300"src={this.props.image} alt=""/>
                    <div className="post-meta-container">
                        <p className="text-center">Submitted By: <Link to={"/user/"+this.props.userId}>{this.props.email}</Link> {!this.props.numLikes ? <span>No likes yet</span>: <span>Number of likes so far {this.props.numLikes}</span>}</p>
                        <button className="btn btn-success" onClick={this.likePost} value={this.props.id}>Like</button>
                    </div>
                </div>  
            )
        }
    }
}

export default connect(null, actions)(Post);
