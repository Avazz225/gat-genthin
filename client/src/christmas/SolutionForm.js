import React, { useState } from "react";
import "./chistmas.css"
import { Heading, NewLine, Text } from "../atoms/TextContainers";
import { TextContainer } from "../atoms/ContentContainers";

const Form = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [solution, setSolution] = useState("");
    const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
    const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);

    const wordLengths = [5, 3, 3, 4]; 
    const totalLength = wordLengths.reduce((acc, curr) => acc + curr, 0);

    const formatSolutionInput = (input) => {
        let formattedSolution = "";
        let index = 0;

        wordLengths.forEach((length, i) => {
        if (index + length > input.length) {
            formattedSolution += input.substring(index);
        } else {
            formattedSolution += input.substring(index, index + length);
            if (i < wordLengths.length - 1) {
            formattedSolution += "\u00A0";
            }
        }
        index += length;
        });

        return formattedSolution;
    };

    const handleSolutionChange = (e) => {
        const userInput = e.target.value.replace(/\s+/g, "").slice(0,totalLength);
        setSolution(userInput);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            if (solution.length > 0) {
                setSolution(solution.slice(0, -1));
            }
        }
    };

    // Submit-Handler
    const handleSubmit = (e) => {
        e.preventDefault(); 

        
        if (!firstName || !lastName || !email || !solution) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Bitte eine gültige E-Mail-Adresse eingeben!");
            return;
        }

        var formArray = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "solution": solution.toLowerCase(),
            "solutionLength": solution.length,
            "agreedToTermsOfService": isCheckbox1Checked,
            "agreedToParticipationConditions": isCheckbox2Checked
        }

        console.log(formArray)

        //Beispielhafte Weiterverarbeitung der Daten, z.B. Senden an einen Server
        fetch(process.env.REACT_APP_RAFFLE_API+'/participate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formArray)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => { 
            alert("Deine Daten wurden erfolgreich übermittelt!\nBitte bestätige deine Teilnahme über den Link in der Email, die du gleich erhalten wirst.");
        })
        .catch(error => {
            if (error.message === "403"){
                alert("Du hast schon mit dieser Email am Gewinnspiel teilgenommen. Bitte bedenke, dass du nur ein Mal teilnehmen darfst!");
            } else if (error.message === "409") {
                alert("Der Lösungssatz ist falsch! Überlege noch einmal und versuche es erneut.");
            } else if (error.message === "406") {
                alert("Du hast nicht den AGBs oder den Teilnahmebedingungen zugestimmt.");
            } else {
                console.log(error)
                alert("Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuche es erneut.");
            }
        });
    };

    const canSubmit = isCheckbox1Checked && isCheckbox2Checked && firstName && lastName && email && solution;

    return (
        <div className="content chBasePane">
            <Heading text={"Gewinnspiel"}/>
            <TextContainer>
                <Text text={"Hier kannst du den Lösungssatz* für das Adventskalender-Gewinnspiel des gat eintragen!"}/>
                <NewLine/>
                <Text text={"Wir wünschen allen Teilnehmenden viel Glück."}/>
                <NewLine/>
                <NewLine/>
                <div className="chSmol">
                    <Text text={"Bitte denke daran nachdem du das Formular abgeschickt hast, auch deine Teilnahme über den Link in der Email, die du erhältst, zu bestätigen."}/>
                    <NewLine/>
                    <NewLine/>
                    <Text text={"* Groß- und Kleinschreibung sind nicht relevant, Leerzeichen werden automatisch gesetzt"}/>
                </div>
            </TextContainer>
            <form onSubmit={handleSubmit} className="chForm">
                <div>
                    <label className="chLabel">Vorname:</label>
                    <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="chInputText"
                    />
                </div>
                <div>
                    <label className="chLabel"> Nachname:</label>
                    <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="chInputText"
                    />
                </div>
                <div>
                    <label className="chLabel">Email:</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="chInputText"
                    />
                </div>
                <div>
                    <label className="chLabel">Lösungssatz:</label>
                    <input
                    type="text"
                    value={formatSolutionInput(solution)}
                    onChange={handleSolutionChange}
                    onKeyDown={handleKeyDown}
                    className="chInputText"
                    />
                </div>
                <div>
                <div class="checkbox-wrapper-13">
                        <input
                        type="checkbox"
                        checked={isCheckbox1Checked}
                        onChange={(e) => setIsCheckbox1Checked(e.target.checked)}
                        />
                        <label>Ich stimme den Allgemeinen Geschäftsbedingungen zu.</label>
                    </div>
                    <div class="checkbox-wrapper-13">
                        <input
                        type="checkbox"
                        checked={isCheckbox2Checked}
                        onChange={(e) => setIsCheckbox2Checked(e.target.checked)}
                        />
                        <label>Ich stimme den untenstehenden Teilnahmebedingungen zu.</label>
                    </div>
                </div>

                <button type="submit" disabled={!canSubmit} className="chSubmitBtn">Absenden</button>
            </form>
            <Heading text={"Teilnahmebedingungen"} type={2} />
            <TextContainer>
                <Heading text={"Teilnahmezeitraum"} type={3} />
                <Text text={"Die Teilnahme ist bis zum 27.12.2024 23:59:59 Uhr geöffnet."}/>
                <Heading text={"Veranstalter"} type={3} />
                <Text text={"Das Gewinnspiel wird vom Genthiner Amateurtheater e.V. ausgerichtet."}/>
                <Heading text={"Teilnahmeberechtigung"} type={3} />
                <Text text={"An der Teilnahme berechtigt ist jede Peson, die zum Zeitpunkt des Endes des Teilnahmezeitraums das 18. Lebensjahr vollendet hat. Ausgeschlossen von der Teilnahme sind Minderjährige sowie Mitwirkende des Programms."}/>
                <Heading text={"Teilnahme"} type={3} />
                <Text text={"Die Teilnahme erfolgt ausschließlich über das hier zur Verfügung gestellte Formular. Eine Teilnahme über Telefon oder separater Email ist ausgeschlossen."}/>
                <Heading text={"Ermittlung"} type={3} />
                <Text text={"Nach Ende des Gewinnspiels werden die Gewinner über einen Zufallsgenerator ausgelost."}/>
                <Heading text={"Benachrichtigung"} type={3} />
                <Text text={"Die Gewinner werden am 28.12.2024 per Mail über Ihren Gewinn benachrichtigt. Zusätzlich werden sie in einer Meldung auf unserer Website in anonymisierter Form bekannt gegeben (Vorname und erster Buchstabe des Nachnamens)."}/>
                <Heading text={"Datenschutz"} type={3} />
                <Text text={"Für die Durchführung des Gewinnspiels speichern wir bis zum 06.01.2025 die angegebene Email, Vornamen und Nachnamen aller Teilnehmenden. Zusätzlich wird der Zeitpunkt der Teilnahme gespeichert. Die Speicherung erfolgt auf den Servern von AWS."}/>
            </TextContainer>
        </div>
    );
};

export default Form;
