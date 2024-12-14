import React, { useEffect, useState } from 'react';
import { BaseContainer, TextContainer } from "../atoms/ContentContainers"
import { Heading, Link, Text } from "../atoms/TextContainers"

const Imprint = () => {
    const [imprintData, setImprintData] = useState(null);

    useEffect(() => {
        fetch('/data/important/imprint.json?r=1')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setImprintData(data);
        })
        .catch((error) => {
            console.error('Error fetching the imprint data:', error);
        });
    }, []);

    if (!imprintData) {
        return <div>Lade Impressum...</div>;
    }

    return (
        <BaseContainer>
            <Heading text={"Impressum"}/>
            <TextContainer>
                <Heading text={imprintData.fullName} type={3}/>
                <Text text={"Adresse:"} bold/><br/>
                {imprintData.address.street} {imprintData.address.number}<br/>
                {imprintData.address.postal}, {imprintData.address.city}<br/><br/>
                <Text text={"Vertretungsberechtigte Person:"} bold/><br/>
                {imprintData.representative.name}<br/>
                {imprintData.representative.street} {imprintData.representative.number}<br/>
                {imprintData.representative.postal}, {imprintData.representative.city}<br/><br/>
                <Text text={"Kontakt:"} bold/><br/>
                Email: <Link text={imprintData.contact.email} destination={"mailto:"+imprintData.contact.email}/><br/>
                Telefon: <Link text={imprintData.contact.tel} destination={"tel:"+imprintData.contact.tel}/><br/><br/>
                Vereinsregister: {imprintData.register.court}<br/>
                Vereinsregisternummer: {imprintData.register.number}<br/>
                {(imprintData.identification.salesTax)&&<>Umsatzsteueridentifikationsnummer: {imprintData.identification.salesTax}<br/></>}
                {(imprintData.identification.economicId)&&<>Wirtschaftsidentifikationsnummer: {imprintData.identification.economicId}<br/></>}
                {(imprintData.otherSocialMedia)&&<><br/>Dieses Impressum ist auch für {(Object.keys(imprintData.otherSocialMedia).length !== 1)?"die offiziellen Social Media Kanäle":"den offiziellen Social Media Kanal"} des Genthiner Amateurtheater e.V. auf <MapSocialMedia data={imprintData.otherSocialMedia}/> gültig.</>}
            </TextContainer>
        </BaseContainer>
    )
}

const MapSocialMedia = ({ data }) => {
    const keys = Object.keys(data);
    return (
        <>
            {keys.map((key, i) => (
            <React.Fragment key={i}>
                <Link text={key} destination={data[key]} />
                {i < keys.length - 1 && ', '}
            </React.Fragment>
            ))}
        </>
    );
}

export default Imprint