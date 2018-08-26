import React, {Component} from 'react';
import Post from './post';
import { connect } from 'react-redux';
import * as actions from '../../actions';
class FilteredContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.filterUserPosts();
    }
    render() {
    
        let posts = this.props.filteredUserPosts.map((post, i) => {
            return (
                <Post key={i}
                          image={post.image}
                          numLikes={post.numLikes}
                          error={post.error}
                          id={post._id}
                          />
            )
            
        })
        return (
            <div>
                <h1 className="text-center margin-35px">{this.props.userName}'s Content</h1>
                <div className="post-container">
                    {posts}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {filteredUserPosts: state.app.filteredUserPosts, userName: state.app.userName}
}

export default connect(mapStateToProps, actions)(FilteredContainer);