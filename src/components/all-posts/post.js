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
                <div className="post-container">
                    <span>{this.props.error}</span>
                    <img src={this.props.image} alt=""/>
                    <h3>Submitted By: <Link to={"/user-content/"+this.props.userId}>{this.props.email}</Link></h3>
                    <span>Number of likes so far {this.props.numLikes}</span>
                    <button className="btn btn-default" onClick={this.likePost} value={this.props.id}>Like</button>
                </div>  
         )
        }
         else {
            return (
                <div className="post-container">
                    <span>{this.props.error}</span>
                    <img src={this.props.image} alt=""/>
                    <h3>Submitted By: <Link to={"/user/"+this.props.userId}>{this.props.email}</Link></h3>
                    <span>Number of likes so far {this.props.numLikes}</span>
                    <button className="btn btn-default" onClick={this.likePost} value={this.props.id}>Like</button>
                </div>  
            )
        }
    }
}

export default connect(null, actions)(Post);
