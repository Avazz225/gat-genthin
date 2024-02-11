import "./AddComponent.css"

const avail_containers={'Standardcontainer':'textContainer', 'Zeitlich gesteuerter Container':'timedContainer', 'Parallele Elemente':'parallelContainer'}
const avail_text_elems={'Überschrift':'heading', 'Text':'text', 'Link':'link', 'Zitat':'blockquote'}
const avail_image_elems={'Bild':'image', 'Bild im Text':'imageInText'}
const avail_list_elems={'Geordnete Liste':'orderedList', 'Ungeordnete Liste':'unorderedList', 'Listenelement':'listElement'}
const avail_style_elems={'Zeilenumbruch':'newLine', 'Horizontale Linie':'horizontalRow', 'Zentrierte Ausrichtung':'centered', 'Normale Ausrichtung':'normal'}
const available_elements={
    'Textelemente':avail_text_elems,
    'Bilder':avail_image_elems,
    'Listen':avail_list_elems,
    'Styleelemente':avail_style_elems,
    'Container':avail_containers
}

function AddComponent( props ){
    if (props.adminComponentsVisible){
        return(
            <div className="addLine">
                <div className="plus">
                    {Object.keys(available_elements).map((key) => (
                        <div className="addComponentGroup">
                            {key}
                            <div className="addComponentGroupWrapper">
                                <ComponentPicker data={available_elements[key]} index={props.index} addData={props.addData} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return(<></>)
    }
}

function ComponentPicker(props){
    return(
        <>
        {Object.keys(props.data).map((key) => (
            <div className="addComponentElement" onClick={(e) => props.addData(props.data[key], props.index)}>
                {key}
            </div>
        ))}
        </>
    ) 
}

export default AddComponent