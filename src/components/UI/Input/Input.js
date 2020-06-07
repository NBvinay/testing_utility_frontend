import React from 'react'
const Input = (props) => {
    let inputElement = null;

    switch(props.elementType) {
        case('input'):
            inputElement = <input {...props.elementConfig} value={props.value} onChange={props.changed} style = {props.style}/>
            break;
        case('textarea'):
            inputElement = <textarea {...props.elementConfig} value={props.value}  onChange={props.changed} style = {props.style}/>
            break
        case('select'):
            inputElement = <select value = {props.value} onChange={props.changed} style = {props.style}> 
                    { props.elementConfig.options.map(option =>( 
                            <option key={option.value} value={option.value}> 
                                {option.displayValue} 
                            </option>)
                        )}
                </select>
            break
        default:
            inputElement = <input  {...props.elementConfig} value={props.value} onChange={props.changed} style = {props.style}/>
            break
    }
    return (
        <div style={{padding:2}}>
            <label>{props.label}</label> 
            {inputElement}
        </div>
    )
}
export default Input;
