import React from 'react';
import PageRenderer from './PageRenderer';

class Repertoire extends React.Component{
    render(){
        return(
            <PageRenderer 
                page={this.props.page} 
                adminComponentsVisible={this.props.adminComponentsVisible} 
                deleteMode={this.props.deleteMode} 
                mainType={"repertoire"}
            />
        );
    }
}

export default Repertoire;