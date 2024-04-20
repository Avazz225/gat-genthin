import DeleteComponentBtn from "./DeleteComponent"
import { getSelectedText } from "../helpers/tools"
import React, { useState } from 'react';

function Text({changeProperty, index, deleteData, deleteMode, text, bold=false, editable=true, setTextSelection, handleEnter, modifyState}){
    const [contextMenuPosition, setContextMenuPosition] = useState({ mouseX: null, mouseY: null })

    function handleBlur(e){
        changeProperty(e.currentTarget.textContent, index, "text")
    }

    if (!bold){
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index}
            >
                <span 
                    contentEditable={editable} 
                    className={editable?"textEditable":""}  
                    onBlur={(e) => handleBlur(e)}
                    onSelect={(e) => getSelectedText(e, window.getSelection().toString(), e.target.textContent, "text", contextMenuPosition.mouseY, contextMenuPosition.mouseX, index, setTextSelection, modifyState)}
                    onMouseDown={(e) => setContextMenuPosition({ mouseX: e.pageX, mouseY: e.pageY })}
                    onKeyUp={(e) => {if (e.key === 'Enter') {handleEnter(index, text, window.getSelection().getRangeAt(0).startOffset); e.target.blur()}}}
                    onKeyDown={(e) => {if (e.key === 'Enter') {e.preventDefault()}}}
                >
                    {text}
                </span>
            </DeleteComponentBtn>
            )
    } else {
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index} 
            >
                <b>
                    <span 
                        contentEditable={editable} 
                        className={editable?"textEditable":""}  
                        onBlur={(e) => handleBlur(e)}
                        onSelect={(e) => getSelectedText(e, window.getSelection().toString(), e.target.textContent, "bold", contextMenuPosition.mouseY, contextMenuPosition.mouseX, index, setTextSelection, modifyState)}
                        onMouseDown={(e) => setContextMenuPosition({ mouseX: e.pageX, mouseY: e.pageY })}
                        onKeyUp={(e) => {if (e.key === 'Enter') {handleEnter(index, text, window.getSelection().getRangeAt(0).startOffset); e.target.blur()}}}
                        onKeyDown={(e) => {if (e.key === 'Enter') {e.preventDefault()}}}
                    >
                        {text}
                    </span>
                </b>
            </DeleteComponentBtn>
        )
    }
}

function Link({changeProperty, index, deleteData, deleteMode, text, destination, newTab=true, bold=false, editable=true, setTextSelection, modifyState}){
    const [crtlDown, setCrtlDown] = useState(false)
    const [contextMenuPosition, setContextMenuPosition] = useState({ mouseX: null, mouseY: null })

    function showContextMenu(e, bold){
        e.preventDefault(); 
        modifyState('textSelection', {'index': index})
        modifyState('contextMenuVisibility' ,'block')
        modifyState('contextMenuType', "linkRight")
        modifyState('contextMenuCoords', {'x': contextMenuPosition.mouseX, 'y': contextMenuPosition.mouseY})
        modifyState('linkBold', bold)
    }

    function handleBlur(e){
        changeProperty(e.currentTarget.textContent, index, "text")
    }

    return(
        <>
        {(bold)?
        <DeleteComponentBtn 
            deleteMode={deleteMode} 
            deleteData={deleteData} 
            index={index}
        >
            <b>
                <a 
                    href={destination} 
                    target={(newTab)?"_blank":"_self"} 
                    rel={"noreferrer"}
                    contentEditable={!crtlDown} 
                    className={editable?"textEditable":""}  
                    onBlur={(e) => handleBlur(e)}
                    onClick={(e) => {if (!e.ctrlKey) {e.preventDefault()}}}
                    onKeyDown={(e) => {if (e.ctrlKey) {setCrtlDown(true)} if (e.key === 'Enter') {e.preventDefault()}}}
                    onKeyUp={(e) => {if (!e.ctrlKey) {setCrtlDown(false)}}}
                    onSelect={(e) => getSelectedText(e, window.getSelection().toString(), e.target.textContent, "link", contextMenuPosition.mouseY, contextMenuPosition.mouseX, index, setTextSelection, modifyState)}
                    onMouseDown={(e) => setContextMenuPosition({ mouseX: e.pageX, mouseY: e.pageY })}
                    onContextMenu={(e) => showContextMenu(e, true)}
                >
                    {text}
                </a>
            </b>
        </DeleteComponentBtn>
        :
        <DeleteComponentBtn 
            deleteMode={deleteMode} 
            deleteData={deleteData} 
            index={index}
        >
            <a 
                href={destination} 
                target={(newTab)?"_blank":"_self"} 
                rel={"noreferrer"}
                contentEditable={!crtlDown} 
                className={editable?"textEditable":""}  
                onBlur={(e) => handleBlur(e)}
                onClick={(e) => {if (!e.ctrlKey) {e.preventDefault()}}}
                onKeyDown={(e) => {if (e.ctrlKey) {setCrtlDown(true)} if (e.key === 'Enter') {e.preventDefault()}}}
                onKeyUp={(e) => {if (!e.ctrlKey) {setCrtlDown(false)}}}
                onSelect={(e) => getSelectedText(e, window.getSelection().toString(), e.target.textContent, "link", contextMenuPosition.mouseY, contextMenuPosition.mouseX, index, setTextSelection, modifyState)}
                onMouseDown={(e) => setContextMenuPosition({ mouseX: e.pageX, mouseY: e.pageY })}
                onContextMenu={(e) => showContextMenu(e, false)}
            >
                {text}
            </a>
        </DeleteComponentBtn>
        }
        </>
    )
}

function NewLine(props){
    return(
        <DeleteComponentBtn 
            deleteMode={props.deleteMode} 
            deleteData={props.deleteData} 
            index={props.index}
        >
            {(props.adminComponentsVisible ||props.deleteMode)?<>¤<br/></>:<br/>}
            
        </DeleteComponentBtn>
    )
}

function Heading({changeProperty, index, deleteData, deleteMode, type=1, text, topSpace=0.7, editable=true, handleEnter, modifyState, setTextSelection}){
    const [contextMenuPosition, setContextMenuPosition] = useState({ mouseX: null, mouseY: null })

    function showContextMenu(e){
        e.preventDefault()
        modifyState('textSelection', {'index': index})
        modifyState('contextMenuVisibility' ,'block')
        modifyState('contextMenuType', "heading")
        modifyState('contextMenuCoords', {'x': contextMenuPosition.mouseX, 'y': contextMenuPosition.mouseY})
        modifyState('linkBold', false)
    }

    function handleBlur(e){
        changeProperty(e.currentTarget.textContent, index, "text")
    }

    if (type === 1){
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index}
            >
                <h1 
                    style={{marginTop: topSpace+"em"}} 
                    contentEditable={editable} 
                    className={editable?"textEditable":""} 
                    onBlur={(e) => {handleBlur(e)}}
                    onKeyDown={(e) => {if (e.key === 'Enter') {e.preventDefault()}}}
                    onSelect={(e) => showContextMenu(e)}
                    onMouseDown={(e) => setContextMenuPosition({ mouseX: e.pageX, mouseY: e.pageY })}
                >
                    { text }
                </h1>
            </DeleteComponentBtn>
        )
    } else if (type === 2) {
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index}
            >
                <h2 
                    style={{marginTop: topSpace+"em"}} 
                    contentEditable={editable} 
                    className={editable?"textEditable":""}  
                    onBlur={(e) => {handleBlur(e)}}
                    onKeyDown={(e) => {if (e.key === 'Enter') {e.preventDefault()}}}
                    onSelect={(e) => showContextMenu(e)}
                    onMouseDown={(e) => setContextMenuPosition({ mouseX: e.pageX, mouseY: e.pageY })}
                >
                    { text }
                </h2>
            </DeleteComponentBtn>
        )
    } else if (type === 3) {
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index}
            >
                <h3 
                    style={{marginTop: topSpace+"em"}} 
                    contentEditable={editable} 
                    className={editable?"textEditable":""}  
                    onBlur={(e) => {handleBlur(e)}}
                    onKeyDown={(e) => {if (e.key === 'Enter') {e.preventDefault()}}}
                    onSelect={(e) => showContextMenu(e)}
                    onMouseDown={(e) => setContextMenuPosition({ mouseX: e.pageX, mouseY: e.pageY })}
                >
                    { text }
                </h3>
            </DeleteComponentBtn>
        )
    } else if (type === 4) {
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index}
            >
                <h4 
                    style={{marginTop: topSpace+"em"}} 
                    contentEditable={editable} 
                    className={editable?"textEditable":""}  
                    onBlur={(e) => {handleBlur(e)}}
                    onKeyDown={(e) => {if (e.key === 'Enter') {e.preventDefault()}}}
                    onSelect={(e) => showContextMenu(e)}
                    onMouseDown={(e) => setContextMenuPosition({ mouseX: e.pageX, mouseY: e.pageY })}
                >
                    { text }
                </h4>
            </DeleteComponentBtn>
        )
    }
}

function NavLink({id, text, destination}){
    return(
        <a href={destination} target="_self" className="ref">
            <div className="navItem inactive" id={id}>
                {text}
            </div>
        </a>
    )
}

export {Link, Text, NewLine, Heading, NavLink}