import '../css/Gallery.css';
import React from "react";
import ImagePopUp from '../../components/ImagePopUp';
import handlePopUp from '../../components/popUpHandler';
var target;


function replaceAfterList(toReplace){
    
    switch(toReplace){
// Hier werden die Anzeigenamen nach den Ordernamen festgelegt.
// Ein neuer Eintrag wird erstellt indem nach "case" der Ordnername Eingetragen wird und nach "return" der Anzeigename.
        case "0weitere":
            return "Weitere M&auml;rchen"
        case "2007":
            return "Die goldene Gans (2007)"
        case "2008":
            return "Jorinde und Joringel (2008)"
        case "2009":
            return "Die vier Jahreszeiten (2009)"
        case "2010":
        return "Die Schneek&ouml;nigin (2010)"
        case "2011":
            return "Kalif Storch (2011)"
        case "2012":
            return "Tischlein deck dich (2012)"
        case "2013":
            return "Rumpelk&ouml;nig und Goldstilzchen (2013)"
        case "2014":
            return "Das Katzenhaus (2014) "
        case "2015":
            return "Die Regentrude (2015)"
        case "2016":
            return "Es war einmal... (2016)"
        case "2017":
            return "Die silberne Lilie (2017)"
        case "2018":
            return "Sechse kommen durch die ganze Welt (2018)"
        case "2019":
            return "K&ouml;nig Drosselbart (2019)"
        case "2022":
            return "Die kleine Hexe, die nicht b&ouml;se sein konnte (2022)"
        case "2023":
            return "Die drei Federn (2023)"
    }
    
return toReplace;
}

function Maerchen(){
    const [rerender, setRerender] = React.useState(false);
    React.useEffect(() => {
        const loader = async () => {
            var data = await fetch("https://gcwiw43c74.execute-api.eu-central-1.amazonaws.com/maerchen").then((res) => res.json())
            var htString = fillImages(JSON.parse(data.body))
            setTarget(htString)
            setRerender(!rerender);
        };
        loader();    
    }, []);

    return(
        <div className="content">
            <h1>Galerie - Märchen</h1>
                <ImagePopUp/>
                <div dangerouslySetInnerHTML={{__html: target}} />     
        </div>
    );
}

function fillImages(data){
    //console.log(data.length)
    var htString = "";
    
    for (let j = (data.length-1); j>=0; j--){
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

export default Maerchen;