import React from "react";
import './css/Gallery.css';

var hanssachs;
var hinter;
var kinder;
var lesungen;
var maerchen;
var veranstaltungen;

function Gallery(){

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("https://gcwiw43c74.execute-api.eu-central-1.amazonaws.com/overview")
        .then((res) => res.json())
        .then((data) => setData(JSON.parse(data.body)))
    }, []);  

    assignVariables(data);
    return(
        <div className="content">
            <h1>Galerie</h1>
            <div className='content-pane texttype'>
                <p>Unsere Galerie ist in die folgenden Kategorien eingeteilt.<br></br> 
                Sehen Sie sich gern um.</p>
            </div>
            <hr className="blue"></hr>
            <h2>Märchenauftritte</h2>
            <div className='content-pane texttype'>
                <p>Hier finden Sie Bilder zu den Märchen der letzten Jahre</p>
                {readySnippets(maerchen)}
            </div>
            <hr className="blue"></hr>
            <h2>Straßentheater</h2>
            <div className='content-pane texttype'>
                <p>Hier finden Sie Bilder zu unseren Straßentheaterauftritten</p>
                {readySnippets(hanssachs)}
            </div>

            
            <hr className="blue"></hr>
            <h2>Andere Veranstaltungen - Lesungen und Abendprogramm</h2>
            <div className='content-pane texttype'>
                <p>Hier finden Sie Bilder zu weiteren Auftritten und Vorführungen des gat</p>
                {readySnippets(veranstaltungen)}
            </div>

            
            <hr className="blue"></hr>
            <h2>Kindertheater</h2>
            <div className='content-pane texttype'>
                <p>Hier finden Sie Bilder zu den Auftritten der gat-Kinder in den letzten Jahren</p>
                {readySnippets(kinder)}
            </div>

            <hr className="blue"></hr>
            <h2>Hinter den Kulissen - Schminken, Technik und Aufbau Bühnenbild</h2>
            <div className='content-pane texttype'>
                <p>Hier finden Sie Bilder zu einigem, was hinter der Bühne los ist.</p>
                {readySnippets(hinter)}
            </div>
        </div>
    );
}

function readySnippets(target){
    return(
        <div className="galleryContainer">
            <div className="galleryItem1">
                <img src={!target ? "images/regie-ecki-placeholder.jpg" : target[3]} className="galleryImage"></img>
            </div>
            <div className="galleryItem2">
                <img src={!target ? "images/regie-ecki-placeholder.jpg" : target[2]} className="galleryImage"></img>
            </div>
            <div className="galleryItem3">
                <img src={!target ? "images/regie-ecki-placeholder.jpg" : target[1]} className="galleryImage"></img>
                <a href={!target ? "#/" : "#/"+target[0]} className="galleryLink">
                    <div className="viewXMore">
                            weitere {!target ? "0" : target[4]} Bilder ansehen
                    </div>
                </a>
            </div>
        </div>
    )
}

async function assignVariables(data){
    for (let i = 0; i< data.length; i++){
        switch(data[i][0]){
            case "hanssachs":
                hanssachs = data[i];
            break;
            case "hinter-den-kulissen":
                hinter = data[i];
            break;
            case "kinder-gat":
                kinder = data[i];
            break;
            case "lesungen":
                lesungen = data[i];
            break;
            case "maerchen":
                maerchen = data[i];
            break;
            case "veranstaltungen":
                veranstaltungen = data[i];
        }
    }
}

export default Gallery;