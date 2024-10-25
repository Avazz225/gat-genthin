function Text({text, bold=false}){
    if (!bold){
        return(
                <>
                    {text}
                </>
            )
    } else {
        return(
            <b>
                {text}
            </b>
        )
    }
    
}

function Link({text, destination, newTab=true, bold=false}){
    return(
        <>
        {(bold)?
        <b>
            <a href={destination} target={(newTab)?"_blank":"_self"}>
                {text}
            </a>
        </b>
        :
        <a href={destination} target={(newTab)?"_blank":"_self"}>
            {text}
        </a>
        }
        </>
    )
}

function NewLine(){
    return(
        <br/>
    )
}

function Heading({type=1, text, topSpace=0.7}){
    if (type === 1){
        return(
            <h1 style={{marginTop: topSpace+"em"}}>
                { text }
            </h1>
        )
    } else if (type === 2) {
        return(
            <h2 style={{marginTop: topSpace+"em"}}>
                { text }
            </h2>
        )
    } else if (type === 3) {
        return(
            <h3 style={{marginTop: topSpace+"em"}}>
                { text }
            </h3>
        )
    } else if (type === 4) {
        return(
            <h4 style={{marginTop: topSpace+"em"}}>
                { text }
            </h4>
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