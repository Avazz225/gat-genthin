async function jsonReader(path){
    var res
    await fetch(path)
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

export {jsonReader, getValue}