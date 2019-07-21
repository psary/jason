import React, { Component } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import './JsonObject.css'
import { isArray, isString, isNumber } from 'util';

class JsonObject extends Component {

    constructor(props){
        super(props);
        this.state = {
            json: this.props.json
        }
    }

    isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    makeObjectRender(value, key){
        // console.log("key: "+key+" - value: "+value)
        // console.log(this.state.json[value])
        if(value !== 0 && this.state.json[value]) {
            return (
                <div>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {key+' - '+value} 
                            </Typography>
                            <JsonObject json={this.state.json[value]} />
                        </CardContent>
                    </Card>
                </div>
            );
        } else {
            return ''
        }
    }

    makeRender(){
        // console.log(this.state.json);
         if(!isArray(this.state.json) && !isString(this.state.json) && !isNumber(this.state.json)) {
             let k = Object.keys(this.state.json)
             let res = k.map((value, key) => { return this.makeObjectRender(value, key) })
            return ( res )
        } else {
            return this.state.json;
        }
    }

    render() {
        return (
            <div className="json-object-container">
                {this.makeRender()}
            </div>
            
        );
    }
}

export default JsonObject;
