import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Empty } from 'antd';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class DynamicTable extends Component {

      render() {
        
        let numOfRows = 0
        console.log(this.props.tableJSONdata)
        const columnDefsData = []
        const rowData = []
        for(var colName in this.props.tableJSONdata){
            columnDefsData.push(
                {
                    headerName:colName,field:colName,sortable: true, filter: true
                }
            )
            numOfRows = this.props.tableJSONdata[colName].length
        }

        let i = 0
        console.log(i,numOfRows)
        while(i < numOfRows){
            const temp = {}
            for (var key in this.props.tableJSONdata){
                temp[key] = this.props.tableJSONdata[key][i]
            }
            console.log(temp)
            i = i + 1
            rowData.push(temp)
        }
        console.log(rowData)
        console.log(columnDefsData)
        return (
            <div className="ag-theme-alpine"
                    style={{
                        padding: '20px',
                        height: '450px',
                        width: '90%' ,
                        float:'center',
                        margin:25}}
                >
                <div style={{fontSize:20,margin:25}}>{this.props.heading}</div>
                {
                    columnDefsData.length == 0  ? <Empty></Empty>:    <AgGridReact columnDefs={columnDefsData} rowData={rowData} /> 
                }
            </div>
        );
      }
}

export default DynamicTable
