import React from "react";
import { BaseContainer, TextContainer } from "../atoms/ContentContainers";
import { Heading, NewLine, Text } from "../atoms/TextContainers";
import { HorizontalRow } from "../atoms/Arrangement";

var hanssachs;
var hinter;
var kinder;
var lesungen;
var maerchen;
var veranstaltungen;

function Gallery(){

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+"/overview")
        .then((res) => res.json())
        .then((data) => setData(JSON.parse(data.body)))
    }, []);  

    assignVariables(data);
    return(
        <BaseContainer>
            <Heading text="Galerie"/>
            <TextContainer>
                <Text text="Unsere Galerie ist in die folgenden Kategorien eingeteilt."/>
                <NewLine/>
                <Text text="Sehen Sie sich gern um."/>
            </TextContainer>
            <HorizontalRow blue={true}/>

            <Heading type={2} text="Märchenauftritte"/>
            <TextContainer>
                <Text text="Hier finden Sie Bilder zu den Märchen der letzten Jahre"/>
                <NewLine/>
                <NewLine/>
                {readySnippets(maerchen)}
            </TextContainer>

            <HorizontalRow blue={true}/>
            <Heading type={2} text="Straßentheater"/>
            <TextContainer>
                <Text text="Hier finden Sie Bilder zu unseren Straßentheaterauftritten"/>
                <NewLine/>
                <NewLine/>
                {readySnippets(hanssachs)}
            </TextContainer>
            
            <HorizontalRow blue={true}/>
            <Heading type={2} text="Andere Veranstaltungen - Lesungen und Abendprogramm"/>
            <TextContainer>
                <Text text="Hier finden Sie Bilder zu weiteren Auftritten und Vorführungen des gat"/>
                <NewLine/>
                <NewLine/>
                {readySnippets(veranstaltungen)}
            </TextContainer>
            
            <HorizontalRow blue={true}/>
            <Heading type={2} text="Kindertheater"/>
            <TextContainer>
                <Text text="Hier finden Sie Bilder zu den Auftritten der gat-Kinder in den letzten Jahren"/>
                <NewLine/>
                <NewLine/>
                {readySnippets(kinder)}
            </TextContainer>

            <HorizontalRow blue={true}/>
            <Heading type={2} text="Hinter den Kulissen - Schminken, Technik und Aufbau Bühnenbild"/>
            <TextContainer>
                <Text text="Hier finden Sie Bilder zu einigem, was hinter der Bühne los ist."/>
                <NewLine/>
                <NewLine/>
                {readySnippets(hinter)}
            </TextContainer>
        </BaseContainer>
    );
}

function readySnippets(target){
    return(
        <div className="galleryContainer">
            <div className="galleryItem1">
                <img src={!target ? process.env.REACT_APP_CDN_URL+"regie-ecki-placeholder.jpg" : process.env.REACT_APP_CDN_URL+target[3]} className="galleryImage"></img>
            </div>
            <div className="galleryItem2">
                <img src={!target ? process.env.REACT_APP_CDN_URL+"regie-ecki-placeholder.jpg" : process.env.REACT_APP_CDN_URL+target[2]} className="galleryImage"></img>
            </div>
            <div className="galleryItem3">
                <img src={!target ? process.env.REACT_APP_CDN_URL+"regie-ecki-placeholder.jpg" : process.env.REACT_APP_CDN_URL+target[1]} className="galleryImage"></img>
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
    if (!data){return}
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