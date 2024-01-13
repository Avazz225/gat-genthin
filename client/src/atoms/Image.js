function Image({src ,width=90, maxWidth=50, alt= ""}){
    return(
        <img alt={alt} src={src} style={{width: width+"%", maxWidth: maxWidth+"em"}}/>
    )
}

function ImageInText({src, align, alt= ""}){
    return(
        <img alt={alt} src={src} className="imageInText" align={align} />
    )
}

export {Image, ImageInText}