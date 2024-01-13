import { Centered, HorizontalRow } from '../atoms/Arrangement';
import { BaseContainer, Blockquote, TextContainer } from '../atoms/ContentContainers';
import { Image } from '../atoms/Image';
import { Heading, Text } from '../atoms/TextContainers';
import './css/About.css';

function About(){
    return(
        <BaseContainer>
            <Heading text="Über uns"/>
            <TextContainer>
                <Text text=
                'Im Herbst 1971 entschieden sich Mitglieder des Klubrates im Jugendklubhaus Genthin (heute Begegnungsstätte Lindenhof) zur Weihnachtszeit Theater zu spielen. Ein Zufall wollte es, dass die Aufführung einer kleinen Märchenrevue auf den Nachmittag des 24. Dezember fiel. Ein volles Haus ermunterte dazu, im Folgejahr ähnliches zu tun. Diese Tradition hat sich bis heute erhalten. Aus der saisonal tätigen Laienspielgruppe wurde in den Jahren ein Amateurtheater, das sich ab 1977 "Märchentruhe Genthin" nannte. In den Folgejahren wuchs der Wunsch nach mehr Theater. Mit der ersten Schauspielinszenierung (1987 Regina b. - Ein Tag in ihrem Leben) die uns bis zum DDR-Leistungsvergleich nach Halle (Saale) führte, nannte sich das Ensemble "genthiner amateurtheater", in Kurzform also -gat-.'
                />
            </TextContainer>
            <TextContainer>
            <Text text="Das Domizil war das Kreiskulturhaus Volksgarten. Zuvor fusionierte -gat- mit dem Dramatischen Zirkel des Waschmittelwerkes, 
                    mit dem ohnehin schon enge personelle Verflechtung bestanden. Mit der Wende entschied sich -gat- dorthin zu gehen, 
                    wo die Zuschauer sind und begann sein Hans-Sachs-Projekt als Straßentheater. Das war ein Volltreffer, der sich vor allem als finanzieller Rettungsanker erwies."/>
            </TextContainer>
            <Blockquote>
                <Text text="Das genthiner amateurtheater e.V. (gat) feierte mit der Spielzeit 2020/21 sein 50-jähriges Bestehen."/>
            </Blockquote>
            <HorizontalRow blue={true} />
            <Heading text="Spielorte" />
            <TextContainer>
                <Centered>
                    <Image src={process.env.REACT_APP_CDN_URL+"spielorte.png"} alt="Karte der Spielorte"/>
                </Centered>
            </TextContainer>
        </BaseContainer>
    );
}

export default About;