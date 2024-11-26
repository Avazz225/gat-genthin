import { selectImage } from "../helpers/tools";
import DeleteComponentBtn from "./DeleteComponent"

function Image({deleteData, index, deleteMode, src ,width=90, maxWidth=50, alt= "", modifyState, handleFileUpload, uploadInProgress}){

    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            {(src !== process.env.REACT_APP_CDN_URL+"undefined")?
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
                    <div>
                        Hinweis: Rechtsklick um ein vorhandenes Bild auszuwählen.
                        <input class="imageInput" type="file" onChange={(e) => {handleFileUpload(index, e.target.files[0], "false", 'none')}} accept="image/*" onContextMenu={(e) => {selectImage(e, e.pageX, e.pageY, "image", index, modifyState, alt, width, maxWidth)}}/>
                    </div>
            }
        </DeleteComponentBtn>
    )
}

function ImageInText({deleteData, index, deleteMode, src, align, width="20%", maxWidth="20 em", alt= "", modifyState, handleFileUpload, uploadInProgress}){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            {(src !== process.env.REACT_APP_CDN_URL+"undefined")?
                <img 
                    alt={alt} 
                    src={src} 
                    className="imageInText" 
                    align={align} 
                    style={{width: width, maxWidth: maxWidth}}
                    onContextMenu={(e) => {selectImage(e, e.pageX, e.pageY, "imageInText", index, modifyState, alt, 90, 50, align)}}
                />:
                (uploadInProgress)?
                    <div className="uploadNotificationInText">
                        Wir laden deine Datei hoch, bitte warte kurz
                    </div>:
                    <div>
                        Hinweis: Rechtsklick um ein vorhandenes Bild auszuwählen.
                        <input className="imageInputInText" align={align} type="file" onChange={(e) => {handleFileUpload(index, e.target.files[0], "false", 'none')}} accept="image/*" onContextMenu={(e) => {selectImage(e, e.pageX, e.pageY, "imageInText", index, modifyState, alt, 90, 50, align)}}/>
                    </div>
            }
        </DeleteComponentBtn>
    )
}

export {Image, ImageInText}