
import React, { Component } from 'react';
import JsonAccepter from './JsonAccepter.js';
import JsonViewer from './JsonViewer.js';
import './JsonApp.css';
import { ExpansionPanel, ExpansionPanelSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class JsonApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            expanded: 'raw',
            json: undefined
        }
    }

    handleChange(name){
        if(this.state.expanded === name){
            this.setState({expanded: ''});
        } else {
            this.setState({expanded: name});
        }
    }

    updateJson(json){
        console.log("here")
        this.setState({json: json});
    }

    render() {
        return (
            <div className="json-accepter-container">
                <ExpansionPanel square defaultExpanded>
                    <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                        <Typography>Raw JSON</Typography>
                    </ExpansionPanelSummary>
                    <JsonAccepter update={this.updateJson.bind(this)}></JsonAccepter>
                </ExpansionPanel>
                <ExpansionPanel square >
                    <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                        <Typography>JSON</Typography>
                    </ExpansionPanelSummary>
                    <JsonViewer json={this.state.json}></JsonViewer>
                </ExpansionPanel>
            </div>
            
        );
    }
}

export default JsonApp;

