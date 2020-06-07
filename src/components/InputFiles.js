import React, { Component } from 'react'
import ViewFileDifference from './ViewFileDifference'

class InputFiles extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             file1 : '',
             file2 : '',
        }
    }

    inputFileReader1 = (event) => {
        var file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsBinaryString(file)

        reader.onload = (event) => {
            console.log(event.target.result)
            this.setState({
                file1:event.target.result
            })
        }
        console.log(file)
    }
    inputFileReader2 = (event) => {
        var file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsBinaryString(file)

        reader.onload = (event) => {
            console.log(event.target.result)
            this.setState({
                file2:event.target.result
            })
        }
        console.log(file)
    }
    
    render() {
        return (
            <div>
                {/* Input Files Here */}
                <input type="file" onChange={this.inputFileReader1}></input>
                <input type="file" onChange={this.inputFileReader2}></input>
                <ViewFileDifference file1={this.state.file1} file2={this.state.file2}></ViewFileDifference>
            </div>
        )
    }
}

export default InputFiles
