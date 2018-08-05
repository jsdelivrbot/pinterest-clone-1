import React, {Component} from 'react';
import PostImageForm from './post-image-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProfileContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {onlineImageValue: '', file: null };
        this.submitLocal = this.submitLocal.bind(this);
        this.submitOnline = this.submitOnline.bind(this);
        this.handleOnlineChange = this.handleOnlineChange.bind(this);
        this.handleLocalChange = this.handleLocalChange.bind(this);
    }
    handleOnlineChange(e) {
        this.setState({ onlineImageValue: e.target.value });
        console.log(e.target.value);
    }
    submitOnline(e) {
        e.preventDefault();
        this.props.submitOnlineImage(this.state.onlineImageValue);
    }
    handleLocalChange(e) {
        console.log(e.target.files);
        this.setState({file: e.target.files[0]})
    }
    submitLocal(e) {
        e.preventDefault();
        this.props.submitLocalImage(this.state.file);
    }
    render() {
        return (
            <div>
                <PostImageForm
                    onlineChange={this.handleOnlineChange}
                    submitOnline={this.submitOnline}
                    localFileChange={this.handleLocalChange}
                    submitLocal={this.submitLocal}
                     />
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {books: state.bookResult.books, loadingBook: state.bookResult.loadingBook, bookSaveError: state.bookResult.bookSaveError}
// }

export default connect(null, actions)(ProfileContainer);