import ImagePopUp from '../../components/ImagePopUp';
import '../css/Gallery.css';
import React from "react";
import FillImages from '../../components/GalleryItem'

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


class Veranstaltungen extends React.Component{
    constructor(){
        super();
        this.state = {
            data: [],
        }
    }

    async componentDidMount(){
        await fetch("https://gcwiw43c74.execute-api.eu-central-1.amazonaws.com/events")
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
                <h1>Galerie - Andere Veranstaltungen</h1>
                    <ImagePopUp/> 
                    <FillGallery data={this.state.data}/>
            </div>
        );
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

export default Veranstaltungen;