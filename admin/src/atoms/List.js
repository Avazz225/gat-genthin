import DeleteComponentBtn from "./DeleteComponent"

function UnorderedList({deleteData, index, deleteMode, children }){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            <ul>
                { children }
            </ul>
        </DeleteComponentBtn>
    )
}

function OrderedList({deleteData, index, deleteMode, children }){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            <ol>
                { children }
            </ol>
        </DeleteComponentBtn>
    )
}

function ListElement({deleteData, index, deleteMode, children }){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            <li>
                { children }
            </li>
        </DeleteComponentBtn>
    )
}

export {UnorderedList, OrderedList, ListElement}