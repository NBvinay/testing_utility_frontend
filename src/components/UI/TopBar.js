import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { Component } from 'react'
import {UserOutlined} from '@ant-design/icons';
import Input from './Input/Input';
import { getDatabaseForUser } from '../../api/backend_APIs';

class TopBar extends Component {

    constructor(props) {
        super(props)
        this.state = {

            ModalTextSource: "Content of the modal",

            visibleSource: false,
            confirmLoadingSource: false,

            visibleTarget: false,
            confirmLoadingTarget: false,

            dbSourceId:'' ,
            dbTargetId : '',

            // source        
            configFormSource: {
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
                databaseNames: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: '', displayValue: 'AutoFill Table Name', id:'' }
                        ]
                    },
                    value: '',
                    idValueBackend: "asd",
                    style: {}
                },
            },

            // target
            configFormTarget: {
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
                databaseNames: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: '', displayValue: 'AutoFill Table Name', id:'' }
                        ]
                    },
                    value: '',
                    idValueBackend: "asd",
                    style: {}
                }
            }
        }
    }

    showModalSource = () => {
        this.setState({
            visibleSource: true
        });
    };

    showModalTarget = () => {
        this.setState({
            visibleTarget: true
        });
    };

    handleOkSource = () => {
        this.setState({
            ModalTextSource: "The modal will be closed after two seconds",
            confirmLoadingSource: true
        });

        this.props.changeSourceDatabase(this.state.dbSourceId)

        this.setState({
            visibleSource: false,
            confirmLoadingSource: false,
        });

    };

    handleOkTarget = () => {
        this.setState({
            ModalTextTarget: "The modal will be closed after two seconds",
            confirmLoadingTarget: true
        });

        this.props.changeTargetDatabase(this.state.dbTargetId)

        this.setState({
            visibleTarget: false,
            confirmLoadingTarget: false,
        });

    };


    handleCancelSource = () => {
        console.log("Clicked cancel button");
        this.setState({
            visibleSource: false
        });
    };


    handleCancelTarget = () => {
        console.log("Clicked cancel button");
        this.setState({
            visibleTarget: false
        });
    };


    
    inputChangehandlerSource = async (event, inputIdentifier) => {

        const updatedConfigForm = {
            ...this.state.configFormSource
        }
        const updatedConfigFormEement = {
            ...updatedConfigForm[inputIdentifier]
        }
        updatedConfigFormEement.value = event.target.value
        updatedConfigForm[inputIdentifier] = updatedConfigFormEement
        this.setState({
            configFormSource: updatedConfigForm
        }, async () => {
            if (inputIdentifier === 'databaseType') {
                console.log(this.props.currentUser, this.state.configFormSource.databaseType.value)
                const DatabaseNamesResponse = await getDatabaseForUser(
                    this.props.currentUser,
                    this.state.configFormSource.databaseType.value,
                )
                let DatabaseNamesArr = []
                DatabaseNamesArr.push(
                    {value: '', displayValue: 'AutoFill Table Name', id:'' }
                )                
                for (var index in DatabaseNamesResponse) {
                    DatabaseNamesArr.push(
                        { 
                            value: DatabaseNamesResponse[index]['dbname'], 
                            displayValue: DatabaseNamesResponse[index]['dbname'], 
                            idValueBackend: DatabaseNamesResponse[index]['id']
                        }
                    )
                }
                const updatedConfigForm = {
                    ...this.state.configFormSource
                }
                const updatedConfigFormEement = {
                    ...updatedConfigForm['databaseNames']
                }
                const ElementConfig = {
                    ...updatedConfigFormEement['elementConfig']
                }
                ElementConfig.options = DatabaseNamesArr
                updatedConfigFormEement['elementConfig'] = ElementConfig
                updatedConfigForm['databaseNames'] = updatedConfigFormEement
                this.setState({
                    configFormSource: updatedConfigForm
                })
            }
        })

        if(inputIdentifier === "databaseNames"){

            for(let item in this.state.configFormSource['databaseNames']['elementConfig']['options']){
                if(event.target.value === this.state.configFormSource['databaseNames']['elementConfig']['options'][item]['value']){
                    let updatedId = this.state.dbSourceId
                    updatedId = this.state.configFormSource['databaseNames']['elementConfig']['options'][item]['idValueBackend']
                    this.setState({
                        dbSourceId:updatedId
                    })
                }
            }
        }
    }


    inputChangehandlerTarget = async (event, inputIdentifier) => {

        const updatedConfigForm = {
            ...this.state.configFormTarget
        }
        const updatedConfigFormEement = {
            ...updatedConfigForm[inputIdentifier]
        }
        updatedConfigFormEement.value = event.target.value
        updatedConfigForm[inputIdentifier] = updatedConfigFormEement
        this.setState({
            configFormTarget: updatedConfigForm
        }, async () => {
            if (inputIdentifier === 'databaseType') {
                console.log(this.props.currentUser, this.state.configFormTarget.databaseType.value)
                const DatabaseNamesResponse = await getDatabaseForUser(
                    this.props.currentUser,
                    this.state.configFormTarget.databaseType.value,
                )
                let DatabaseNamesArr = []
                DatabaseNamesArr.push(
                    {value: '', displayValue: 'AutoFill Table Name', id:'' }
                )                
                for (var index in DatabaseNamesResponse) {
                    DatabaseNamesArr.push(
                        { 
                            value: DatabaseNamesResponse[index]['dbname'], 
                            displayValue: DatabaseNamesResponse[index]['dbname'], 
                            idValueBackend: DatabaseNamesResponse[index]['id']
                        }
                    )
                }
                const updatedConfigForm = {
                    ...this.state.configFormTarget
                }
                const updatedConfigFormEement = {
                    ...updatedConfigForm['databaseNames']
                }
                const ElementConfig = {
                    ...updatedConfigFormEement['elementConfig']
                }
                ElementConfig.options = DatabaseNamesArr
                updatedConfigFormEement['elementConfig'] = ElementConfig
                updatedConfigForm['databaseNames'] = updatedConfigFormEement
                this.setState({
                    configFormTarget: updatedConfigForm
                })
            }
        })

        if(inputIdentifier === "databaseNames"){

            for(let item in this.state.configFormTarget['databaseNames']['elementConfig']['options']){
                if(event.target.value === this.state.configFormTarget['databaseNames']['elementConfig']['options'][item]['value']){
                    let updatedId = this.state.dbTargetId
                    updatedId = this.state.configFormTarget['databaseNames']['elementConfig']['options'][item]['idValueBackend']
                    this.setState({
                        dbTargetId:updatedId
                    })
                }
            }
        }
    }

    render() {
        const formElementsArraySource = [];
        for (let key in this.state.configFormSource) {
            formElementsArraySource.push({
                id: key,
                config: this.state.configFormSource[key]
            });
        }

        const formElementsArrayTarget = [];
        for (let key in this.state.configFormTarget) {
            formElementsArrayTarget.push({
                id: key,
                config: this.state.configFormTarget[key]
            });
        }

        return (
            <div className="background" style={{ float: 'right' }}>
                <Button type="primary" onClick={this.showModalSource} style={{ margin: 10 }}> 
                    {this.state.configFormSource.databaseNames.value} 
                    {this.props.databaseConfigSourceId} [source] 
                </Button>
                <Button type="primary" onClick={this.showModalTarget} style={{ margin: 10 }}>
                    {this.state.configFormTarget.databaseNames.value} 
                    {this.props.databaseConfigTargetId} [Target] 
                </Button>
                <Button type="dashed" style={{ margin: 10 }}>
                    {this.props.currentUser}<UserOutlined />
                </Button>

                <Modal
                    title="Change Source Database"
                    visible={this.state.visibleSource}
                    onOk={this.handleOkSource}
                    confirmLoading={this.state.confirmLoadingSource}
                    onCancel={this.handleCancelSource}
                    >
                    <div>
                        <form style={{ padding: "20px", float: 'center' }}>
                            {
                                formElementsArraySource.map(formElement => (
                                    <Input
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        style={formElement.config.style}
                                        changed={(event) => this.inputChangehandlerSource(event, formElement.id)} />
                                ))
                            }
                            <br />
                        </form>
                    </div>
                    <p>Select a new Database and click ok to change.</p>
                    <p>Close the box to retain old values.</p>
                </Modal>


                <Modal
                    title="Change Target Database"
                    visible={this.state.visibleTarget}
                    onOk={this.handleOkTarget}
                    confirmLoading={this.state.confirmLoadingTarget}
                    onCancel={this.handleCancelTarget}
                    >
                    <div>
                        <form style={{ padding: "20px", float: 'center' }}>
                            {
                                formElementsArrayTarget.map(formElement => (
                                    <Input
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        style={formElement.config.style}
                                        changed={(event) => this.inputChangehandlerTarget(event, formElement.id)} />
                                ))
                            }
                            <br />
                        </form>
                    </div>
                    <p>Select a new Database and click ok to change.</p>
                    <p>Close the box to retain old values.</p>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        databaseConfigSourceId: state.databaseConfigSourceId,
        databaseConfigTargetId: state.databaseConfigTargetId,
        currentUser: state.currentUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSourceDatabase: (id) => dispatch({ type: 'SOURCE', newId:id }),
        changeTargetDatabase: ( id ) => dispatch({ type: 'TARGET', newId:id })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);