import { Heading, NewLine, Text } from '../atoms/TextContainers';
import { TimedContainer } from '../atoms/ContentContainers';

function Extra(){
    return(
        <div>
            <Heading type={2} text={"Gewinne 2 Freikarten für die letzte Vorstellung des Weihnachtsmärchens!"}/>
            <Text text="Wir verlosen 3 mal 2 Freikarten für die Vorstellung am 06.01.2025!"/>
            <NewLine/>
            <Text text="Komme täglich vorbei und sammle Buchstaben für unser Gewinnspiel ein. Vom 24.12 - 27.12.24 kannst du dann hier den Lösungssatz eintragen und an dem Gewinnspiel teilnehmen."/>
            <ToRaffleButton/>
        </div>
    )
}

function ToRaffleButton(){
    return(
        <TimedContainer startDisplay={[24, 12, 2024]} endDisplay={[27, 12, 2024]}>
            <NewLine/>
            <NewLine/>
            <GoToParticipation/>
        </TimedContainer>
    )
}

function GoToParticipation(){
    return(
        <a href='#/enter' className='christmasParticipate'>
            <Text text="Jetzt am Gewinnspiel teilnehmen!"/>
        </a>
    )
}

export {Extra, ToRaffleButton}