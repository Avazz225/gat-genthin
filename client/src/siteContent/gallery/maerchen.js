import React from "react";
import ImagePopUp from '../../components/ImagePopUp';
import FillImages from '../../components/GalleryItem';

import { getValue, jsonReader } from '../../helpers/tools';

class Maerchen extends React.Component {
    constructor(){
        super();
        this.state = {
            data: [],
            replacementValues: {}
        }
    }

    async componentDidMount(){
        await fetch(process.env.REACT_APP_API_URL+"/maerchen")
        .then((res) => res.json())
        .then(res =>{
            this.setState({
                data:JSON.parse(res.body).reverse(),
            })
        })

        jsonReader("maerchen.json")
        .then(result => this.setState({
            replacementValues: result
        })
        )
    }

    render(){
        return(
            <div className="content">
                <h1>Galerie - Märchen</h1>
                    <ImagePopUp/>
                    <FillGallery 
                        data={this.state.data} 
                        replacementValues={this.state.replacementValues} 
                    />
            </div>
        )
    }
}

const FillGallery = ({data, replacementValues}) => ( 
    <>
    {data.map((data, index) => (
        <><div className='content-pane texttype'>
            <details open={index === 0}>
                <summary>{getValue(data[0], replacementValues)}</summary>
                <div className='galleryContainer'>
                    <FillImages data={data.slice(1)}/>
                </div>
            </details>
        </div><br/>
        </>
    ))}
    </>
)

export default Maerchen;