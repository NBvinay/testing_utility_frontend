import '../App.css';
import 'antd/dist/antd.css';
import React, { Component } from 'react'
import Input from './UI/Input/Input';
import { getTableData, getTableName } from '../api/backend_APIs';
// import ResultCompareSchema from './ResultCompareSchema';
import DynamicTable from './UI/DynamicTable';
import { connect } from 'react-redux';


class DatabaseConfigDataCompareGUI extends Component {

    constructor(props) {
        super(props)

        this.state = {
            table1Data: {},
            table2Data: {},
            configForm1: {
                databaseType: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: 'DB Type', displayValue: 'DB Type' },
                            { value: 'sqlite', displayValue: 'sqlite' },
                            { value: 'mysql', displayValue: 'mysql' },
                            { value: 'oracle', displayValue: 'oracle' },
                            { value: 'teraData', displayValue: 'teraData' },
                            { value: 'db2', displayValue: 'db2' }
                        ]
                    },
                    value: '',
                    style: {}
                },
                userName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'user name'
                    },
                    value: '',
                    style: {}
                },
                userPassword: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'password'
                    },
                    value: '',
                    style: {}
                },
                address: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'domain : port'
                    },
                    value: ''
                },
                databaseName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'database name '
                    },
                    value: ''
                },
                tableNames: {
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

            configForm2: {
                databaseType: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: 'DB Type', displayValue: 'DB Type' },
                            { value: 'sqlite', displayValue: 'sqlite' },
                            { value: 'mysql', displayValue: 'mysql' },
                            { value: 'oracle', displayValue: 'oracle' },
                            { value: 'teraData', displayValue: 'teraData' },
                            { value: 'db2', displayValue: 'db2' }
                        ]
                    },
                    value: '',
                    style: {}
                },
                userName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'user name'
                    },
                    value: '',
                    style: {}
                },
                userPassword: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'password'
                    },
                    value: '',
                    style: {}
                },
                address: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'domain : port'
                    },
                    value: ''
                },
                databaseName: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'database name '
                    },
                    value: ''
                },
                tableNames: {
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

    inputChangehandler1 = async (event, inputIdentifier) => {
        const updatedConfigForm = {
            ...this.state.configForm1
        }
        const updatedConfigFormEement = {
            ...updatedConfigForm[inputIdentifier]
        }
        updatedConfigFormEement.value = event.target.value
        updatedConfigForm[inputIdentifier] = updatedConfigFormEement
        this.setState({
            configForm1: updatedConfigForm
        }, async () => {
            if (inputIdentifier === 'databaseName') {
                const tableNameResponse = await getTableName(
                    this.state.configForm1.databaseName.value,
                    this.state.configForm1.address.value,
                    this.state.configForm1.userName.value,
                    this.state.configForm1.userPassword.value,
                    this.state.configForm1.databaseType.value,
                )
                let tableNamesArr = []
                tableNamesArr.push(
                    { value: '', displayValue: 'AutoFill Table Name' }
                )
                if (tableNameResponse.length > 0) {
                    for (var index in tableNameResponse) {
                        tableNamesArr.push(
                            { value: tableNameResponse[index], displayValue: tableNameResponse[index] }
                        )
                    }
                    const updatedConfigForm = {
                        ...this.state.configForm1
                    }
                    const updatedConfigFormEement = {
                        ...updatedConfigForm['tableNames']
                    }
                    const ElementConfig = {
                        ...updatedConfigFormEement['elementConfig']
                    }
                    ElementConfig.options = tableNamesArr
                    updatedConfigFormEement['elementConfig'] = ElementConfig
                    updatedConfigForm['tableNames'] = updatedConfigFormEement
                    this.setState({
                        configForm1: updatedConfigForm
                    })
                }
            }
        })
    }

    formSubmitHandler1 = async (event) => {
        event.preventDefault()

        const formData = {};
        for (let formElementIdentifier in this.state.configForm1) {
            formData[formElementIdentifier] = this.state.configForm1[formElementIdentifier].value
        }
        const response = await getTableData(
            this.state.configForm1.databaseName.value,
            this.state.configForm1.address.value,
            this.state.configForm1.userName.value,
            this.state.configForm1.userPassword.value,
            this.state.configForm1.databaseType.value,
            this.state.configForm1.tableNames.value,
        );

        let updatedTable1Data = { ...this.state.table1Data };
        updatedTable1Data = response
        this.setState({
            table1Data: updatedTable1Data
        })
    }



    inputChangehandler2 = async (event, inputIdentifier) => {
        const updatedConfigForm = {
            ...this.state.configForm2
        }
        const updatedConfigFormEement = {
            ...updatedConfigForm[inputIdentifier]
        }
        updatedConfigFormEement.value = event.target.value
        updatedConfigForm[inputIdentifier] = updatedConfigFormEement
        this.setState({
            configForm2: updatedConfigForm
        }, async () => {
            if (inputIdentifier === 'databaseName') {
                const tableNameResponse = await getTableName(
                    this.state.configForm2.databaseName.value,
                    this.state.configForm2.address.value,
                    this.state.configForm2.userName.value,
                    this.state.configForm2.userPassword.value,
                    this.state.configForm2.databaseType.value,
                )
                let tableNamesArr = []
                tableNamesArr.push(
                    { value: '', displayValue: 'AutoFill Table Name' }
                )
                if (tableNameResponse.length > 0) {
                    for (var index in tableNameResponse) {
                        tableNamesArr.push(
                            { value: tableNameResponse[index], displayValue: tableNameResponse[index] }
                        )
                    }
                    const updatedConfigForm = {
                        ...this.state.configForm2
                    }
                    const updatedConfigFormEement = {
                        ...updatedConfigForm['tableNames']
                    }
                    const ElementConfig = {
                        ...updatedConfigFormEement['elementConfig']
                    }
                    ElementConfig.options = tableNamesArr
                    updatedConfigFormEement['elementConfig'] = ElementConfig
                    updatedConfigForm['tableNames'] = updatedConfigFormEement
                    this.setState({
                        configForm2: updatedConfigForm
                    })
                }
            }
        })
    }

    formSubmitHandler2 = async (event) => {
        event.preventDefault()

        const formData = {};
        for (let formElementIdentifier in this.state.configForm2) {
            formData[formElementIdentifier] = this.state.configForm2[formElementIdentifier].value
        }
        const response = await getTableData(
            this.state.configForm2.databaseName.value,
            this.state.configForm2.address.value,
            this.state.configForm2.userName.value,
            this.state.configForm2.userPassword.value,
            this.state.configForm2.databaseType.value,
            this.state.configForm2.tableNames.value,
        );

        let updatedTable2Data = { ...this.state.table2Data };
        updatedTable2Data = response
        this.setState({
            table2Data: updatedTable2Data
        })
    }

    render() {
        const formElementsArray1 = [];
        for (let key in this.state.configForm1) {
            formElementsArray1.push({
                id: key,
                config: this.state.configForm1[key]
            });
        }

        const formElementsArray2 = [];
        for (let key in this.state.configForm2) {
            formElementsArray2.push({
                id: key,
                config: this.state.configForm2[key]
            });
        }
        console.log(this.props.db1Config, this.props.db2Config)
        return (
            <div>
                <form onSubmit={this.formSubmitHandler1} style={{ padding: "20px", float: 'center' }}>
                    {
                        formElementsArray1.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                style={formElement.config.style}
                                changed={(event) => this.inputChangehandler1(event, formElement.id)} />
                        ))
                    }
                    <br />
                </form>

                <form onSubmit={this.formSubmitHandler2} style={{ padding: "20px", float: 'center' }}>
                    {   
                        formElementsArray2.map(formElement => (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                style={formElement.config.style}
                                changed={(event) => this.inputChangehandler2(event, formElement.id)} />
                        ))
                    }
                    <br />
                </form>
                <br></br>
                {/* <ResultCompareSchema resultJsonData={this.state.table1Data}></ResultCompareSchema>
                <ResultCompareSchema resultJsonData={this.state.table2Data}></ResultCompareSchema> */}
                First Table Values
                <DynamicTable tableJSONdata = {this.state.table1Data}></DynamicTable>
                <br /><br />
                Second Table Values
                <DynamicTable tableJSONdata = {this.state.table2Data}></DynamicTable>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        db1Config: state.databaseConfig1,
        db2Config: state.databaseConfig2
        }
    )
}

const mapDispatchToPops = dispatch => {
    return({
        onChangeDbConfig: () => {
            return (
                dispatch({
                    type: 'CHANGE'
                })
            )
        }
    })
}

export default connect(mapStateToProps,mapDispatchToPops)(DatabaseConfigDataCompareGUI);
