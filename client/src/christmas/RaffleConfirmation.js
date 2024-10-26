import React, { useEffect, useState } from 'react';
import { BaseContainer } from '../atoms/ContentContainers';
import { Heading } from '../atoms/TextContainers';

function RaffleConfirmation(){
    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error', 'processing'

    useEffect(() => {
        // Extrahiere den Query-Parameter "code" aus der URL
        const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const code = hashParams.get('code');

        if (code) {
        confirmParticipation(code);
        } else {
        setStatus('error');
        }
    }, []);

    const confirmParticipation = async (confirmationCode) => {
        setStatus('processing');
        try {
            
            const response = await fetch(process.env.REACT_APP_RAFFLE_API+'/confirmparticipation', {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ confirmationCode }),
            });

            if (response.status === 200) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
        setStatus('error');
        }
    };

    return (
        <BaseContainer>
            <Heading text={"Teilnahmebestätigung"}/>
            {status === 'loading' && <Heading type={2} text={"Lade..."}/>}
            {status === 'processing' && <Heading type={2} text={"Bitte warte während wir deine Teilnahme bestätigen..."}/>}
            {status === 'success' && <Heading type={2} text={"Erfolg! Deine Teilnahme am Gewinnspiel wurde erfolgreich bestätigt."}/>}
            {status === 'error' &&<> <Heading type={2} text={"Deine Teilnahme am Gewinnspiel konnte leider nicht bestätigt werden."}/> <Heading type={2} text={"Bitte versuche es später erneut."}/></>}
        </BaseContainer>
    );
}

export default RaffleConfirmation