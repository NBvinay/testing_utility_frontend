import React, { Component } from 'react'
import DatabaseConfigDataCompare from './DatabaseConfigDataCompare'
import { connect } from 'react-redux';
import { compareData, getTableName } from '../api/backend_APIs';
import Input from './UI/Input/Input';
import DynamicTable from './UI/DynamicTable';

class CompareData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tableDataSource:{},
            tableDataTarget: {},
            tableDataDifference: {},
            configForm: {
                tableNamesSource: {
                    label : "Source Database Table ",
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: '', displayValue: 'AutoFill Table Name' }
                        ]
                    },
                    value: '',
                    style: {}
                },
                tableNamesTarget: {
                    label : " Target Database Table ",
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: '', displayValue: 'AutoFill Table Name' }
                        ]
                    },
                    value: '',
                    style: {}
                },
                submit:{
                    elementType : 'input',
                    elementConfig: {
                        type:'submit',
                    },
                    value:'Configure',
                    style:{}
                },
            },
        }
    }

    componentDidMount = async () => {

        const tableNameSourceResponse = await getTableName(
            this.props.databaseConfigSourceId
        )
        let tableNamesSourceArr = []
        tableNamesSourceArr.push(
            { value: '', displayValue: 'AutoFill Table Name' }
        )
        if (tableNameSourceResponse.length > 0) {
            for (var index in tableNameSourceResponse) {
                tableNamesSourceArr.push(
                    { value: tableNameSourceResponse[index], displayValue: tableNameSourceResponse[index] }
                )
            }
            const updatedConfigForm = {
                ...this.state.configForm
            }
            const updatedConfigFormEement = {
                ...updatedConfigForm['tableNamesSource']
            }
            const ElementConfig = {
                ...updatedConfigFormEement['elementConfig']
            }
            ElementConfig.options = tableNamesSourceArr
            updatedConfigFormEement['elementConfig'] = ElementConfig
            updatedConfigForm['tableNamesSource'] = updatedConfigFormEement
            this.setState({
                configForm: updatedConfigForm
            })
        }


        const tableNameTargetResponse = await getTableName(
            this.props.databaseConfigTargetId
        )
        let tableNamesTargetArr = []
        tableNamesTargetArr.push(
            { value: '', displayValue: 'AutoFill Table Name' }
        )
        if (tableNameTargetResponse.length > 0) {
            for (var index in tableNameTargetResponse) {
                tableNamesTargetArr.push(
                    { value: tableNameTargetResponse[index], displayValue: tableNameTargetResponse[index] }
                )
            }
            const updatedConfigForm = {
                ...this.state.configForm
            }
            const updatedConfigFormEement = {
                ...updatedConfigForm['tableNamesTarget']
            }
            const ElementConfig = {
                ...updatedConfigFormEement['elementConfig']
            }
            ElementConfig.options = tableNamesTargetArr
            updatedConfigFormEement['elementConfig'] = ElementConfig
            updatedConfigForm['tableNamesTarget'] = updatedConfigFormEement
            this.setState({
                configForm: updatedConfigForm
            })
        }
        

        // if (this.props.databaseConfigSourceId !== '' &&
        //      this.props.databaseConfigTargetId !== ''){
        //         const response = await compareData(this.props.databaseConfigSourceId,this.props.databaseConfigTargetId)
        //         this.setState({
        //             tableDataSource:response['source'],
        //             tableDataTarget:response['target'],
        //             tableDataDifference: response['difference']
        //         },() => {
        //             console.log("response" , this.state.tableDataDifference)
        //         })
        // } 
    }
    
    componentDidUpdate = async (prevProps) => {
        if(  (this.props.databaseConfigSourceId !== '' &&
            this.props.databaseConfigTargetId !== '' ) &&
           ( prevProps.databaseConfigSourceId !== this.props.databaseConfigSourceId || 
            prevProps.databaseConfigTargetId !== this.props.databaseConfigTargetId)
           ) {

            const tableNameSourceResponse = await getTableName(
                this.props.databaseConfigSourceId
            )
            let tableNamesSourceArr = []
            tableNamesSourceArr.push(
                { value: '', displayValue: 'AutoFill Table Name' }
            )
            if (tableNameSourceResponse.length > 0) {
                for (var index in tableNameSourceResponse) {
                    tableNamesSourceArr.push(
                        { value: tableNameSourceResponse[index], displayValue: tableNameSourceResponse[index] }
                    )
                }
                const updatedConfigForm = {
                    ...this.state.configForm
                }
                const updatedConfigFormEement = {
                    ...updatedConfigForm['tableNamesSource']
                }
                const ElementConfig = {
                    ...updatedConfigFormEement['elementConfig']
                }
                ElementConfig.options = tableNamesSourceArr
                updatedConfigFormEement['elementConfig'] = ElementConfig
                updatedConfigForm['tableNamesSource'] = updatedConfigFormEement
                this.setState({
                    configForm: updatedConfigForm
                })
            }
    
    
            const tableNameTargetResponse = await getTableName(
                this.props.databaseConfigTargetId
            )
            let tableNamesTargetArr = []
            tableNamesTargetArr.push(
                { value: '', displayValue: 'AutoFill Table Name' }
            )
            if (tableNameTargetResponse.length > 0) {
                for (var index in tableNameTargetResponse) {
                    tableNamesTargetArr.push(
                        { value: tableNameTargetResponse[index], displayValue: tableNameTargetResponse[index] }
                    )
                }
                const updatedConfigForm = {
                    ...this.state.configForm
                }
                const updatedConfigFormEement = {
                    ...updatedConfigForm['tableNamesTarget']
                }
                const ElementConfig = {
                    ...updatedConfigFormEement['elementConfig']
                }
                ElementConfig.options = tableNamesTargetArr
                updatedConfigFormEement['elementConfig'] = ElementConfig
                updatedConfigForm['tableNamesTarget'] = updatedConfigFormEement
                this.setState({
                    configForm: updatedConfigForm
                })
            }


            // const response = await compareData( this.props.databaseConfigSourceId,
            //                                     this.state.configForm.tableNamesSource.value,
            //                                     this.props.databaseConfigTargetId ,
            //                                     this.state.configForm.tableNamesTarget.value,)
            // this.setState({
            //     tableDataSource:response['source'],
            //     tableDataTarget:response['target'],
            //     tableDataDifference: response['difference']
            // },() => {
            //     console.log("response" , this.state.tableDataDifference)
            // })
        }
    }

    inputChangehandler = (event, inputIdentifier) => {
        const updatedConfigForm = {
            ...this.state.configForm
        }
        const updatedConfigFormEement = {
            ...updatedConfigForm[inputIdentifier]
        }
        updatedConfigFormEement.value = event.target.value
        updatedConfigForm[inputIdentifier] = updatedConfigFormEement
        this.setState({
            configForm:updatedConfigForm
        })
    }

    formSubmitHandler = async (event) => {
        event.preventDefault()
        const formData = {};
        for(let formElementIdentifier in this.state.configForm){
            formData[formElementIdentifier] = this.state.configForm[formElementIdentifier].value
        }
        console.log("formData", formData)
        const response = await compareData(
            this.props.databaseConfigSourceId,
            this.state.configForm.tableNamesSource.value,
            this.props.databaseConfigTargetId,
            this.state.configForm.tableNamesTarget.value,
        );
        
        this.setState({
            tableDataSource:response['source'],
            tableDataTarget:response['target'],
            tableDataDifference: response['difference']
        },() => {
            console.log("response" , this.state.tableDataDifference)
        })
    }

    render() {

        const formElementsArray = [] ;
        for(let key in this.state.configForm){
            formElementsArray.push({
                id:key,
                config: this.state.configForm[key]
            });
        }

        return (
            <div>
                <form onSubmit={this.formSubmitHandler} style={{padding:"20px", float:'center'}}>
                     {
                         formElementsArray.map(formElement => ( 
                             <Input
                                key = {formElement.id}
                                label = {formElement.config.label}
                                elementType={formElement.config.elementType}
                                elementConfig = {formElement.config.elementConfig}
                                value = {formElement.config.value} 
                                style = {formElement.config.style}
                                changed = { (event) => this.inputChangehandler(event,formElement.id)}/>
                         ))
                    }
                    <br/>
                </form>
                    { this.props.databaseConfigSourceId == '' || this.props.databaseConfigTargetId == '' ? "Select Databases in the top bar" :
                    <div>
                        <DynamicTable tableJSONdata = {this.state.tableDataSource} heading={"Source Table Values"}></DynamicTable>
                        <DynamicTable tableJSONdata = {this.state.tableDataTarget} heading={"Target Table Values"} ></DynamicTable>
                        <DynamicTable tableJSONdata = {this.state.tableDataDifference}  heading={"Difference between source and Target tables"}></DynamicTable>
                    </div>
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

export default connect(mapStateToProps) (CompareData)
