import PageMapper from '../helpers/pageMapper';
import { jsonReader } from '../helpers/tools';
import React from 'react';

class Contact extends React.Component{
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    async componentDidMount(){
        jsonReader("page_contact.json")
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

export default Contact;