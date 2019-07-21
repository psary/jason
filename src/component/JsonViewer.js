import React, { Component } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import './JsonViewer.css'
import JsonObject from './json/JsonObject';
import MaterialTable from 'material-table';
import { isArray, isString, isNumber } from 'util';

class JsonViewer extends Component {

    constructor(props){
        super(props);
        this.IdCount = 0;
    }

    putJsonObjectIfNeeded(){
        console.log(this.props.json)
        if(this.isJsonString(this.props.json)){
            console.log("parseable")
            return (
                <JsonObject json={JSON.parse(this.props.json)} />
            );
        }
        else return '';
    }

    parseChildren(parentId, data, depth){
        let res = []
        if(!isArray(data) && !isString(data) && !isNumber(data)) {
            let k = Object.keys(data);
            k.forEach((value, key) => {
                this.IdCount++;
                res.push({parentId: parentId, id: this.IdCount, value: value, depth:depth+1})
                res = res.concat(this.parseChildren(this.IdCount, data[value], depth+1))
            });
        } else if(isArray(data)){
            data.forEach((value, key) => {
                this.IdCount++;
                res.push({parentId: parentId, id: this.IdCount, value: value, depth: depth+1})
            })
        } else {
            this.IdCount++;
            res.push({parentId: parentId, id: this.IdCount, value: data, depth:depth+1})
        }
        return res;

    }

    putNewJsonObjectIfNeeded(){
        if(this.isJsonString(this.props.json)){
            let data = this.parseChildren(this.IdCount, JSON.parse(this.props.json), 0)
            console.log(data)

            return (
                <MaterialTable
                    title="Nope"
                    data={data}
                    columns={[
                        {
                            title: 'Value', 
                            field: 'value', 
                            render: rowData => {return (<Typography variant="body1" gutterBottom className={"depth"+rowData.depth}>{rowData.value}</Typography>)}
                        }
                    ]}
                    //<img src={rowData.url} style={{width: 50, borderRadius: '50%'}}/>
                    parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                    editable={{
                    isEditable: rowData => rowData.name !== "z", // only name(a) rows would be editable
                    isDeletable: rowData => rowData.name !== "z", // only name(a) rows would be deletable
                    // onRowAdd: newData =>
                    //     new Promise((resolve, reject) => {
                    //         setTimeout(() => {
                    //             {
                    //                 /* const data = this.state.data;
                    //                 data.push(newData);
                    //                 this.setState({ data }, () => resolve()); */
                    //             }
                    //             resolve();
                    //         }, 1000);
                    //     }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    /* const data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data[index] = newData;                
                                    this.setState({ data }, () => resolve()); */
                                }
                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    /* let data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data.splice(index, 1);
                                    this.setState({ data }, () => resolve()); */
                                }
                                resolve();
                            }, 1000);
                        })
                    }}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            )
        }
        else return '';
    }

    isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="json-viewer-container">
                {/* {this.putJsonObjectIfNeeded()} */}
                {this.putNewJsonObjectIfNeeded()}
            </div>
            
        );
    }
}

export default JsonViewer;
