import React, { Component } from 'react'
import ReactDiffViewer from 'react-diff-viewer';

class ViewFileDifference extends Component {
    render() {
        return (
            <div>
                <ReactDiffViewer oldValue={this.props.file1} newValue={this.props.file2} splitView={true} />
            </div>
        )
    }
}

export default ViewFileDifference
