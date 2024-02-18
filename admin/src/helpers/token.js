function getToken(){
    let type = localStorage.getItem("login_type")
    if (type==="persistent"){
        try{
            return localStorage.getItem("token")
        } catch {
            return false
        }
    } else {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('token=')) {
                return cookie.substring(7);
            }
        }
        return false;
    }
}

function clearToken(){
    let type = localStorage.getItem("login_type")
    if (type==="persistent"){
        localStorage.removeItem("token")
        localStorage.removeItem("login_type")
    } else {
        document.cookie = "token='empty';expires=Thu, 01 Jan 1970 00:00:01 GMT"
        localStorage.removeItem("login_type")
    }
}

function checkTokenValidity(){
    if (getToken() === false){
        return false
    } else {
        fetch(process.env.REACT_APP_AUTH_API+'validate_authentication_token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': getToken(),
                'source':process.env.REACT_APP_SYSTEM_ID
            }
            })
            .then((response) => {
                if (response.ok) {
                    return true;
                } else {
                    throw new Error(response.status);
                }
            })
            .catch((error) => {
                clearToken()
                return false
            });
        return true
    }
}

export {getToken, checkTokenValidity}