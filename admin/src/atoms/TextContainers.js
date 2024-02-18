import DeleteComponentBtn from "./DeleteComponent"

function Text({changeProperty, index, deleteData, deleteMode, text, bold=false}){
    if (!bold){
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index}
            >
                <span 
                    contentEditable={true} 
                    className="textEditable" 
                    onBlur={(e) => changeProperty(e.currentTarget.textContent, index, "text")}
                >
                    {text}
                </span>
            </DeleteComponentBtn>
            )
    } else {
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index} 
            >
                <b >
                    <span 
                        contentEditable={true} 
                        className="textEditable" 
                        onBlur={(e) => changeProperty(e.currentTarget.textContent, index, "text")}
                    >
                        {text}
                    </span>
                </b>
            </DeleteComponentBtn>
        )
    }
}

function Link({changeProperty, index, deleteData, deleteMode, text, destination, newTab=true, bold=false}){
    return(
        <>
        {(bold)?
        <DeleteComponentBtn 
            deleteMode={deleteMode} 
            deleteData={deleteData} 
            index={index}
        >
            <b>
                <a 
                    href={destination} 
                    target={(newTab)?"_blank":"_self"} 
                    rel={"noreferrer"}
                    contentEditable={true} 
                    className="textEditable" 
                    onBlur={(e) => changeProperty(e.currentTarget.textContent, index, "text")}
                >
                    {text}
                </a>
            </b>
        </DeleteComponentBtn>
        :
        <DeleteComponentBtn 
            deleteMode={deleteMode} 
            deleteData={deleteData} 
            index={index}
        >
            <a 
                href={destination} 
                target={(newTab)?"_blank":"_self"} 
                rel={"noreferrer"}
                contentEditable={true} 
                className="textEditable" 
                onBlur={(e) => changeProperty(e.currentTarget.textContent, index, "text")}
            >
                {text}
            </a>
        </DeleteComponentBtn>
        }
        </>
    )
}

function NewLine(props){
    return(
        <DeleteComponentBtn 
            deleteMode={props.deleteMode} 
            deleteData={props.deleteData} 
            index={props.index}
        >
            {(props.adminComponentsVisible ||props.deleteMode)?"¤":""}
            <br/>
        </DeleteComponentBtn>
    )
}

function Heading({changeProperty, index, deleteData, deleteMode, type=1, text, topSpace=0.7, editable=true}){
    if (type === 1){
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index}
            >
                <h1 
                    style={{marginTop: topSpace+"em"}} 
                    contentEditable={editable} 
                    className="textEditable" 
                    onBlur={(e) => changeProperty(e.currentTarget.textContent, index, "text")}
                >
                    { text }
                </h1>
            </DeleteComponentBtn>
        )
    } else if (type === 2) {
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index}
            >
                <h2 
                    style={{marginTop: topSpace+"em"}} 
                    contentEditable={editable} 
                    className="textEditable" 
                    onBlur={(e) => changeProperty(e.currentTarget.textContent, index, "text")}
                >
                    { text }
                </h2>
            </DeleteComponentBtn>
        )
    } else if (type === 3) {
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index}
            >
                <h3 
                    style={{marginTop: topSpace+"em"}} 
                    contentEditable={editable} 
                    className="textEditable" 
                    onBlur={(e) => changeProperty(e.currentTarget.textContent, index, "text")}
                >
                    { text }
                </h3>
            </DeleteComponentBtn>
        )
    } else if (type === 4) {
        return(
            <DeleteComponentBtn 
                deleteMode={deleteMode} 
                deleteData={deleteData} 
                index={index}
            >
                <h4 
                    style={{marginTop: topSpace+"em"}} 
                    contentEditable={editable} 
                    className="textEditable" 
                    onBlur={(e) => changeProperty(e.currentTarget.textContent, index, "text")}
                >
                    { text }
                </h4>
            </DeleteComponentBtn>
        )
    }
}

function NavLink({id, text, destination}){
    return(
        <a href={destination} target="_self" className="ref">
            <div className="navItem inactive" id={id}>
                {text}
            </div>
        </a>
    )
}

export {Link, Text, NewLine, Heading, NavLink}