import { Heading, NewLine, Text } from "../atoms/TextContainers";
import { TextContainer } from "../atoms/ContentContainers";

export default function Conditions(){
    return(
        <>
        <Heading text={"Teilnahmebedingungen"} type={2} />
        <TextContainer>
            <Heading text={"Teilnahmezeitraum"} type={3} />
            <Text text={"Die Teilnahme ist vom 24.12.2024, 00:00:00 Uhr bis zum 27.12.2024, 23:59:59 Uhr geöffnet."}/>
            <Heading text={"Veranstalter"} type={3} />
            <Text text={"Das Gewinnspiel wird vom Genthiner Amateurtheater e.V. ausgerichtet."}/>
            <Heading text={"Teilnahmeberechtigung"} type={3} />
            <Text text={"An der Teilnahme berechtigt ist jede Person, die zum Zeitpunkt des Endes des Teilnahmezeitraums das 18. Lebensjahr vollendet hat. Ausgeschlossen von der Teilnahme sind Minderjährige sowie Mitwirkende des Programms."}/>
            <Heading text={"Teilnahme"} type={3} />
            <Text text={"Die Teilnahme erfolgt ausschließlich über das hier zur Verfügung gestellte Formular. Eine Teilnahme über Telefon oder separater Email ist ausgeschlossen."}/>
            <Heading text={"Ermittlung"} type={3} />
            <Text text={"Nach Ende des Gewinnspiels werden die Gewinner über einen Zufallsgenerator ausgelost."}/>
            <Heading text={"Benachrichtigung"} type={3} />
            <Text text={"Die Gewinner werden am 28.12.2024 per Mail über Ihren Gewinn benachrichtigt. Zusätzlich werden sie in einer Meldung auf unserer Website in anonymisierter Form bekannt gegeben (Vorname und erster Buchstabe des Nachnamens)."}/>
            <Heading text={"Datenschutz"} type={3} />
            <Text text={"Für die Durchführung des Gewinnspiels speichern wir bis zum 06.01.2025 die angegebene Email, Vornamen und Nachnamen aller Teilnehmenden. Zusätzlich wird der Zeitpunkt der Teilnahme gespeichert. Die Speicherung und Verarbeitung der Daten erfolgt auf Lambda und RDS Servern von AWS."}/>
        </TextContainer>
        </>
    )
}