async function jsonReader(path){
    try {
        const url = `${process.env.REACT_APP_CDN_URL}page_content/${path}`;
        const now = Date.now();
        const tenMinutes = 10 * 60 * 1000;
        const lastFetch = getLastFetchTimestamp(path);

        if (!lastFetch || now - lastFetch >= tenMinutes) {
            const noCacheUrl = `${url}?t=${now}`;
            const response = await fetch(noCacheUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            updateLastFetchTimestamp(path);
            return data;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null; // or handle the error in some other way
    }
}

function getLastFetchTimestamp(path) {
    const timestamps = JSON.parse(localStorage.getItem('gat_lastFetchTimestamps')) || {};
    return timestamps[path] || null;
}

function updateLastFetchTimestamp(path) {
    const timestamps = JSON.parse(localStorage.getItem('gat_lastFetchTimestamps')) || {};
    timestamps[path] = Date.now();
    localStorage.setItem('gat_lastFetchTimestamps', JSON.stringify(timestamps));
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

export {jsonReader, getValue, getTimespan}
