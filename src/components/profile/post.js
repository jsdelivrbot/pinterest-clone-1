import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';
class Post extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }
    
    onDelete(e) {
        this.props.deletePost(e.target.value)
    }
    
    render() {
        return (
                <div className="post-container">
                    <img src={this.props.image} alt=""/>
                    <span>Number of likes so far {this.props.numLikes}</span>
                    <button className="btn btn-danger" onClick={this.onDelete} value={this.props.id}>Delete</button>
                </div>  
         )
           
    }
}

export default connect(null, actions)(Post);
