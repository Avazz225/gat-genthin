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

export {getToken}