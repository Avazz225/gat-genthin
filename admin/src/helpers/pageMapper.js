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
                        previousIndexes={currentIndexes}
                        adminComponentsVisible={props.adminComponentsVisible}
                    />
                    {elementdata.type !== "baseContainer" && (
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

function AtomRenderer(props){
    const previousIndexes = Object.assign([], props.previousIndexes)

    switch (props.data.type){
        case "text":
            return <><Text text={props.data.text} bold={props.data.bold || false} /></>
        case "link":
            return <Link text={props.data.text} destination={props.data.destination} newTab={props.data.newTab || true} bold={props.data.bold || false} />
        case "newLine":
            return <NewLine/>
        case "heading":
            return <Heading text={props.data.text} topSpace={props.data.topSpace || 0.7} type={props.data.level || 1}/>
        case "baseContainer":
            return(
            <BaseContainer> 
                <AddComponent
                index={Object.assign([], appendToArray(previousIndexes, 0))}
                addData={props.addData}
                adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </BaseContainer>
            )
        case "textContainer":
            return( 
            <TextContainer>
                <AddComponent
                index={Object.assign([], appendToArray(previousIndexes, 0))}
                addData={props.addData}
                adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </TextContainer>
            )
        case "timedContainer":
            return( 
            <TimedContainer startDisplay={props.data.startDisplay} endDisplay={props.data.endDisplay}>
                <AddComponent
                index={Object.assign([], appendToArray(previousIndexes, 0))}
                addData={props.addData}
                adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </TimedContainer>
            )
        case "blockquote":
            return( 
            <Blockquote>
                <AddComponent
                index={Object.assign([], appendToArray(previousIndexes, 0))}
                addData={props.addData}
                adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </Blockquote>
            )
        case "parallelContainer":
            return(
            <ParallelContainer>
                <AddComponent
                index={Object.assign([], appendToArray(previousIndexes, 0))}
                addData={props.addData}
                adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </ParallelContainer>
            )
        case "horizontalRow":
            return <HorizontalRow blue={props.data.blue || false}/>
        case "centered":
            return( 
            <Centered>
                <AddComponent
                index={Object.assign([], appendToArray(previousIndexes, 0))}
                addData={props.addData}
                adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </Centered>
            )
        case "normal":
            return( 
            <Normal>
                <AddComponent
                index={Object.assign([], appendToArray(previousIndexes, 0))}
                addData={props.addData}
                adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </Normal>
            )
        case "unorderedList":
            return(
            <UnorderedList>
                <AddComponent
                index={Object.assign([], appendToArray(previousIndexes, 0))}
                addData={props.addData}
                adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </UnorderedList>
            )
        case "orderedList":
            return(
            <OrderedList>
                <AddComponent
                index={Object.assign([], appendToArray(previousIndexes, 0))}
                addData={props.addData}
                adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </OrderedList>
            )
        case "listElement":
            return(
            <ListElement>
                <AddComponent
                index={Object.assign([], appendToArray(previousIndexes, 0))}
                addData={props.addData}
                adminComponentsVisible={props.adminComponentsVisible}
                /> 
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </ListElement>
            )
        case "image":
            return <Image src={process.env.REACT_APP_CDN_URL+props.data.src} width={props.data.width || 90} maxWidth={props.data.maxWidth || 50} alt={props.data.alt || ""} />
        case "imageInText":
            return <ImageInText src={process.env.REACT_APP_CDN_URL+props.data.src} align={props.data.align} alt={props.data.alt || ""} />
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
                <PageMapper data={props.data.content} addData={props.addData} previousIndexes={previousIndexes} adminComponentsVisible={props.adminComponentsVisible}/>
            </>)
        default:
            return <Text text={'Der Typ "'+props.data.type+'" existiert nicht.'}/>
    }
}

export default PageMapper