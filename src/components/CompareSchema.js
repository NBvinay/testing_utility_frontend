import React, { Component } from 'react'
import { compareSchema } from '../api/backend_APIs'
import ResultCompareSchema from './ResultCompareSchema'
import { connect } from 'react-redux'
import DynamicTable from './UI/DynamicTable'

class CompareSchema extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            comparisionResult: []
        }
    }
    componentDidMount = async () => {
        if (this.props.databaseConfigSourceId !== '' &&
             this.props.databaseConfigTargetId !== ''){
            const response = await compareSchema(this.props.databaseConfigSourceId,this.props.databaseConfigTargetId)
                this.setState({
                    comparisionResult:response
                })
        } 
    }
    
    componentDidUpdate = async (prevProps) => {
        if(  (this.props.databaseConfigSourceId !== '' &&
            this.props.databaseConfigTargetId !== '' ) &&
           ( prevProps.databaseConfigSourceId !== this.props.databaseConfigSourceId || 
            prevProps.databaseConfigTargetId !== this.props.databaseConfigTargetId)
           ) {
                const response = await compareSchema(this.props.databaseConfigSourceId,this.props.databaseConfigTargetId)
                this.setState({
                    comparisionResult:response
                })
            }
    }

    render() {
        return (
            <div >
                <ol>
                    <b style={{float:"left"}}>Features :</b><br />
                    <b style={{float:"left"}}> Currently this model can detect the following differences of two schemas: :</b><br />
                    <li style={{float:"left"}}>Differences in Tables</li><br />
                    <li style={{float:"left"}}>Differences in Primary Keys for a common table</li><br />
                    <li style={{float:"left"}}>Differences in Foreign Keys for a common table</li><br />
                    <li style={{float:"left"}}>Differences in Indexes for a common table</li><br />
                    <li style={{float:"left"}}>Differences in Columns for a common table</li><br />
                    <li style={{float:"left"}}>Ability to ignore a whole table</li><br />
                    <li style={{float:"left"}}>Ability to ignore primary/foreign keys, indexes and columns</li>
                </ol> 
                <br /><br />
                {   
                    this.props.databaseConfigSourceId == '' || this.props.databaseConfigTargetId == '' ? "Select Databases in the top bar" :
                    this.state.comparisionResult.map(
                        (item,index) => {
                            
                            return (
                                <div>
                                    <ResultCompareSchema resultJsonData = {item} key={index}></ResultCompareSchema><br /><br />
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        databaseConfigSourceId: state.databaseConfigSourceId,
        databaseConfigTargetId: state.databaseConfigTargetId,
    };
}

export default connect(mapStateToProps) (CompareSchema)
