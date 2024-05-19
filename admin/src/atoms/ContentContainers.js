import { getTimespan } from "../helpers/tools"
import DeleteComponentBtn from "./DeleteComponent"
import { NewLine } from "./TextContainers"

function BaseContainer({ children }){
    return(
        <div className="content">
            { children }
        </div>
    )
}

function TextContainer({deleteData, index, deleteMode, children }){
    return(
        <>
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            <div className='content-pane texttype'>
                <p>
                    { children }
                </p>
            </div>
            <NewLine/>
        </DeleteComponentBtn>
        </>
    )
}

function TimedContainer({deleteData, index, deleteMode, startDisplay, endDisplay, children }){
    if (deleteMode){
        return(
            <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
                <div className="content-pane timedtype">
                    <p>
                    { children } 
                    </p>  
                </div>
                <NewLine/>
            </DeleteComponentBtn>
        )
    } else {
        return(
            <>
            {(getTimespan(startDisplay, endDisplay))?
            <div>
            <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
                { children }
            </DeleteComponentBtn>
            </div>
            :
            <></>}
            </>
        )
    }
}

function Blockquote({deleteData, index, deleteMode,  children }){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            <blockquote>
                { children }
            </blockquote>
        </DeleteComponentBtn>
    )
}

function ParallelContainer({deleteData, index, deleteMode, children }){
    return(
        <DeleteComponentBtn deleteMode={deleteMode} deleteData={deleteData} index={index}>
            <div className="nextto">
                { children }
            </div>
        </DeleteComponentBtn>
    )
}

export {BaseContainer, TextContainer, TimedContainer, Blockquote, ParallelContainer}