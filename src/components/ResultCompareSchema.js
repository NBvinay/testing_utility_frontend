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
        
        const JsonData = this.props.resultJsonData['tables']
        let currentPartialData = []
        for (const item in JsonData){
            console.log(item)
            currentPartialData.push(item)
        }
        console.log(currentPartialData)
        return (

            <div style={{padding:"20px",margin:'20', float:'center', overflow:'scroll',minWidth:'90%'}} >
                <center>
                        <JSONViewer json={this.props.resultJsonData} />
                </center>
            </div>
        )
    }
}

export default ResultCompareSchema