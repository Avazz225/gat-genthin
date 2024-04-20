import { selectImage } from "../helpers/tools";
import DeleteComponentBtn from "./DeleteComponent"

function Image({deleteData, index, deleteMode, src ,width=90, maxWidth=50, alt= "", modifyState, handleFileUpload, uploadInProgress}){

    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            {(src !== "https://d1pn64129x5skh.cloudfront.net/undefined")?
                <img 
                    alt={alt} 
                    src={src} 
                    style={{width: width+"%", maxWidth: maxWidth+"em"}}
                    onContextMenu={(e) => {selectImage(e, e.pageX, e.pageY, "image", index, modifyState, alt, width, maxWidth)}}
                />:
                (uploadInProgress)?
                    <div className="uploadNotification">
                        Wir laden deine Datei hoch, bitte warte kurz
                    </div>:
                    <input class="imageInput" type="file" onChange={(e) => {handleFileUpload(index, e.target.files[0], "false", 'none')}} accept="image/*" />
            }
        </DeleteComponentBtn>
    )
}

function ImageInText({deleteData, index, deleteMode, src, align, alt= "", modifyState, handleFileUpload, uploadInProgress}){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            {(src !== "https://d1pn64129x5skh.cloudfront.net/undefined")?
                <img 
                    alt={alt} 
                    src={src} 
                    className="imageInText" 
                    align={align} 
                    onContextMenu={(e) => {selectImage(e, e.pageX, e.pageY, "imageInText", index, modifyState, alt, 90, 50, align)}}
                />:
                (uploadInProgress)?
                    <div className="uploadNotificationInText">
                        Wir laden deine Datei hoch, bitte warte kurz
                    </div>:
                    <input className="imageInputInText" align={align} type="file" onChange={(e) => {handleFileUpload(index, e.target.files[0], "false", 'none')}} accept="image/*" />
            }
        </DeleteComponentBtn>
    )
}

export {Image, ImageInText}