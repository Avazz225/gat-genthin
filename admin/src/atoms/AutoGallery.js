import React from "react";
import DeleteComponentBtn from "./DeleteComponent";
import { Icon } from "@iconify/react/dist/iconify.js";
import { selectAGal } from "../helpers/tools";

class AutoGallery extends React.Component{
    constructor(props){
        super();
        this.state = {
            data: [],
            inverted: props.inverted,
            src: props.src
        }
        this.fetchData = this.fetchData.bind(this)
        this.refetch = this.refetch.bind(this)
        this.reverse = this.reverse.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
    }

    async componentDidMount(){
        await this.fetchData()
    }

    async fetchData(){
        await fetch(process.env.REACT_APP_CDN_URL+'media/auto/'+this.state.src+'/index.ska')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        return response.json();
        })
        .then((data) => {
            this.setState({
                data: data
            })
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    refetch(name){
        let newData = this.state.data
        newData.push(name)
        this.setState({
            data: newData
        })
    }

    reverse(){
        this.setState({
            inverted: !this.state.inverted
        })
    }

    async deleteImage(index){
        console.log(index)
        await fetch(process.env.REACT_APP_CM_API+'delete_object', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'source': process.env.REACT_APP_SYSTEM_ID,
            },
            body: JSON.stringify({
                'filename': index,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        return response.json();
        })
        .then((data) => {
            console.log("SUCCESS deleted: "+ index)
            this.setState({
                data: this.state.data.filter(item => item !== index)
            })
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render(){
        let galBorder = (this.props.deleteMode)?{border:"1px solid"}:{}
        return(
            <DeleteComponentBtn deleteMode={this.props.deleteMode} deleteData={this.props.deleteData} index={this.props.index}>
                <div className="galleryContainer" style={galBorder}>
                    <WrenchBtn index={this.props.index} selectAGal={selectAGal} modifyState={this.props.modifyState} src={this.props.src} inverted={this.props.inverted} reverse={this.reverse} />
                    {(this.props.src=="") && <span style={{gridColumn:"1/13"}}>Du musst eine ID für die Galerie definieren! Das geht über das Icon rechts.</span>}
                    {(this.props.uploadInProgress)?
                        <div className="uploadNotification" style={{gridColumn:"1/13", height:"3em", width:"95%", marginLeft:"2.5%"}} >
                            Wir laden deine Datei hoch, bitte warte kurz
                        </div>:
                        <input className="imageInput" style={{gridColumn:"1/13", height:"3em", width:"95%", marginLeft:"2.5%"}} type="file" onChange={(e) => {
                            this.props.handleFileUpload(this.props.index, e.target.files[0], "true", this.state.src, this.refetch)
                        }} accept="image/*" />
                    } 
                    <ImageMap
                        data={(this.state.inverted)?[...this.state.data].reverse():this.state.data}
                        deleteMode={this.props.deleteMode}
                        deleteData={this.deleteImage}
                    />
                </div>
            </DeleteComponentBtn>
        )
    }
}

function ImageMap({data, deleteMode, deleteData}){
    return(
        <>
        {data.map(function(element) {
            return(
                <>
                {(element.toLowerCase().indexOf("index.ska") === -1)&&
                    <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={element}>
                        <div className="genericGalleryItem">
                            <img src={process.env.REACT_APP_CDN_URL+element} className="subGalleryImage"/>
                        </div>
                    </DeleteComponentBtn>
                }
                </>
            )
        })}
        </>
    )
}

function WrenchBtn(props){
    return(
        <div className="wrenchBtn" style={{right: "3px"}} onClick={(e) => {props.selectAGal(e, e.pageX-250, e.pageY, "autoGallery", props.index, props.modifyState, props.inverted, props.src, props.reverse)}}>
            <Icon icon="mdi:wrench-outline" className="wrench"/>
        </div>
    )
}

export default AutoGallery