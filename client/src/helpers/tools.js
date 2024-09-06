async function jsonReader(path){
    try {
        const now = Math.floor(Date.now() / (1000 * 60 * 5));
        const cacheBuster = `cb=${now}`;

        const url = `${process.env.REACT_APP_CDN_URL}page_content/${path}?${cacheBuster}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null; // or handle the error in some other way
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
    if (from.length != 0){
        from = composeDate(from, "from")
        if (from > tdy) return false
    }
    
    if (to.length != 0){
        to = composeDate(to, "to")
        if(to > tdy) return true
        else return false
    } else return true
    
}

function composeDate(arr, mode){
    if (mode === "to"){
        return new Date(arr[2], arr[1]-1, arr [0]).setHours(0,0,0,0)+86400000
    }
    return new Date(arr[2], arr[1]-1, arr [0]).setHours(0,0,0,0)
}


function wait(seconds){
    
}

export {jsonReader, getValue, getTimespan}
