import React, { useState } from 'react';
import PageMapper from '../helpers/pageMapper';
import { deleteElementAt, increaseLastByOne, insertElementAt, jsonReader, modifyElementAt, simplifyJsonDefinition } from '../helpers/tools';
import { Icon } from '@iconify/react';
import CustomContextMenu from '../adminComponents/CCM';
import axios from "axios"
import JsonTextArea from '../adminComponents/TextEditor';

class PageRenderer extends React.Component{
    constructor(props){
        super();
        this.state = {
            source: props.page+".json",
            data: [],
            changesMade: false,
            textSelection: {},
            contextMenuCoords: {x: 0, y:0},
            contextMenuVisibility: "none",
            contextMenuType: "",
            linkBold: true,
            uploadInProgress: false
        }
        this.addData = this.addData.bind(this)
        this.deleteData = this.deleteData.bind(this)
        this.changeProperty = this.changeProperty.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.setTextSelection = this.setTextSelection.bind(this)
        this.modifySelectedText = this.modifySelectedText.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
        this.modifyState = this.modifyState.bind(this)
        this.upload_image = this.upload_image.bind(this)
        this.generate_url = this.generate_url.bind(this)
        this.handleFileUpload = this.handleFileUpload.bind(this)
        this.updateData = this.updateData.bind(this)
    }

    modifyState(key, value){
        this.setState({
            [key]: value
        })
    }

    async componentDidMount(){
        jsonReader(this.state.source)
        .then(result => this.setState({
            data: result
        })
        )
    }

    updateData(data){
        this.setState({
            data: data
        })
    }

    addData(newElement, index){
        this.setState({
            data: insertElementAt(this.state.data, index, newElement, "default"),
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

    handleFileUpload(index, file, auto_map = "false", map_target = "none"){
        this.generate_url(index, file, auto_map, map_target)
    }

    async generate_url(index, file, auto_map, map_target){
        this.setState({'uploadInProgress': true})
        await fetch(process.env.REACT_APP_CM_API+'generate_url', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'source': process.env.REACT_APP_SYSTEM_ID,
                'automap': auto_map,
                'maptarget': map_target,
            },
            body: JSON.stringify({
                'automap': auto_map,
                'maptarget': map_target,
                'filename': file.name,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        return response.json();
        })
        .then((data) => {
            this.upload_image(index, file, data['url'], data['fields'])
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    async upload_image(index, file, url, fields){
        const  formData = new FormData();   
        Object.keys(fields).forEach(key => {
            formData.append(key, fields[key]);
        });   
        formData.append('file', file);  
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }         
        }).then(() => {
            this.setState({'uploadInProgress': true})
            this.changeProperty(fields.key, index, "src")
        })
        .catch(function (error) {
            console.log(error);
        });            
    }

    async saveChanges(){
        await fetch(process.env.REACT_APP_CM_API+'content', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'source':process.env.REACT_APP_SYSTEM_ID,
                'TargetFile': this.state.source
            }, 
            body: JSON.stringify({
                //You shall not save stupid things :)
                'content': simplifyJsonDefinition(this.state.data)
            })
        })
        .then((response) => {
            if (response.ok) {
                this.setState({
                    data: simplifyJsonDefinition(this.state.data)
                })
                return;
            } else {
                throw new Error(response.status);
            }
        })
        .then(() => {
            this.setState({
                changesMade: false
            })
        })
        .catch((error) => {
            // Internal server error
            this.setState({
                password_error: false,
                email_error: false,
                generalErrID: "err.authserviceunavailable"
            })
        })
    }

    setTextSelection(index, textArray, type){
        this.setState({
            textSelection: {"index": index, "textArray": textArray, "type": type}
        }) 
    }

    modifySelectedText(action){
        let currentData = this.state.data
        let index = this.state.textSelection.index

        currentData = deleteElementAt(currentData, this.state.textSelection.index)
        if(this.state.textSelection.textArray.beforeSelection){
            currentData = insertElementAt(currentData, index, "text", this.state.textSelection.textArray.beforeSelection)
            index = increaseLastByOne(index)
        }
        /*Modifiziertes Element*/ 
        currentData = insertElementAt(currentData, index, action, this.state.textSelection.textArray.selection)
        index = increaseLastByOne(index)

        if (this.state.textSelection.textArray.afterSelection){
            currentData = insertElementAt(currentData, index, "text", this.state.textSelection.textArray.afterSelection)
        }

        this.setState({
            data: simplifyJsonDefinition(currentData),
            changesMade: true,
        })
    }

    handleEnter(index, text = "", cursorPosition = -1){
        let currentData = this.state.data
        if (text.length === cursorPosition && text !== ""){
            index = increaseLastByOne(index)
            currentData = insertElementAt(currentData, index, "newLine", "default")
            index = increaseLastByOne(index)
            currentData = insertElementAt(currentData, index, "text", "default")

            this.setState({
                data: currentData,
                changesMade: true,
            })
        }
    }

    render(){
        return(
            <>
            {(this.state.changesMade && !this.props.deleteMode) && <SaveButton saveChanges={this.saveChanges} />}
            {(this.props.textEditor)?
                <>
                    <JsonTextArea 
                        data={this.state.data}
                        modifyData={this.updateData}
                    />
                </>
                :
                <>
                    <PageMapper 
                        data={this.state.data} 
                        addData={this.addData} 
                        deleteData={this.deleteData}
                        changeProperty={this.changeProperty}
                        setTextSelection={this.setTextSelection}
                        handleEnter={this.handleEnter}
                        modifyState = {this.modifyState}
                        handleFileUpload = {this.handleFileUpload}
                        previousIndexes={[]} 
                        adminComponentsVisible={this.props.adminComponentsVisible} 
                        deleteMode={this.props.deleteMode} 
                        uploadInProgress={this.state.uploadInProgress}
                    />
                
                    <CustomContextMenu
                        modifySelectedText = {this.modifySelectedText}
                        contextMenuCoords = {this.state.contextMenuCoords}
                        contextMenuVisibility = {this.state.contextMenuVisibility}
                        contextMenuType = {this.state.contextMenuType}
                        changeProperty = {this.changeProperty}
                        modifyState = {this.modifyState}
                        textSelection = {this.state.textSelection}
                        linkBold = {this.state.linkBold}
                    />
                </>
            }
            </>
        );
    }
}

function SaveButton(props){
    const[clicked, setClicked] = useState(false)

    return(
        <div className='saveButtonWrapper'>
            <div className='relPos' >
                <button className='saveButton' onClick={() => {setClicked(true); props.saveChanges()}}>
                    <Icon icon="mdi:content-save-outline" className="saveIcon"/>
                    {(clicked)?<center><div className='loader'/></center>:
                    <div className='saveText'>
                        Änderungen speichern
                    </div>
                    }
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
