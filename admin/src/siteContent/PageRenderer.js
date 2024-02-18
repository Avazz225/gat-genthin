import React from 'react';
import PageMapper from '../helpers/pageMapper';
import { deleteElementAt, insertElementAt, jsonReader, modifyElementAt } from '../helpers/tools';
import { Icon } from '@iconify/react';

class PageRenderer extends React.Component{
    constructor(props){
        super();
        this.state = {
            source: props.page+".json",
            data: [],
            changesMade: false,
        }
        this.addData = this.addData.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.changeProperty = this.changeProperty.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
    }

    async componentDidMount(){
        jsonReader(this.state.source)
        .then(result => this.setState({
            data: result
        })
        )
    }

    addData(newElement, index){
        this.setState({
            data: insertElementAt(this.state.data, index, newElement),
            changesMade: true
        })
    }   

    deleteData(index){
        this.setState({
            data: deleteElementAt(this.state.data, index),
            changesMade: true
        })
    }

    changeProperty(text, index, propertyToChange){
        this.setState({
            data: modifyElementAt(this.state.data, index, text, propertyToChange),
            changesMade: true
        })
    }

    saveChanges(){
        this.setState({
            changesMade: false
        })
    }

    render(){
        return(
            <>
            {this.state.changesMade && <SaveButton saveChanges={this.saveChanges} />}
            <PageMapper 
                data={this.state.data} 
                addData={this.addData} 
                deleteData={this.deleteData}
                changeProperty={this.changeProperty}
                previousIndexes={[]} 
                adminComponentsVisible={this.props.adminComponentsVisible} 
                deleteMode={this.props.deleteMode} 
            />
            </>
        );
    }
}

function SaveButton(props){
    return(
        <div className='saveButtonWrapper'>
            <div className='relPos' >
                <button className='saveButton' onClick={() => props.saveChanges()}>
                    <Icon icon="mdi:content-save-outline" className="saveIcon"/>
                    <div className='saveText'>
                        Änderungen speichern
                    </div>
                </button>
            </div>
        </div>
    )
}


/*
<hr className='blue'/>
            <div className='content-pane texttype'>
                <h1>Wie geht Theater?</h1>
                <h2>gat bietet Schnupperkurs</h2>
                <p>Damit sich Mädchen und Jungen mal wieder unverbindlich ausprobieren können, wie es denn so mit dem Theaterspielen geht, bietet das genthiner amateurtheater e.V. (gat) wieder einmal einen Schnupper-Casting-Termin an. 
                Dabei handelt es sich nicht um einen Eignungstest, sondern um einen Einblick in die verschiedenen Bereiche einer Schauspielerausbildung. Beim Mitmachen kann jeder für sich selbst feststellen, ob das Spaß macht und ob damit die Lust geweckt wird, das Schauspielern zum Hobby zu machen.</p>
                <p>Die Veranstaltung findet <b>am Samstag, dem 10. Juni 2023, um 10:00 Uhr</b> im Probenstudio von gat, <b>Dattelner Straße 12 (Hinterhaus), 39307 Genthin</b> statt und wird maximal <b>150 Minuten</b> dauern. Der Kurs ist <b>kostenfrei</b>. 
                Aufgerufen sind Mädchen und Jungen im Alter von 10 bis 14 Jahren. Wir freuen uns aber auch über Interessenten, die älter sind.</p>
                <p>Die Teilnahme ist zahlenmäßig begrenzt. Deshalb ist eine <b>Anmeldung unbedingt erforderlich</b>. Schreiben sie uns eine Mail an <a href="mailto:info@gat-genthin.de">info@gat-genthin.de</a> oder melden sie sich per Telefon (03933 806922) an.</p>



            </div>
*/

export default PageRenderer;
