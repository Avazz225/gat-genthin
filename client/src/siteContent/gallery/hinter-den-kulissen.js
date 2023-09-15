import ImagePopUp from '../../components/ImagePopUp';
import '../css/Gallery.css';
import React from "react";
var target;

function Hinterkulissen(){

    const [rerender, setRerender] = React.useState(false);
    React.useEffect(() => {
        const loader = async () => {
            var data = await fetch("https://gcwiw43c74.execute-api.eu-central-1.amazonaws.com/kulissen").then((res) => res.json())
            var htString = fillImages(JSON.parse(data.body))
            setTarget(htString)
            setRerender(!rerender);
        };
        loader();    
    }, []);

    return(
        <div className="content">
            <h1>Galerie - Hinter den Kulissen</h1>
                <ImagePopUp/>
                <div className='content-pane texttype paddingtop1em'>
                    <div className='galleryContainer' dangerouslySetInnerHTML={{__html: target}} />     
                </div>
        </div>
    );

    function fillImages(data){
        //console.log(data.length)
        var htString = "";
        
        for (let i = 0; i<data.length; i++){
            htString += "<div class='genericGalleryItem'><img src= " + data[i] + '? images/regie-ecki-placeholder.jpg :'+ data[i]+"} onClick=\"document.getElementById('fullScreen').setAttribute('src',this.src);document.getElementById('fullScreenPos').style.visibility='visible';\" class='subGalleryImage'></img></div>"
        }
        
        return htString;
    }
    
    function setTarget(htString){
        target = htString;
    }

}

export default Hinterkulissen;