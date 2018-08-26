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
            <div className="content-container">
                    <img className="img-responsive" width="300" src={this.props.image} alt=""/>
                    <div className="post-meta-container">
                        {!this.props.numLikes ? <p>No likes yet</p>: <p>Number of likes so far {this.props.numLikes}</p>}
                        <button className="btn btn-danger" onClick={this.onDelete} value={this.props.id}>Delete</button>
                    </div>
                </div>  
         )
           
    }
}

export default connect(null, actions)(Post);
