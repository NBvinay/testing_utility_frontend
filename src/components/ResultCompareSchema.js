import React, { Component } from 'react'
import JSONViewer from 'react-json-viewer';

class ResultCompareSchema extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             currentSelection : {},
             selectedArray : [],
             currentList:[]
        }
    }
    

    render() {
        console.log(this.props.resultJsonData)
        return (

            <div style={{padding:"20px",margin:'20', float:'center', overflow:'scroll',minWidth:'99%',fontSize:18}} >
                <center>
                    {
                        this.props.resultJsonData === null ?  "Select Databases in the top bar" : 
                        this.props.resultJsonData === [] ? "No Differences Detected" : <JSONViewer json={this.props.resultJsonData} /> 
                    }
                </center>
            </div>
        )
    }
}

export default ResultCompareSchema