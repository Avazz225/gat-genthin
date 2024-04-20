import DeleteComponentBtn from "./DeleteComponent"

function Centered({deleteData, index, deleteMode, children }){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            <div className="centered">
                { children }
            </div>
        </DeleteComponentBtn>
    )
}

function Normal({deleteData, index, deleteMode, children }){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            <div>
                { children }
            </div>
        </DeleteComponentBtn>
    )
}

function HorizontalRow({deleteData, index, deleteMode, blue=false}){
    if (blue){
        return(
            <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index} maxWidth={true}>
                <hr className="blue"/>
            </DeleteComponentBtn>
        )
    } else {
        return(
            <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index} maxWidth={true}>
                <hr/>
            </DeleteComponentBtn>
        )
    }
    
}

export {Centered, Normal, HorizontalRow}