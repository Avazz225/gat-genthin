function ImagePopUp(){
    return(
        <div className='fullScreenImgPos' id='fullScreenPos'>
            <img src='' className='fullScreenImg' id='fullScreen'></img>
            <button type="checkbox" className="full-toggle" onClick={()=>document.getElementById('fullScreenPos').style.visibility='hidden'} ></button>
            <div className='closebtnborder'>
                <div className='i-container'>
                    <div>
                        <div className='x-stroke3'></div>
                        <div className='x-stroke4'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagePopUp