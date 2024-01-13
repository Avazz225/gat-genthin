import { getTimespan } from "../helpers/tools"
import { NewLine } from "./TextContainers"

function BaseContainer({ children }){
    return(
        <div className="content">
            { children }
        </div>
    )
}

function TextContainer({ children }){
    return(
        <>
        <div className='content-pane texttype'>
            <p>
                { children }
            </p>
        </div>
        <NewLine/>
        </>
    )
}

function TimedContainer({startDisplay, endDisplay, children }){
    return(
        <>
        {(getTimespan(startDisplay, endDisplay))?
        <>
        { children }
        </>
        :
        <></>}
        </>
    )
}

function Blockquote({ children }){
    return(
        <blockquote>
            { children }
        </blockquote>
    )
}

function ParallelContainer({ children }){
    return(
        <div className="nextto">
            { children }
        </div>
    )
}

export {BaseContainer, TextContainer, TimedContainer, Blockquote, ParallelContainer}