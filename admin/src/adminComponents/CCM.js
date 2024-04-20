import './CustomContextMenu.css'
import React, {useState} from 'react';
import ImageSelector from './ImageSelector';

function CustomContextMenu(props){
    const [sliderVal, setSliderVal] = useState(props.textSelection.width)
    const [maxSliderVal, setMaxSliderVal] = useState(props.textSelection.maxWidth)
    const [align, setAlign] = useState(props.textSelection.align)

    if (props.contextMenuType === "linkRight"){
        return(
            <div id={"customContextMenuText"} className="customContextMenu" style={{'display': props.contextMenuVisibility, 'top': 'calc(1em + '+props.contextMenuCoords.y+'px', 'left':props.contextMenuCoords.x+'px'}}>
                <div className='customContextItem' onClick={() => {props.changeProperty(!props.linkBold, props.textSelection.index,"bold"); props.modifyState("contextMenuVisibility", "none")}}><a className='pseudoLink'>{(!props.linkBold)?<b>Fetter Link</b>:<>Normaler Link</>}</a></div>
                <div className='customContextInput'>Ziel: <input placeholder='https://...' onBlur={(e) => props.changeProperty(e.target.value, props.textSelection.index, "destination")}/></div>
            </div>
        )
    } else if (props.contextMenuType === "heading") {
        return(
            <div id={"customContextMenuText"} className="customContextMenu header" style={{'display': props.contextMenuVisibility, 'top': 'calc(1em + '+props.contextMenuCoords.y+'px', 'left':props.contextMenuCoords.x+'px'}}>
                <div className='customContextItem' onClick={() => {props.changeProperty(1, props.textSelection.index,"level"); props.modifyState("contextMenuVisibility", "none")}}><h1>Hauptüberschrift</h1></div>
                <div className='customContextItem' onClick={() => {props.changeProperty(2, props.textSelection.index,"level"); props.modifyState("contextMenuVisibility", "none")}}><h2>Überschrift 2</h2></div>
                <div className='customContextItem' onClick={() => {props.changeProperty(3, props.textSelection.index,"level"); props.modifyState("contextMenuVisibility", "none")}}><h3>Überschrift 3</h3></div>
                <div className='customContextItem' onClick={() => {props.changeProperty(4, props.textSelection.index,"level"); props.modifyState("contextMenuVisibility", "none")}}><h4>Überschrift 4</h4></div>
            </div>
        )
    } else if (props.contextMenuType === "image") {
        return(
            <div id={"customContextMenuText"} className="customContextMenu" style={{'display': props.contextMenuVisibility, 'top': 'calc(1em + '+props.contextMenuCoords.y+'px', 'left':props.contextMenuCoords.x+'px'}}>
                <div className='customContextItem' onClick={() => {props.changeProperty("imageInText", props.textSelection.index, "type"); props.changeProperty("left", props.textSelection.index, "align"); props.modifyState("contextMenuVisibility", "none")}}>Zu Bild im Text machen</div>
                <ChangeImage index={props.textSelection.index} changeProperty={props.changeProperty} modifyState={props.modifyState} />
                <div className='customContextInput'>Bildbeschreibung: <input placeholder='Ein Pony, das...' defaultValue={props.textSelection.alt} onBlur={(e) => props.changeProperty(e.target.value, props.textSelection.index, "alt")}/></div>
                <div className='customContextInput'>
                    <div>Breite anpassen</div>
                    <input type='range'min={1} max={100} step={1} defaultValue={sliderVal} onChange={(e) => {setSliderVal(e.target.value); props.changeProperty(e.target.value, props.textSelection.index, "width")}} />
                    <div>{sliderVal} % </div>
                </div>
                <div className='customContextInput'>
                    <div>Max. Breite anpassen</div>
                    <input type='range'min={1} max={100} step={1} defaultValue={maxSliderVal} onChange={(e) => {setMaxSliderVal(e.target.value); props.changeProperty(e.target.value, props.textSelection.index, "maxWidth")}} />
                    <div>{maxSliderVal} Zeichen </div>
                </div>
            </div>
        )
    } else if (props.contextMenuType === "imageInText") {
        return(
            <div id={"customContextMenuText"} className="customContextMenu" style={{'display': props.contextMenuVisibility, 'top': 'calc(1em + '+props.contextMenuCoords.y+'px', 'left':props.contextMenuCoords.x+'px'}}>
                <div className='customContextItem' onClick={() => {props.changeProperty("image", props.textSelection.index, "type"); props.changeProperty("50", props.textSelection.index, "width"); props.modifyState("contextMenuVisibility", "none")}}>Zu großem Bild machen</div>
                <ChangeImage index={props.textSelection.index} changeProperty={props.changeProperty} modifyState={props.modifyState} />
                <div className='customContextInput'>Bildbeschreibung: <input placeholder='Ein Pony, das...' defaultValue={props.textSelection.alt} onBlur={(e) => props.changeProperty(e.target.value, props.textSelection.index, "alt")}/></div>
                <div className='customContextItem' onClick={() => {props.changeProperty((align==='left'?"right":"left"), props.textSelection.index, "align"); setAlign((align==='left'?"right":"left"))}}>Auf die {(align==='left'?<>rechte</>: <>linke</>)} Seite</div>
            </div>
        )
    } else if (props.contextMenuType === "imageSelector") {
        return(
            <div id={"customContextMenuText"} className="customContextMenu" style={{'display': props.contextMenuVisibility, 'top': 'calc(1em + '+props.contextMenuCoords.y+'px', 'left':props.contextMenuCoords.x+'px'}}>
                <ImageSelector changeProperty={props.changeProperty} index={props.textSelection.index} />
            </div>
        )
    } else {
        return(
            <div id={"customContextMenuText"} className="customContextMenu" style={{'display': props.contextMenuVisibility, 'top': 'calc(1em + '+props.contextMenuCoords.y+'px', 'left':props.contextMenuCoords.x+'px'}}>
                {(props.contextMenuType !== "text")&&<div className='customContextItem' onClick={() => {props.modifySelectedText("text"); props.modifyState("contextMenuVisibility", "none")}}>Normaler Text</div>}
                {(props.contextMenuType !== "bold")&&<div className='customContextItem' onClick={() => {props.modifySelectedText("bold"); props.modifyState("contextMenuVisibility", "none")}}><b>Fett</b></div>}
                {(props.contextMenuType !== "link")&&<div className='customContextItem' onClick={() => {props.modifySelectedText("link"); props.modifyState("contextMenuVisibility", "none")}}><a className='pseudoLink'>Zu Link machen</a></div>}
            </div>
        )
    }
}


function ChangeImage({index, changeProperty, modifyState}){
    const [changeImage, setChangeImage] = useState(false)
    if (changeImage){
        return(
            <div className='customContextInput'>
                <div className='customContextInputBtn' onClick={() => {changeProperty("undefined", index, "src"); modifyState("contextMenuVisibility", "none")}}>
                    Bild hochladen
                </div>
                <div className='customContextInputBtn' onClick={() => modifyState("contextMenuType", "imageSelector")}>
                    Bild auswählen
                </div>
            </div>
        )
    } else {
        return(
            <div className='customContextItem' onClick={() => {setChangeImage(true)}}>Bild ändern</div>
        )
    }
}

export default CustomContextMenu