import React, { useState } from "react";

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
            "agreedToDataTerms": isCheckbox2Checked
        }

        console.log(formArray)

        // Beispielhafte Weiterverarbeitung der Daten, z.B. Senden an einen Server
        // fetch('/submit', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(formArray)
        // })
        //   .then(response => response.json())
        //   .then(data => console.log('Erfolgreich gesendet:', data))
        //   .catch(error => console.error('Fehler:', error));

        alert("Deine Daten wurden erfolgreich übermitelt!\nBitte bestätige deine Teilnahme über den Link in der Email, die du gleich erhalten wirst.");
    };

    const canSubmit = isCheckbox1Checked && isCheckbox2Checked && firstName && lastName && email && solution;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Vorname:</label>
                <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label>Nachname:</label>
                <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Lösungssatz:</label>
                <input
                type="text"
                value={formatSolutionInput(solution)}
                onChange={handleSolutionChange}
                onKeyDown={handleKeyDown}
                />
            </div>
            <div>
                <input
                type="checkbox"
                checked={isCheckbox1Checked}
                onChange={(e) => setIsCheckbox1Checked(e.target.checked)}
                />
                <label>Ich stimme den Allgemeinen Geschäftsbedingungen zu.</label>
            </div>
            <div>
                <input
                type="checkbox"
                checked={isCheckbox2Checked}
                onChange={(e) => setIsCheckbox2Checked(e.target.checked)}
                />
                <label>Ich stimme der Datenschutzerklärung zu.</label>
            </div>

            <button type="submit" disabled={!canSubmit}>Absenden</button>
        </form>
    );
};

export default Form;
