async function checkTokenValidity(){
    var result = false
    await fetch(process.env.REACT_APP_AUTH_API+'refresh/'+process.env.REACT_APP_SYSTEM_ID, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
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

function setupTokenRefresh() {
    const intervalInMs = 15 * 60 * 1000;

    setInterval(async () => {
        try {
            const isValid = await checkTokenValidity();
            if (!isValid) {
                console.warn("Token refresh failed");
                // Optional: logout() oder redirect
            }
        } catch (err) {
            console.error("Token refresh error:", err);
        }
    }, intervalInMs);
}


export {checkTokenValidity, setupTokenRefresh}