import React from "react"
import "./ImageSelector.css"

class ImageSelector extends React.Component{
    constructor(props){
        super();
        this.state = {
            imageData: []
        }
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_CM_API+'get_available_images', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'source': process.env.REACT_APP_SYSTEM_ID,
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        return response.json();
        })
        .then((data) => {
            console.log(data)
            this.setState({
                imageData: data.objects
            })
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }


    render(){
        return(
            <div className='imageSelectorContainer'>
                <div className="innerSelector">
                    <div className="imageSelectorInfo">Hinweis: Es können keine Bilder aus automatischen Galerien genutzt werden</div>
                    <div className="ccmGallery">
                        {(this.state.imageData.length !== 0)?
                        <>
                        {this.state.imageData.map(data => (
                            <div className='ccmGalleryItem'>
                                <img src= {process.env.REACT_APP_CDN_URL+data} onClick={() => {this.props.changeProperty(data, this.props.index, 'src')}} onContextMenu={(e) => {e.preventDefault(); }} className='ccmGalleryImage'/>
                            </div>
                        ))}
                        </>:
                        <div className="cmmGalleryInfo">
                            Aktuell sind keine Bilder verfügbar.<br/>
                            Es müssen erst Bilder hochgeladen werden.
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}   

export default ImageSelector