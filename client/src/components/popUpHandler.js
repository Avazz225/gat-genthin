function handlePopUp(src){
    document.getElementById('fullScreen').setAttribute('src',process.env.REACT_APP_CDN_URL+src)
    document.getElementById('fullScreenPos').style.visibility='visible';
}

export default handlePopUp