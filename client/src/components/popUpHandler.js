function handlePopUp(src){
    document.getElementById('fullScreen').setAttribute('src',src)
    document.getElementById('fullScreenPos').style.visibility='visible';
}

export default handlePopUp