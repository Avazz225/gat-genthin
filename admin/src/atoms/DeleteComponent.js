import "./DeleteComponent.css"

function DeleteComponentBtn({deleteData, index, deleteMode=false , children, maxWidth=false}){
    if (deleteMode){
        return(
            <div className="deleteComponentWrapper" style={{width: maxWidth?"100%":"auto"}}>
                <div className="bin">
                    <input type="checkbox" className="binBox"/>
                </div>
                <div className="deleteOverlay" >
                    <button className="deleteBtn" onClick={(e) => deleteData(index)}>Element(e) löschen</button>
                </div>
                { children }
            </div>
        )
    } else {
        return(
            <>{ children }</>
        )
    }
}   

export default DeleteComponentBtn