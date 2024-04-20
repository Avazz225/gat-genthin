async function jsonReader(path) {
    try {
        const cacheBuster = Math.random().toString(36).substring(7);
        const response = await fetch(process.env.REACT_APP_CDN_URL + "page_content/" + path + "?cache=" + cacheBuster, {cache: 'no-cache'});

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}

function getValue(key, data){
    try {
        return data[key]
    } catch (error) {
        return key
    }
}

function getTimespan(from, to){
    let tdy = new Date().setHours(0,0,0,0)
    if (from.length !== 0){
        from = composeDate(from, "from")
        if (from > tdy) return false
    }
    
    if (to.length !== 0){
        to = composeDate(to, "to")
        if(to > tdy) return true
        else return false
    } else return true
    
}

function composeDate(arr, mode){
    if (mode === "to"){
        return new Date(arr[2], arr[1]-1, arr[0]).setHours(0,0,0,0)+86400000
    }
    return new Date(arr[2], arr[1]-1, arr[0]).setHours(0,0,0,0)
}

function appendToArray(array, element){
    let newArray = Object.assign([], array)

    if(newArray === undefined){
        newArray = []
        newArray.push(element)
        return newArray
    } else {
        newArray.push(element)
        return newArray
    }
}

function insertIntoArray(array, element, index){
    return [
        ...array.slice(0, index+1),
        createTemplateDefinition(element),
        ...array.slice(index+1)
    ];
}

function insertElementAt(obj, indexes, element, text="") {
    if(text===""){
        return obj
    }
    let current = obj;

    if (!Array.isArray(current)) {
        current = [current];
    }

    if (indexes.length === 1) {
        current.splice(indexes[0], 0, createTemplateDefinition(element, text));
        return current;
    }

    let innerArray = current[indexes[0]].content;
    let updatedInnerArray = insertElementAt(innerArray, indexes.slice(1), element, text);
    current[indexes[0]].content = updatedInnerArray;
    
    return current;
}

function deleteElementAt(obj, indexes) {
    let current = obj;

    if (!Array.isArray(current)) {
        return current;
    }

    if (indexes.length === 1) {
        current.splice(indexes[0], 1);
        return current;
    }

    let innerArray = current[indexes[0]].content;
    let updatedInnerArray = deleteElementAt(innerArray, indexes.slice(1));
    current[indexes[0]].content = updatedInnerArray;
    
    return current;
}

function modifyElementAt(obj, indexes, modifiedContent, keyToModify) {
    let current = obj;

    if (!Array.isArray(current)) {
        return current;
    }


    if (indexes.length === 1) {
        current[indexes[0]][keyToModify]=modifiedContent;
        return current;
    }

    let innerArray = current[indexes[0]].content;
    let updatedInnerArray = modifyElementAt(innerArray, indexes.slice(1), modifiedContent, keyToModify);
    current[indexes[0]].content = updatedInnerArray;
    
    return current;
}

function createTemplateDefinition(type, text=""){
    switch (type){
        case "text":
            return {"type": type, "text": text=== "default"?"neuer Text":text}
        case "bold":
            return {"type": "text", "bold":true, "text": text=== "default"?"neuer Text":text}
        case "link":
            return {"type": type, "text": text=== "default"?"neuer Link":text}
        case "newLine":
            return {"type": type}
        case "heading":
            return {"type": type, "text": "neue Überschrift"}
        case "textContainer":
            return {"type": type, "content": []}
        case "timedContainer":
            return {"type": type, "content": []}
        case "blockquote":
            return {"type": type, "content": [{"type": "text", "text": "neues Zitat"}]}
        case "parallelContainer":
            return {"type": type, "content": []}
        case "horizontalRow":
            return {"type": type}
        case "centered":
            return {"type": type, "content": []}
        case "normal":
            return {"type": type, "content": []}
        case "unorderedList":
            return {"type": type, "content": []}
        case "orderedList":
            return {"type": type, "content": []}
        case "listElement":
            return {"type": type, "content": [{"type": "text", "text": "neuer Listenpunkt"}]}
        case "image":
            return {"type": type}
        case "imageInText":
            return {"type": type}
        case "calendar":
            return {"type": type}
        default:
            return
    }

}

function increaseLastByOne(array){
    let newArray = [...array]; // Kopie des Arrays erstellen, um es nicht zu verändern
    let lastIndex = newArray.length - 1;

    if (lastIndex >= 0) {
        newArray[lastIndex] += 1; // Das letzte Element um 1 erhöhen
    }

    return newArray;
}

function getSelectedText(e, selectedText, text, type, mouseY, mouseX, index, setTextSelection, modifyState){
    e.preventDefault()

    const startIndex = text.indexOf(selectedText);
    const beforeSelection = text.substring(0, startIndex);
    const afterSelection = text.substring(startIndex + selectedText.length);
    let result = {}
    if (beforeSelection.length !== 0){
        result["beforeSelection"] = beforeSelection
    }

    result["selection"]=selectedText

    if (afterSelection.length !== 0){
        result["afterSelection"] = afterSelection
    }

    if (selectedText.length !== 0){
        setTextSelection(index, result, type)
        modifyState('contextMenuVisibility' ,'block')
        modifyState('contextMenuType', type)
        modifyState('contextMenuCoords', {'x': mouseX, 'y': mouseY})
    } else {
        modifyState('contextMenuVisibility' ,'none')
    }
}

function simplifyJsonDefinition(jsonArray) {
    const mergedArray = [];

    for (const element of jsonArray) {
        const lastMerged = mergedArray[mergedArray.length - 1];

        if (lastMerged && lastMerged.type === element.type && element.type === "text" && lastMerged.bold === element.bold) {
            lastMerged.text += element.text;
        } else if (element.content) {
            mergedArray.push({...element, content: simplifyJsonDefinition(element.content)});
        } else {
            mergedArray.push({...element});
        }
    }

    return mergedArray;
}

function selectImage(e, x, y, type, index, modifyState, alt = "", width = 90, maxWidth = 50, align = "left"){
    e.preventDefault()
    modifyState('contextMenuCoords', {'x': x, 'y': y})
    modifyState('contextMenuType', type)
    modifyState('textSelection', {'index':index, 'alt': alt, 'width': width, 'maxWidth': maxWidth, 'align': align})
    modifyState('contextMenuVisibility' ,'block')
}

export {jsonReader, getValue, getTimespan, appendToArray, insertIntoArray, increaseLastByOne, insertElementAt, deleteElementAt, modifyElementAt, getSelectedText, simplifyJsonDefinition, selectImage}
