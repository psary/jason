import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import './JsonAccepter.css';
import { withRouter } from 'react-router-dom';

class JsonAccepter extends Component {

    constructor(props){
        super(props);
        this.state = {
            json: 
            JSON.stringify({
                'quiz': {
                    'sport': {
                        'q1': {
                            'question': 'Which one is correct team name in NBA?',
                            'options': [
                                'New York Bulls',
                                'Los Angeles Kings',
                                'Golden State Warriros',
                                'Huston Rocket'
                            ],
                            'answer': 'Huston Rocket'
                        }
                    },
                    'maths': {
                        'q1': {
                            'question': '5 + 7 = ?',
                            'options': [
                                '10',
                                '11',
                                '12',
                                '13'
                            ],
                            'answer': '12'
                        },
                        'q2': {
                            'question': '12 - 8 = ?',
                            'options': [
                                '1',
                                '2',
                                '3',
                                '4'
                            ],
                            'answer': '4'
                        }
                    }
                }
            }),
            disabled : true,
            hint: 'Insert your json content'
        }
    }

    handleChange(e) {
        let json = e.target.value;

        let hint = '###';
        if(json === '' || json === undefined){
            hint = 'Insert your json content';
        } else if(this.isJsonString(json)){
            hint = "Valid JSON ! Let's validate :)";
        } else {
            hint = 'This is not a json :/'
        }
        this.setState({json: json, hint: hint})
        this.next(json);
    }

    isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    next(json){
        this.props.update(json)
    }



    render() {
        return (
            <div className="json-accepter-container">
                <TextField
                    id="outlined-multiline-flexible"
                    label="Json"
                    multiline
                    rowsMax="99"
                    value={this.state.json}
                    onChange={this.handleChange.bind(this)}
                    margin="normal"
                    className="json-accepter"
                    helperText={this.state.hint}
                    variant="outlined"
                />
            </div>
            
        );
    }
}

export default withRouter(JsonAccepter);
