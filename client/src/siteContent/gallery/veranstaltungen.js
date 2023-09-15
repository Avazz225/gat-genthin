import ImagePopUp from '../../components/ImagePopUp';
import '../css/Gallery.css';
import React from "react";
var target;

function replaceAfterList(toReplace){

        switch(toReplace){
// Hier werden die Anzeigenamen nach den Ordernamen festgelegt.
// Ein neuer Eintrag wird erstellt indem nach "case" der Ordnername Eingetragen wird und nach "return" der Anzeigename.
            case "DinnerForFiveUndAndere":
                return "Dinner for five und andere Katastrophen"
            case "keinenZweifel":
                return "Da kann es keinen Zweifel geben! - Ein Heinz-Erhardt-Abend"
            case "Missverstaendnisse":
                return "Missverst&auml;ndnisse zwischen Mann und Frau"
            case "Spuk":
                return "Spuken, Angst machen, Erschrecken.."
            case "Valentinstag":
                return "Valentinstagslesung"
        
        }
    return "Undefiniert!";
}


function Veranstaltungen(){

    const [rerender, setRerender] = React.useState(false);
    React.useEffect(() => {
        const loader = async () => {
            var data = await fetch("https://gcwiw43c74.execute-api.eu-central-1.amazonaws.com/events").then((res) => res.json())
            var htString = fillImages(JSON.parse(data.body))
            setTarget(htString)
            setRerender(!rerender);
        };
        loader();    
    }, []);

    return(
        <div className="content">
            <h1>Galerie - Andere Veranstaltungen</h1>
                <ImagePopUp/>
                <div dangerouslySetInnerHTML={{__html: target}} />     
        </div>
    );
}

function fillImages(data){
    //console.log(data.length)
    var htString = "";
    for (let j = 0; j< data.length; j++){
        htString+="<div class='content-pane texttype'> <details><summary>"+replaceAfterList(data[j][0])+"</summary><div class='galleryContainer'>"
    
        for (let i = 1; i<data[j].length; i++){
            htString += "<div class='genericGalleryItem'><img src= " + data[j][i] + '? images/regie-ecki-placeholder.jpg :'+ data[j][i]+"} onClick=\"document.getElementById('fullScreen').setAttribute('src',this.src);document.getElementById('fullScreenPos').style.visibility='visible';\" class='subGalleryImage'></img></div>"
        }

        htString+="</details></div></div><div class='spacerGall'></div>";
    }
    
    return htString;
}

function setTarget(htString){
    target = htString;
}

export default Veranstaltungen;