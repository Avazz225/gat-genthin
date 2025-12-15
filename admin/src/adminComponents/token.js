async function checkTokenValidity(){
    var result = false
    await fetch(process.env.REACT_APP_AUTH_API+'validate_authentication_token', {
        method: 'GET',
        credentials: 'include',
        headers: {
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
        result = true
    })
    .catch((error) => {
        result = false
    });

    return result
}

export {checkTokenValidity}