import './css/About.css';
import PageMapper from '../helpers/pageMapper';
import { jsonReader } from '../helpers/tools';
import React from 'react';

class About extends React.Component{
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    async componentDidMount(){
        jsonReader("page_about.json")
        .then(result => this.setState({
            data: result
        })
        )
    }

    render(){
        return(
            <PageMapper data={this.state.data}/>
        );
    }
}

export default About;