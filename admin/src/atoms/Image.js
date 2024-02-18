import DeleteComponentBtn from "./DeleteComponent"

function Image({deleteData, index, deleteMode, src ,width=90, maxWidth=50, alt= ""}){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            <img alt={alt} src={src} style={{width: width+"%", maxWidth: maxWidth+"em"}}/>
        </DeleteComponentBtn>
    )
}

function ImageInText({deleteData, index, deleteMode, src, align, alt= ""}){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            <img alt={alt} src={src} className="imageInText" align={align} />
        </DeleteComponentBtn>
    )
}

export {Image, ImageInText}