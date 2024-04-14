import React from 'react';
import PageRenderer from './PageRenderer';

class About extends React.Component{
    render(){
        return(
            <PageRenderer 
                page={this.props.page} 
                adminComponentsVisible={this.props.adminComponentsVisible} 
                deleteMode={this.props.deleteMode} 
                mainType={"about"}
            />
        );
    }
}

export default About;