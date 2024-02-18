async function jsonReader(path){
    var res
    await fetch("/data/"+path)
    .then((r) => r.json())
    .then((data) =>{
        res = data
    })
    return res
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

function insertElementAt(obj, indexes, element) {
    let current = obj;

    if (!Array.isArray(current)) {
        current = [current];
    }

    if (indexes.length === 1) {
        current.splice(indexes[0], 0, createTemplateDefinition(element));
        return current;
    }

    let innerArray = current[indexes[0]].content;
    let updatedInnerArray = insertElementAt(innerArray, indexes.slice(1), element);
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

function createTemplateDefinition(type){
    switch (type){
        case "text":
            return {"type": type, "text": "neuer Text"}
        case "link":
            return {"type": type, "text": "neuer Link"}
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

export {jsonReader, getValue, getTimespan, appendToArray, insertIntoArray, increaseLastByOne, insertElementAt, deleteElementAt, modifyElementAt}
