function Centered({ children }){
    return(
        <div className="centered">
            { children }
        </div>
    )
}

function Normal({ children }){
    return(
        <div>
            { children }
        </div>
    )
}

function HorizontalRow({blue=false}){
    if (blue){
        return(
            <hr className="blue"/>
        )
    } else {
        return(
            <hr/>
        )
    }
    
}

export {Centered, Normal, HorizontalRow}