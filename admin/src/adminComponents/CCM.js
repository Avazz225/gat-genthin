import './CustomContextMenu.css'

function CustomContextMenu(props){
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

export default CustomContextMenu