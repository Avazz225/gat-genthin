function UnorderedList({ children }){
    return(
        <ul>
            { children }
        </ul>
    )
}

function OrderedList({ children }){
    return(
        <ol>
            { children }
        </ol>
    )
}

function ListElement({ children }){
    return(
        <li>
            { children }
        </li>
    )
}

export {UnorderedList, OrderedList, ListElement}