import React, { Component } from 'react';

export default (props) => {
    return (
        <div>
            <form onSubmit={props.submitOnline}>
                <div className="form-group">
                    <label>Copy and paste an image's URL from the internet</label>
                    <input type="text" className="form-control" id="online-image" placeholder="Online Image" onChange={props.onlineChange}/>
                    <button type="submit" className="btn btn-default">Submit</button>
                </div>
            </form>
            <p className="help-block">Or Submit an image from your computer</p>
            <form onSubmit={props.submitLocal}>
                <div className="form-group">
                    <label>Upload File From Personal Computer</label>
                        <input type="file" id="uploadFile" onChange={props.localFileChange}/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </div>
    )
}