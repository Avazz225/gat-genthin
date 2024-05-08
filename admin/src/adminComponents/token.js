function checkTokenValidity(){
    fetch(process.env.REACT_APP_AUTH_API+'validate_authentication_token', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'source':process.env.REACT_APP_SYSTEM_ID
        }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then((data) => {
            localStorage.setItem("internal_role", data.role)
        })
        .catch((error) => {
            return false
        });
    return true
}

export {checkTokenValidity}