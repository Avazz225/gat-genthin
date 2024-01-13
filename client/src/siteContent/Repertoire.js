import PageMapper from '../helpers/pageMapper';
import { jsonReader } from '../helpers/tools';
import './css/Repertoire.css';
import React from 'react';

class Repertoire extends React.Component{
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    async componentDidMount(){
        jsonReader("page_repertoire.json")
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

export default Repertoire;