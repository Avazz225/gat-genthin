import ImagePopUp from '../../components/ImagePopUp';
import React from "react";
import FillImages from '../../components/GalleryItem'


class Hinterkulissen extends React.Component{
    constructor(){
        super();
        this.state = {
            data: [],
        }
    }

    async componentDidMount(){
        await fetch(process.env.REACT_APP_API_URL+"/kulissen")
        .then((res) => res.json())
        .then(res =>{
            this.setState({
                data:JSON.parse(res.body).reverse()
            })
        })
    }

    render(){
        return(
            <div className="content">
                <h1>Galerie - Hinter den Kulissen</h1>
                    <ImagePopUp/>
                    <div className='content-pane texttype paddingtop1em'>
                        <div className='galleryContainer'>    
                            <FillImages data={this.state.data}/>
                        </div> 
                    </div>
            </div>
        );
    }
}

export default Hinterkulissen;