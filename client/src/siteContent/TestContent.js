import { BaseContainer, TextContainer } from "../atoms/ContentContainers";
import { Heading } from "../atoms/TextContainers";
import GatCalendar from "../christmas/CalenderDoors";

export default function TestContent(){
    return(
        <BaseContainer>
            <Heading text={"Mit gat durch den Advent"}/>
            <TextContainer>
                <GatCalendar/>
            </TextContainer>
        </BaseContainer>
    )
}