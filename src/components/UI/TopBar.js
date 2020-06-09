import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal,message } from 'antd';
import { connect } from 'react-redux';
import { Component } from 'react'
import {UserOutlined , DatabaseTwoTone, PlusSquareTwoTone} from '@ant-design/icons';
import Input from './Input/Input';
import { getDatabaseForUser, addNewDatabaseConfiguration, addNewUser } from '../../api/backend_APIs';

class TopBar extends Component {

    constructor(props) {
        super(props)
        this.state = {

            ModalTextSource: "Content of the modal",

            visibleUserForm: false,
            confirmLoadingUserForm : false,

            visible: false,
            confirmLoading: false,

            visibleSource: false,
            confirmLoadingSource: false,

            visibleTarget: false,
            confirmLoadingTarget: false,

            dbSourceId:'' ,
            dbTargetId : '',
            
            //add new User
            configUserForm: {
                userName: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder : 'user name'
                    },
                    value: '',
                    style:{width:'80%', padding:'10px'}
                },
                userPassword: {
                   elementType : 'input',
                   elementConfig: {
                       type: 'password',
                       placeholder : 'password'
                   },
                   value: '',
                   style:{width:'80%', padding:'10px'}
               },
            },

            //add new config
            configForm:{
                databaseType: {
                    elementType : 'select',
                    elementConfig: {
                        options:[
                            {value:'DB Type' , displayValue:'DB Type'},
                            {value:'sqlite' , displayValue:'sqlite'},
                            {value:'mysql' , displayValue:'mysql'},
                            {value:'oracle' , displayValue:'oracle'},
                            {value:'teraData' , displayValue:'teraData'},
                            {value:'db2' , displayValue:'db2'}
                        ]
                    },
                    value: '',
                    style:{width:'80%', padding:'10px'}
                },
                 userName: {
                     elementType : 'input',
                     elementConfig: {
                         type: 'text',
                         placeholder : 'user name for DB'
                     },
                     value: '',
                     style:{width:'80%', padding:'10px'}
                 },
                 userPassword: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder : 'password for DB'
                    },
                    value: '',
                    style:{width:'80%', padding:'10px'}
                },
                address: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder : 'domain : port'
                    },
                    value: '',
                    style:{width:'80%', padding:'10px'}
                },
                databaseName: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder : 'database name '
                    },
                    value: '',
                    style:{width:'80%', padding:'10px'}

                },
                description:{
                    elementType : 'textarea',
                    elementConfig: {
                        type: 'text',
                        placeholder : 'description'
                    },
                    value: '',
                    style:{width:'80%', padding:'10px', minHeight:50}
                },
            },

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
                            { value: '', displayValue: 'AutoFill Database Name', id:'' }
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
                            { value: '', displayValue: 'AutoFill Database Name', id:'' }
                        ]
                    },
                    value: '',
                    idValueBackend: "asd",
                    style: {}
                }
            }
        }
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };

    showModalUserForm = () => {
        this.setState({
            visibleUserForm: true,
        });
    };
    
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


    handleOk = async (event) => {
        event.preventDefault()
        const formData = {};
        for(let formElementIdentifier in this.state.configForm){
            formData[formElementIdentifier] = this.state.configForm[formElementIdentifier].value
        }

        const response = await addNewDatabaseConfiguration(
            this.props.currentUser,
            this.state.configForm.databaseName.value,
            this.state.configForm.databaseType.value,
            this.state.configForm.description.value,
            this.state.configForm.userName.value,
            this.state.configForm.userPassword.value,
            this.state.configForm.address.value, 
        );
        if (response === "FAIL") {
            message.error("Couldnt add "+this.state.configForm.databaseName.value+" to your configurations!\nCheck the paramaters again.", 5)
        }
        if(response === 'duplicate'){
            message.warning(this.state.configForm.databaseName.value+" already present in your configurations", 3)
            this.setState({
                visible: false,
            });

        }
        else {
            message.success("Successfully added "+this.state.configForm.databaseName.value+" to your configurations!", 3)
            this.setState({
                visible: false,
            });
        }
        console.log(response)
    };

    handleOkUserForm = async (event) => {
        event.preventDefault()
        const formData = {};
        for(let formElementIdentifier in this.state.configUserForm){
            formData[formElementIdentifier] = this.state.configUserForm[formElementIdentifier].value
        }

        const response = await addNewUser(
            this.state.configUserForm.userName.value,
            this.state.configUserForm.userPassword.value,
        );
        if (response != "fail") {
            message.success("Successfully added "+this.state.configUserForm.userName.value+". Logged In!", 3)
            this.setState({
                visibleUserForm: false,
            }, () => {
                this.props.changeCurrentUser(this.state.configUserForm.userName.value)
            });
        }
        else {
            message.warning(this.state.configUserForm.userName.value+" already Present. Logged in!", 5)
            this.setState({
                visibleUserForm: false,
            }, () => {
                this.props.changeCurrentUser(this.state.configUserForm.userName.value)
            })
        }
        console.log(response)
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

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleCancelUserForm = () => {
        this.setState({
            visibleUserForm: false,
        });
    }

    handleCancelSource = () => {
        console.log("Clicked cancel button");
        this.setState({
            visibleSource: false
        })
    }

    handleCancelTarget = () => {
        console.log("Clicked cancel button");
        this.setState({
            visibleTarget: false
        });
    };


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

    inputChangehandlerUserForm = (event, inputIdentifier) => {
        const updatedConfigForm = {
            ...this.state.configUserForm
        }
        const updatedConfigFormEement = {
            ...updatedConfigForm[inputIdentifier]
        }
        updatedConfigFormEement.value = event.target.value
        updatedConfigForm[inputIdentifier] = updatedConfigFormEement
        this.setState({
            configUserForm:updatedConfigForm
        })
    }


    
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
                    {value: '', displayValue: 'AutoFill Database Name', id:'' }
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
                    {value: '', displayValue: 'AutoFill Database Name', id:'' }
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

        const formElementsArray = [] ;
        for(let key in this.state.configForm){
            formElementsArray.push({
                id:key,
                config: this.state.configForm[key]
            });
        }

        const formElementsArrayUserForm = [] ;
        for(let key in this.state.configUserForm){
            formElementsArrayUserForm.push({
                id:key,
                config: this.state.configUserForm[key]
            });
        }


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

                <Button type="primary" onClick={this.showModal} style={{ margin: 10}}> 
                    Add new Database<PlusSquareTwoTone /><DatabaseTwoTone />
                </Button>

                <Button type="primary" onClick={this.showModalSource} style={{ margin: 10 }}> 
                    {this.state.configFormSource.databaseNames.value} 
                    {this.props.databaseConfigSourceId} [source] 
                </Button>

                <Button type="primary" onClick={this.showModalTarget} style={{ margin: 10 }}>
                    {this.state.configFormTarget.databaseNames.value}  
                    {this.props.databaseConfigTargetId} [Target] 
                </Button>

                <Button type="primary" onClick={this.showModalUserForm} style={{ margin: 10 }}>
                    {this.props.currentUser}<UserOutlined />
                </Button>

                <Modal
                    title="Add a new Database"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                    >
                    <div>
                        <form style={{ padding: "20px", float: 'center' }}>
                            {
                                formElementsArray.map(formElement => (
                                    <Input
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        style={formElement.config.style}
                                        changed={(event) => this.inputChangehandler(event, formElement.id)} />
                                ))
                            }
                            <br />
                        </form>
                    </div>
                    <p>Fille in the above fields to add a new configuration.</p>
                </Modal>


                <Modal
                    title="Add a new User"
                    visible={this.state.visibleUserForm}
                    onOk={this.handleOkUserForm}
                    confirmLoading={this.state.confirmLoadingUserForm}
                    onCancel={this.handleCancelUserForm}
                    >
                    <div>
                        <form style={{ padding: "20px", float: 'center' }}>
                            {
                                formElementsArrayUserForm.map(formElement => (
                                    <Input
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        style={formElement.config.style}
                                        changed={(event) => this.inputChangehandlerUserForm(event, formElement.id)} />
                                ))
                            }
                            <br />
                        </form>
                    </div>
                    <p>Fille in the above fields to add a new configuration.</p>
                </Modal>

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
        changeTargetDatabase: ( id ) => dispatch({ type: 'TARGET', newId:id }),
        changeCurrentUser:(username) => dispatch({type:'ADD USER', newUser:username})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);