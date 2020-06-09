import React, { Component } from 'react';
import { Route } from "react-router-dom";
import CompareData from './CompareData';
import SQLExecutor from './SQLExecutor';
import CompareSchema from './CompareSchema';
import CompareFiles from './CompareFiles';



class BodyComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }
    render() {
        return (
            <div style={{ margin: 10, fontSize: 20, display: 'contents' }}>
                <Route path="/" exact component={CompareSchema} />
                <Route path="/compareData" exact component={CompareData} />
                <Route path="/SQLExecutor" exact component={SQLExecutor} />
                <Route path="/compareFiles" exact component={CompareFiles} />
            </div>
        );
    }
}
export default BodyComponent
