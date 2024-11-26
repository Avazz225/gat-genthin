import { Link, Text, NewLine, Heading } from "../atoms/TextContainers"
import { BaseContainer, TextContainer, TimedContainer, Blockquote, ParallelContainer } from "../atoms/ContentContainers"
import { Centered, Normal, HorizontalRow } from "../atoms/Arrangement"
import { UnorderedList, OrderedList, ListElement } from "../atoms/List"
import { Image, ImageInText } from "../atoms/Image"
import AddComponent from "../adminComponents/AddComponent"
import { appendToArray, increaseLastByOne } from "./tools"
import React from "react"
import TimedConfigurator from "../adminComponents/TimedConfigurator"
import { Embed } from "../atoms/Embed"
import AutoGallery from "../atoms/AutoGallery"


function PageMapper(props){
    const renderElements = (data, previousIndexes = []) => {
        return data.map((elementdata, index) => {
            const currentIndexes = Object.assign([], appendToArray(previousIndexes, index))
            return (
                <React.Fragment key={index}>
                    <AtomRenderer
                        {...props}
                        data={elementdata}
                        previousIndexes={currentIndexes}
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
                        setTextSelection={props.setTextSelection}
                        handleEnter={props.handleEnter}
                        modifyState = {props.modifyState}
                        opacity={props.data.opacity}
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
                        setTextSelection={props.setTextSelection}
                        handleEnter={props.handleEnter}
                        modifyState = {props.modifyState}
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
                        handleEnter={props.handleEnter}
                        modifyState = {props.modifyState}
                        setTextSelection={props.setTextSelection}
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
                        {...props}
                        data={props.data.content} 
                        previousIndexes={previousIndexes} 
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
                        {...props}
                        data={props.data.content} 
                        previousIndexes={previousIndexes} 
                    />
                </TextContainer>
            )
        case "timedContainer":
            return( 
                <TimedConfigurator
                    index={props.previousIndexes}
                    startDisplay={props.data.startDisplay} 
                    endDisplay={props.data.endDisplay} 
                    changeProperty={props.changeProperty}
                >   
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
                            {...props}
                            data={props.data.content} 
                            previousIndexes={previousIndexes} 
                        />
                    </TimedContainer>
                </TimedConfigurator>
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
                        {...props}
                        data={props.data.content} 
                        previousIndexes={previousIndexes} 
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
                        {...props}
                        data={props.data.content} 
                        previousIndexes={previousIndexes} 
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
                        {...props}
                        data={props.data.content} 
                        previousIndexes={previousIndexes} 
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
                        {...props}
                        data={props.data.content} 
                        previousIndexes={previousIndexes} 
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
                        {...props}
                        data={props.data.content} 
                        previousIndexes={previousIndexes} 
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
                        {...props}
                        data={props.data.content} 
                        previousIndexes={previousIndexes} 
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
                        {...props}
                        data={props.data.content} 
                        previousIndexes={previousIndexes} 
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
                        modifyState = {props.modifyState}
                        handleFileUpload = {props.handleFileUpload}
                        uploadInProgress={props.uploadInProgress}
                    />
        case "imageInText":
            return <ImageInText 
                        deleteMode={props.deleteMode} 
                        deleteData={props.deleteData}
                        index={props.previousIndexes} 
                        src={process.env.REACT_APP_CDN_URL+props.data.src} 
                        align={props.data.align} 
                        alt={props.data.alt || ""} 
                        modifyState = {props.modifyState}
                        handleFileUpload = {props.handleFileUpload}
                        uploadInProgress={props.uploadInProgress}
                    />
        case "embed":
            return <Embed 
                        src={props.data.src} 
                        width={props.data.width} 
                        height={props.data.height} 
                        center= {props.data.center || false}
                        deleteMode={props.deleteMode} 
                        deleteData={props.deleteData}
                        index={props.previousIndexes}
                        modifyState = {props.modifyState}
                    />
        case "autoGallery":
            return <AutoGallery
                        src={props.data.src}
                        inverted={props.data.inverted || false}
                        deleteMode={props.deleteMode} 
                        deleteData={props.deleteData}
                        index={props.previousIndexes}
                        modifyState = {props.modifyState}
                        handleFileUpload = {props.handleFileUpload}
                        uploadInProgress={props.uploadInProgress}
                    />
        case "newsContainer":
            return(
            <>
                <AddComponent
                    index={Object.assign([], appendToArray(previousIndexes, 0))}
                    addData={props.addData}
                    adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper 
                    {...props}
                    data={props.data.content} 
                    previousIndexes={previousIndexes} 
                />
            </>)
        default:
            return <Text text={'Der Typ "'+props.data.type+'" existiert nicht.'}/>
    }
}

export default PageMapper