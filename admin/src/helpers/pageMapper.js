import { Link, Text, NewLine, Heading } from "../atoms/TextContainers"
import { BaseContainer, TextContainer, TimedContainer, Blockquote, ParallelContainer } from "../atoms/ContentContainers"
import { Centered, Normal, HorizontalRow } from "../atoms/Arrangement"
import { UnorderedList, OrderedList, ListElement } from "../atoms/List"
import { Image, ImageInText } from "../atoms/Image"
import GatCalendar from "../siteContent/CalenderDoors"
import AddComponent from "../atoms/AddComponent"

const PageMapper = ({data}) => (
    <>
    {data.map(data => (
        <>
        <AtomRenderer data={data}/>
        {(data.type!=="baseContainer")?<AddComponent/>:<></>}
        </>
    ))}
    </>
)

function AtomRenderer({data}){
    switch (data.type){
        case "text":
            return <Text text={data.text} bold={data.bold || false} />
        case "link":
            return <Link text={data.text} destination={data.destination} newTab={data.newTab || true} bold={data.bold || false} />
        case "newLine":
            return <NewLine/>
        case "heading":
            return <Heading text={data.text} topSpace={data.topSpace || 0.7} type={data.level || 1}/>
        case "baseContainer":
            return <BaseContainer><PageMapper data={data.content}/></BaseContainer>
        case "textContainer":
            return <TextContainer><PageMapper data={data.content}/></TextContainer>
        case "timedContainer":
            return <TimedContainer startDisplay={data.startDisplay} endDisplay={data.endDisplay}><PageMapper data={data.content}/></TimedContainer>
        case "blockquote":
            return <Blockquote><PageMapper data={data.content}/></Blockquote>
        case "parallelContainer":
            return <ParallelContainer><PageMapper data={data.content}/></ParallelContainer>
        case "horizontalRow":
            return <HorizontalRow blue={data.blue || false}/>
        case "centered":
            return <Centered><PageMapper data={data.content}/></Centered>
        case "normal":
            return <Normal><PageMapper data={data.content}/></Normal>
        case "unorderedList":
            return <UnorderedList><PageMapper data={data.content}/></UnorderedList>
        case "orderedList":
            return <OrderedList><PageMapper data={data.content}/></OrderedList>
        case "listElement":
            return <ListElement><PageMapper data={data.content}/></ListElement>
        case "image":
            return <Image src={process.env.REACT_APP_CDN_URL+data.src} width={data.width || 90} maxWidth={data.maxWidth || 50} alt={data.alt || ""} />
        case "imageInText":
            return <ImageInText src={process.env.REACT_APP_CDN_URL+data.src} align={data.align} alt={data.alt || ""} />
        case "calendar":
            return <GatCalendar/>
        default:
            return <Text text={'Der Typ "'+data.type+'" existiert nicht.'}/>
    }
}

export default PageMapper