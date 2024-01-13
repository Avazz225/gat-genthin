import { HorizontalRow } from '../atoms/Arrangement';
import { BaseContainer, ParallelContainer, TextContainer } from '../atoms/ContentContainers';
import { ListElement } from '../atoms/List';
import { Heading, NewLine, Text } from '../atoms/TextContainers';
import './css/Repertoire.css';

function Repertoire(){
    return(
        <BaseContainer>
            <Heading text="Großes Bühnenmärchen"/>
            <TextContainer>
                <ListElement>
                    <Text text="Ende November bis 6. Januar"/>
                </ListElement>
                <ListElement>
                    <Text text="jeweils Samstag und Sonntag"/>
                </ListElement>
                <ListElement>
                    <Text text="ca. 60 - 70 Minuten"/>
                </ListElement>
            </TextContainer>
            <HorizontalRow blue={true} />
            <Heading text="Musikalisch-literarische Programme"/>
            <ParallelContainer>
                <TextContainer>
                    <Heading type={4} text="Ri - Ra - Ringelnatz"/>
                    <Text text="Eine biografische Querbeetlesung über Leben und Werk von Joachim Ringelnatz (1883 - 1934)"/>
                    <NewLine/>
                    <ListElement>
                        <Text text="5 Mitwirkende"/>
                    </ListElement>
                    <ListElement>
                        <Text text="55 Min."/>
                    </ListElement>
                </TextContainer>
                <TextContainer>
                    <Heading type={4} text="Wer liebt, lacht doch"/>
                    <Text text="Heiteres für Liebende und Verliebte"/>
                    <NewLine/>
                    <ListElement>
                        <Text text="15 Mitwirkende"/>
                    </ListElement>
                    <ListElement>
                        <Text text="90 Min."/>
                    </ListElement>
                </TextContainer>
                <TextContainer>
                    <Heading type={4} text="Da kann es keinen Zweifel geben!"/>
                    <Text text="Ein Heinz-Erhardt-Abend"/>
                    <NewLine/>
                    <ListElement>
                        <Text text="9 Mitwirkende"/>
                    </ListElement>
                    <ListElement>
                        <Text text="2 Std. (inkl. Pause)"/>
                    </ListElement>
                </TextContainer>
                <TextContainer>
                    <Heading type={4} text="Für diese Programme gilt..."/>
                    <ListElement>
                        <Text text="Räume mit max. 120 Plätzen"/>
                    </ListElement>
                    <ListElement>
                        <Text text="Gastronomie vor, nach u. in der Pause des Programms ausdrücklich erwünscht (Ringelnatz ohne Pause)"/>
                    </ListElement>
                    <ListElement>
                        <Text text="Podest 4x3m (kann auch von gat gestellt werden)"/>
                    </ListElement>
                    <ListElement>
                        <Text text="Stromanschluss 2x16A oder auch Kraft"/>
                    </ListElement>
                    <ListElement>
                        <Text text="Nebenraum für die Mitwirkenden"/>
                    </ListElement>
                </TextContainer>
            </ParallelContainer>
            <HorizontalRow blue={true}/>
            <Heading text="Straßentheater"/>
            <TextContainer>
                <Text text="mit Fastnachtsspielen von Hans Sachs"/>
            </TextContainer>
        </BaseContainer>
    );
}

export default Repertoire;