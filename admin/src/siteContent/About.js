import PageMapper from '../helpers/pageMapper';
import { jsonReader } from '../helpers/tools';
import React from 'react';

class About extends React.Component{
    constructor(){
        super();
        this.state = {
            source: "page_about.json",
            data: []
        }
    }

    async componentDidMount(){
        jsonReader(this.state.source)
        .then(result => this.setState({
            data: result
        })
        )
    }

    render(){
        return(
            <PageMapper data={this.state.data} adminComponentsVisible={this.props.adminComponentsVisible}/>
        );
    }
}

export default About;