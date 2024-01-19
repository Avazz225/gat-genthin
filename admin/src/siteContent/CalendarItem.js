import React from "react";
import { jsonReader } from "../helpers/tools";

class CalendarItem extends React.Component{
    constructor(){
        super();
        this.state = {
            content: {}
        }
    }

    async componentDidMount(){
        await jsonReader(this.props.content)
        .then(result => this.setState({
            content: result
        })
        )
    }

    render(){
        return(
            <>
            <h1>{this.props.id}. Türchen</h1>
            <div className="content-pane texttype">
                <Item content={this.state.content} />
            </div>
            </>
        )
    }
}

function Item(props){
    return(
    <>
        {Object.keys(props.content).map((key, i) => (
            <div key={i}>
                {(props.content[key]['type'] === "ueberschrift")? <h1>{props.content[key]['src']}</h1>:<></>}
                {(props.content[key]['type'] === "text")? <p>{props.content[key]['src']}</p>:<></>}
                {(props.content[key]['type'] === "unterueberschrift")? <h2>{props.content[key]['src']}</h2>:<></>}
                {(props.content[key]['type'] === "img")? 
                    <center>
                        <img src= {process.env.REACT_APP_CDN_URL+'media/'+props.content[key]['src']} style={{width:props.content[key]['width']+ "em", maxWidth: "100%", paddingTop: "0.5em", paddingBottom: "0.5em"}}/>
                    </center>:<></>
                }
                {(props.content[key]['type'] === "audio")? <AudioPlayer media={props.content[key]} />:<></>}
            </div>
        ))}
    </>
    )
}

function AudioPlayer(props){
    return(
        <div className="centered">
            <audio controls controlsList="nodownload" onContextMenu={(e)=> e.preventDefault()}>
                <source src={process.env.REACT_APP_CDN_URL+'media/'+props.media.src} type={switchAudioType(props.media.src)} />
                Dein Browser unterstützt die Audiodatei nicht, bitte versuche einen anderen zu nutzen.
            </audio> 
        </div>
    )
}

function switchAudioType(filename){
    let index= filename.lastIndexOf(".")
    let type = filename.substring(index+1)
    switch (type){
        case "mp3":
            return "audio/mpeg"
        case "wav":
            return "audio/wav"
        case "ogg":
            return "audio/ogg"
    }
}

export default CalendarItem