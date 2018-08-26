import React, { Component } from 'react';

export default (props) => {
    return (
        <div className="row">
            <div className="col-sm-6">
            <p className="help-block">Copy and paste an image's URL from the internet</p>
            <form onSubmit={props.submitOnline}>
                <div className="form-group">
                    <label>Submit Link</label>
                    <input type="text" className="form-control" id="online-image" placeholder="Online Image" onChange={props.onlineChange}/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
            <div className="col-sm-6">
            <p className="help-block">Submit an image from your computer</p>
            <form onSubmit={props.submitLocal}>
                <div className="form-group">
                    <label>Upload File</label>
                        <input type="file" id="uploadFile" onChange={props.localFileChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    )
}