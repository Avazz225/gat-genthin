import { Link, Text, NewLine, Heading } from "../atoms/TextContainers"
import { BaseContainer, TextContainer, TimedContainer, Blockquote, ParallelContainer } from "../atoms/ContentContainers"
import { Centered, Normal, HorizontalRow } from "../atoms/Arrangement"
import { UnorderedList, OrderedList, ListElement } from "../atoms/List"
import { Image, ImageInText } from "../atoms/Image"
import GatCalendar from "../siteContent/CalenderDoors"
import AddComponent from "../atoms/AddComponent"
import { appendToArray, increaseLastByOne } from "./tools"
import React from "react"


function PageMapper(props){
    const renderElements = (data, previousIndexes = []) => {
        return data.map((elementdata, index) => {
            const currentIndexes = Object.assign([], appendToArray(previousIndexes, index))
            return (
                <React.Fragment key={index}>
                    <AtomRenderer
                        data={elementdata}
                        addData={props.addData}
                        deleteData={props.deleteData}
                        previousIndexes={currentIndexes}
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />
                    {(elementdata.type !== "baseContainer" && elementdata.type !== "unorderedList" && elementdata.type !== "orderedList" && elementdata.type !== "listElement") && (
                        <AddComponent
                            index={increaseLastByOne(currentIndexes)}
                            addData={props.addData}
                            adminComponentsVisible={props.adminComponentsVisible}
                        />
                    )}
                </React.Fragment>
            );
            });
        };
    return <>{renderElements(props.data, props.previousIndexes)}</>;
}

function AddListElement(props){
    return(
        <li>
            <div className="addListElement" onClick={() => props.addData("listElement", props.index)}>Listenpunkt</div>
        </li>
    )
}

function AtomRenderer(props){
    const previousIndexes = Object.assign([], props.previousIndexes)

    switch (props.data.type){
        case "text":
            return <Text 
                        index={props.previousIndexes} 
                        changeProperty={props.changeProperty} 
                        deleteMode={props.deleteMode} 
                        deleteData={props.deleteData}
                        text={props.data.text} 
                        bold={props.data.bold || false} 
                    />
        case "link":
            return <Link 
                        index={props.previousIndexes} 
                        changeProperty={props.changeProperty} 
                        deleteMode={props.deleteMode} 
                        deleteData={props.deleteData}
                        text={props.data.text} 
                        destination={props.data.destination} 
                        newTab={props.data.newTab || true} 
                        bold={props.data.bold || false} 
                    />
        case "newLine":
            return <NewLine 
                        deleteMode={props.deleteMode} 
                        deleteData={props.deleteData}
                        index={props.previousIndexes} 
                    />
        case "heading":
            return <Heading 
                        index={props.previousIndexes} 
                        changeProperty={props.changeProperty} 
                        deleteMode={props.deleteMode} 
                        deleteData={props.deleteData}
                        text={props.data.text} 
                        topSpace={props.data.topSpace || 0.7} 
                        type={props.data.level || 1}
                    />
        case "baseContainer":
            return(
                <BaseContainer> 
                    <AddComponent
                        index={Object.assign([], appendToArray(previousIndexes, 0))}
                        addData={props.addData}
                        adminComponentsVisible={props.adminComponentsVisible}
                    /> 
                    <PageMapper 
                        data={props.data.content} 
                        addData={props.addData} 
                        deleteData={props.deleteData}
                        previousIndexes={previousIndexes} 
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />
                </BaseContainer>
            )
        case "textContainer":
            return( 
                <TextContainer 
                    deleteMode={props.deleteMode} 
                    deleteData={props.deleteData}
                    index={props.previousIndexes} 
                >
                    <AddComponent
                        index={Object.assign([], appendToArray(previousIndexes, 0))}
                        addData={props.addData}
                        adminComponentsVisible={props.adminComponentsVisible}
                    /> 
                    <PageMapper 
                        data={props.data.content} 
                        addData={props.addData} 
                        deleteData={props.deleteData}
                        previousIndexes={previousIndexes} 
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />
                </TextContainer>
            )
        case "timedContainer":
            return( 
                <TimedContainer 
                    startDisplay={props.data.startDisplay} 
                    endDisplay={props.data.endDisplay} 
                    deleteMode={props.deleteMode}
                    deleteData={props.deleteData}
                    index={props.previousIndexes} 
                >
                    <AddComponent
                        index={Object.assign([], appendToArray(previousIndexes, 0))}
                        addData={props.addData}
                        adminComponentsVisible={props.adminComponentsVisible}
                    /> 
                    <PageMapper 
                        data={props.data.content} 
                        addData={props.addData} 
                        deleteData={props.deleteData}
                        previousIndexes={previousIndexes} 
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />
                </TimedContainer>
            )
        case "blockquote":
            return( 
                <Blockquote 
                    deleteMode={props.deleteMode}
                    deleteData={props.deleteData}
                    index={props.previousIndexes} 
                >
                    <AddComponent
                        index={Object.assign([], appendToArray(previousIndexes, 0))}
                        addData={props.addData}
                        adminComponentsVisible={props.adminComponentsVisible}
                    /> 
                    <PageMapper 
                        data={props.data.content} 
                        addData={props.addData} 
                        deleteData={props.deleteData}
                        previousIndexes={previousIndexes} 
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />
                </Blockquote>
            )
        case "parallelContainer":
            return(
                <ParallelContainer 
                    deleteMode={props.deleteMode}
                    deleteData={props.deleteData}
                    index={props.previousIndexes} 
                >
                    <AddComponent
                        index={Object.assign([], appendToArray(previousIndexes, 0))}
                        addData={props.addData}
                        adminComponentsVisible={props.adminComponentsVisible}
                    /> 
                    <PageMapper 
                        data={props.data.content} 
                        addData={props.addData} 
                        deleteData={props.deleteData}
                        previousIndexes={previousIndexes} 
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />
                </ParallelContainer>
            )
        case "horizontalRow":
            return <HorizontalRow 
                        blue={props.data.blue || false} 
                        deleteMode={props.deleteMode}
                        deleteData={props.deleteData}
                        index={props.previousIndexes} 
                    />
        case "centered":
            return( 
                <Centered 
                    deleteMode={props.deleteMode}
                    deleteData={props.deleteData}
                    index={props.previousIndexes} 
                >
                    <AddComponent
                        index={Object.assign([], appendToArray(previousIndexes, 0))}
                        addData={props.addData}
                        adminComponentsVisible={props.adminComponentsVisible}
                    /> 
                    <PageMapper 
                        data={props.data.content} 
                        addData={props.addData} 
                        deleteData={props.deleteData}
                        previousIndexes={previousIndexes} 
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />
                </Centered>
            )
        case "normal":
            return( 
                <Normal 
                    deleteMode={props.deleteMode}
                    deleteData={props.deleteData}
                    index={props.previousIndexes} 
                >
                    <AddComponent
                        index={Object.assign([], appendToArray(previousIndexes, 0))}
                        addData={props.addData}
                        adminComponentsVisible={props.adminComponentsVisible}
                    /> 
                    <PageMapper 
                        data={props.data.content} 
                        addData={props.addData} 
                        deleteData={props.deleteData}
                        previousIndexes={previousIndexes} 
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />
                </Normal>
            )
        case "unorderedList":
            return(
                <UnorderedList 
                    deleteMode={props.deleteMode}
                    deleteData={props.deleteData}
                    index={props.previousIndexes} 
                >
                    <AddComponent
                        index={Object.assign([], appendToArray(previousIndexes, 0))}
                        addData={props.addData}
                        adminComponentsVisible={props.adminComponentsVisible}
                    /> 
                    <PageMapper 
                        data={props.data.content} 
                        addData={props.addData} 
                        deleteData={props.deleteData}
                        previousIndexes={previousIndexes} 
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />
                    <AddListElement 
                        index={appendToArray(previousIndexes, props.data.content.length)}
                        addData={props.addData}
                    />
                </UnorderedList>
            )
        case "orderedList":
            return(
                <OrderedList 
                    deleteMode={props.deleteMode}
                    deleteData={props.deleteData}
                    index={props.previousIndexes} 
                >
                    <AddComponent
                        index={Object.assign([], appendToArray(previousIndexes, 0))}
                        addData={props.addData}
                        adminComponentsVisible={props.adminComponentsVisible}
                    /> 
                    <PageMapper 
                        data={props.data.content} 
                        addData={props.addData} 
                        deleteData={props.deleteData}
                        previousIndexes={previousIndexes} 
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />
                    <AddListElement 
                        index={appendToArray(previousIndexes, props.data.content.length)}
                        addData={props.addData}
                    />
                </OrderedList>
            )
        case "listElement":
            return(
                <ListElement 
                    deleteMode={props.deleteMode}
                    deleteData={props.deleteData}
                    index={props.previousIndexes} 
                >
                    <AddComponent
                        index={Object.assign([], appendToArray(previousIndexes, 0))}
                        addData={props.addData}
                        adminComponentsVisible={props.adminComponentsVisible}
                    /> 
                    <PageMapper 
                        data={props.data.content} 
                        addData={props.addData} 
                        deleteData={props.deleteData}
                        previousIndexes={previousIndexes} 
                        adminComponentsVisible={props.adminComponentsVisible}
                        deleteMode={props.deleteMode}
                        changeProperty={props.changeProperty}
                    />                
                </ListElement>
            )
        case "image":
            return <Image 
                        deleteMode={props.deleteMode} 
                        deleteData={props.deleteData}
                        index={props.previousIndexes} 
                        src={process.env.REACT_APP_CDN_URL+props.data.src} 
                        width={props.data.width || 90} 
                        maxWidth={props.data.maxWidth || 50} 
                        alt={props.data.alt || ""} 
                    />
        case "imageInText":
            return <ImageInText 
                        deleteMode={props.deleteMode} 
                        deleteData={props.deleteData}
                        index={props.previousIndexes} 
                        src={process.env.REACT_APP_CDN_URL+props.data.src} 
                        align={props.data.align} 
                        alt={props.data.alt || ""} 
                    />
        case "calendar":
            return <GatCalendar/>
        case "newsContainer":
            return(
            <>
                <AddComponent
                    index={Object.assign([], appendToArray(previousIndexes, 0))}
                    addData={props.addData}
                    adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper 
                    data={props.data.content} 
                    addData={props.addData} 
                    deleteData={props.deleteData}
                    previousIndexes={previousIndexes} 
                    adminComponentsVisible={props.adminComponentsVisible}
                    deleteMode={props.deleteMode}
                    changeProperty={props.changeProperty}
                />
            </>)
        default:
            return <Text text={'Der Typ "'+props.data.type+'" existiert nicht.'}/>
    }
}

export default PageMapper