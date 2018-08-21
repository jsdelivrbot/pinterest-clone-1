import React, {Component} from 'react';
import PostImageForm from './post-image-form';
import Post from './post';
import UserLike from './user-like';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProfileContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {onlineImageValue: '', file: null};
        this.submitLocal = this.submitLocal.bind(this);
        this.submitOnline = this.submitOnline.bind(this);
        this.handleOnlineChange = this.handleOnlineChange.bind(this);
        this.handleLocalChange = this.handleLocalChange.bind(this);
    }
    componentWillMount() {
        this.props.loadUserProfile();
    }
    
    
    handleOnlineChange(e) {
        this.setState({ onlineImageValue: e.target.value });
    }
    submitOnline(e) {
        e.preventDefault();
        this.props.submitOnlineImage(this.state.onlineImageValue);
    }
    handleLocalChange(e) {
        this.setState({file: e.target.files[0]})
    }
    submitLocal(e) {
        e.preventDefault();
        this.props.submitLocalImage(this.state.file);
    }
 
    render() {
        console.log(this.props.userPostsList)
        if(this.props.loadingUserProfile) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        else {
            let posts = this.props.userPostsList.map((post, i) => {
                return (
                    <Post key={i}
                          image={post.image}
                          numLikes={post.numLikes}
                          id={post._id} />
                )
                
            })
            let userLikes = this.props.userLikes.map((post, i) => {
                console.log(post.post.poster)
                return (
                    <UserLike key={i}
                          image={post.post.image}
                          email={post.ownerOfPost}
                          id={post.post._id}
                          numLikes={post.post.numLikes}
                          userId={post.post.poster} />
                )
                
            })
            return (
                <div>
                    <h1>Create a new post</h1>
                    <p role="alert" className="error">{this.props.submissionError}</p>
                    <PostImageForm
                        onlineChange={this.handleOnlineChange}
                        submitOnline={this.submitOnline}
                        localFileChange={this.handleLocalChange}
                        submitLocal={this.submitLocal}/>
                    <h2>Your Posts</h2>
                    {posts}
                    <h2>Your Likes</h2>
                    {userLikes}
                </div>
            )
         }
        
    }
}

function mapStateToProps(state) {
    return {userPostsList: state.app.userPostsList, userName: state.app.userName, loadingUserProfile: state.app.loadingUserProfile, submissionError: state.app.submissionError, userLikes: state.app.userLikes }
}

export default connect(mapStateToProps, actions)(ProfileContainer);