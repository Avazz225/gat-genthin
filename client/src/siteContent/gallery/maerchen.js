import '../css/Gallery.css';
import React from "react";
import ImagePopUp from '../../components/ImagePopUp';
import FillImages from '../../components/GalleryItem'


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

class Maerchen extends React.Component {
    constructor(){
        super();
        this.state = {
            data: [],
        }
    }

    async componentDidMount(){
        await fetch("https://gcwiw43c74.execute-api.eu-central-1.amazonaws.com/maerchen")
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
                <h1>Galerie - Märchen</h1>
                    <ImagePopUp/>
                    <FillGallery data={this.state.data}/>
            </div>
        )
    }
}

const FillGallery = ({data}) => ( 
    <>
    {data.map(data => (
        <><div className='content-pane texttype'>
            <details>
                <summary>{replaceAfterList(data[0])}</summary>
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