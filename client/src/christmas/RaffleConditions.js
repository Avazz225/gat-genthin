import { BaseContainer, TextContainer } from "../atoms/ContentContainers";
import { Heading, Text } from "../atoms/TextContainers";
import Conditions from "./Conditions";

export default function RaffleConditions(){
    return(
        <BaseContainer>
            <Heading text="gat Adventskalender Gewinnspiel"/>
            <TextContainer>
                <Heading type={2} text="Gewinn"/>
                <Text text="Zu gewinnen gibt es 3 mal 2 Freikarten für die Vorstellung des Weihnachtsmärchens am 06.01.2025 in der Grundschule Ludwig Uhland in Genthin."/>
            </TextContainer>
            <Conditions/>
        </BaseContainer>
    )
}