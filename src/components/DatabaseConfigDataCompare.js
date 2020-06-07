import '../App.css';
import 'antd/dist/antd.css';
import React, { Component } from 'react'
import Input from './UI/Input/Input';
import { compareData } from '../api/backend_APIs';
import DynamicTable from './UI/DynamicTable';

class DatabaseConfigDataCompare extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            comparisionResult:{},
             configForm:{
                // _left
                databaseType_left: {
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
                    style : {}
                },
                 userName_left: {
                     elementType : 'input',
                     elementConfig: {
                         type: 'text',
                         placeholder : 'user name'
                     },
                     value: '',
                     style : {}
                 },
                 userPassword_left: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder : 'password'
                    },
                    value: '',
                    style : {}
                },
                address_left: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder : 'domain : port'
                    },
                    value: ''
                },
                databaseName_left: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder : 'database name '
                    },
                    value: ''
                },
                sqlQuery_left:{
                    elementType: 'textarea',
                    elementConfig: {
                        type:'text',
                        placeholder:'enter query here'
                    },
                    value:'Ener Query Here',
                    style:{}
                },
                
               // _right
                databaseType_right: {
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
                    style : {}
                },
                 userName_right: {
                     elementType : 'input',
                     elementConfig: {
                         type: 'text',
                         placeholder : 'user name'
                     },
                     value: '',
                     style : {}
                 },
                 userPassword_right: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder : 'password'
                    },
                    value: '',
                    style : {}
                },
                address_right: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder : 'domain : port'
                    },
                    value: ''
                },
                databaseName_right: {
                    elementType : 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder : 'database name '
                    },
                    value: ''
                },
                sqlQuery_right:{
                    elementType: 'textarea',
                    elementConfig: {
                        type:'text',
                        placeholder:'enter query here'
                    },
                    value:'Ener Query Here',
                    style:{}
                },
                submit:{
                    elementType : 'input',
                    elementConfig: {
                        type:'submit',
                    },
                    value:'Configure',
                    style:{}
                },
             }
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
            this.state.configForm.databaseName_left.value,
            this.state.configForm.address_left.value, 
            this.state.configForm.userName_left.value,
            this.state.configForm.userPassword_left.value,
            this.state.configForm.databaseType_left.value,
            this.state.configForm.sqlQuery_left.value,
            
            this.state.configForm.databaseName_right.value,
            this.state.configForm.address_right.value, 
            this.state.configForm.userName_right.value,
            this.state.configForm.userPassword_right.value,
            this.state.configForm.databaseType_right.value,
            this.state.configForm.sqlQuery_right.value);
        
        let updatedComparisionResult = {...this.state.comparisionResult};
        updatedComparisionResult = response
        this.setState({
            comparisionResult:updatedComparisionResult
        },() => {
            console.log("response" , this.state.comparisionResult)
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
            <div  >
               
                <form onSubmit={this.formSubmitHandler} style={{padding:"20px", float:'center'}}>
                     {
                         formElementsArray.map(formElement => ( 
                             <Input 
                                key = {formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig = {formElement.config.elementConfig}
                                value = {formElement.config.value} 
                                style = {formElement.config.style}
                                changed = { (event) => this.inputChangehandler(event,formElement.id)}/>
                         ))
                    }
                    <br/>
                </form>
                <br></br>
                {/* <ResultCompareSchema resultJsonData = {this.state.comparisionResult}></ResultCompareSchema> */}
                Difference between data fetched from two queries is: 
                <DynamicTable tableJSONdata={this.state.comparisionResult}></DynamicTable>
            </div>
        )
    }
}

export default DatabaseConfigDataCompare