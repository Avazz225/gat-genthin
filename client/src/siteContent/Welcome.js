import React from 'react';
import { getTimespan } from '../helpers/tools';
import './css/Welcome.css';
import './css/gatvent.css'
import GatCalendar from './CalenderDoors';
import { BaseContainer, TextContainer, TimedContainer } from '../atoms/ContentContainers';
import { Heading, Link, NewLine, Text } from '../atoms/TextContainers';
import { Centered, Normal } from '../atoms/Arrangement';
import { ListElement, UnorderedList } from '../atoms/List';
import { ImageInText } from '../atoms/Image';

function Welcome(){
    let startDisplay = [28,11,2023]
    let endDisplay = [6,1,2024]

    return(
        <BaseContainer>
            <Heading text="Herzlich Willkommen"/>
            <TextContainer>
                <Text 
                    text="Herzlich Willkommen auf der Seite des gat - genthiner amateurtheater e.V.! 
                    Wir laden Sie ein, sich bei uns etwas umzuschauen: Erfahren Sie etwas über uns und unsere Geschichte oder werfen Sie einen Blick in unsere Galerie."/>
            </TextContainer>

            <TimedContainer startDisplay={startDisplay} endDisplay={endDisplay}>
                <Heading text="gatventskalender 2023"/>
                <TextContainer>
                    <Text
                        text="Herzlich willkommen zum digitalen Adventskalender vom genthiner amateurtheater! 
                        Dieses Jahr nehmen wir Sie mit auf eine zauberhafte Reise durch die Märchen der Vergangenheit, 
                        die unser Theaterverein im Laufe der Jahre zum Leben erweckt hat. 
                        Öffnen Sie jeden Tag ein Türchen und lassen Sie sich von den Bildern vergangener Aufführungen verzaubern."/>
                    
                    <Heading text="Jeden Sonntag: Märchenstunde" type={2} />
                    <Text
                        text="Gönnen Sie sich an jedem Sonntag eine Auszeit mit unseren Märchenstunden. gat liest ein herzerwärmendes Märchen vor, 
                        um Ihnen eine gemütliche und märchenhafte Adventszeit zu bescheren."/>
                    <NewLine/>
                    <Text
                        text="Wir hoffen, dass Sie diese Reise durch die vergangenen Märchen ebenso genießen werden wie wir."/>
                    <NewLine/>
                    <NewLine/>
                    <Text
                        text="gat wünscht eine märchenhafte Adventszeit!"/>
                    
                </TextContainer>
                <GatCalendar/>
            </TimedContainer>

            <Heading text="Weihnachtsmärchen 2023"/>
            <TextContainer>
                <Heading text="Die drei Federn" type={2} />
                <Text text="Walburga Raeder, nach einem Märchen der Brüder Grimm"/>
                <NewLine/>
                <NewLine/>
                <ImageInText src={process.env.REACT_APP_CDN_URL+"PlakatFedern.jpg"} align='right'/>
                <Text text='Wer kennt sie nicht die Vorlauten, die Vorwitzigen, die immer denken, dass sie mit Schummeln und ohne großes 
                Zutun ganz vorn sein werden. Immer gab und immer gibt es sie. So auch in unserem Märchen "Die drei Federn". 
                Der Dummling aber wird siegen und seine beiden großmäuligen Brüder werden ihrer gerechten Strafe zugeführt, 
                die allerdings in dieser Fassung etwas glimpflicher ausfällt, den beiden Vorwitzigen nach der Läuterung sogar 
                noch eine Chance verspricht. Wir jagen sie also nicht davon, sondern erkennen die Grauzonen, die es im 
                zwischenmenschlichen Bereich öfter gibt als schwarz-weiß.'/>
                <NewLine/>
                <NewLine/>
                <Centered>
                    <Normal>
                        <Text text="Termine Märchen:"/>
                        <UnorderedList>
                            <ListElement>
                                <Text text="26.11.2023	14:30 Uhr"/> 
                                <NewLine/> 
                                <Text text="Premiere Gasthof „Pflaumbaum“, Kade"/>
                            </ListElement>
                            <ListElement>
                                <Text text="03.12.2023	15:00 Uhr"/> 
                                <NewLine/> 
                                <Text text="Tucheim, Gaststätte „Zum Fiener“"/>
                            </ListElement>
                            <ListElement>
                                <Text text="10.12.2023	14:30 Uhr"/> 
                                <NewLine/> 
                                <Text text="Lindenhof Genthin"/>
                            </ListElement>
                            <ListElement>
                                <Text text="16.12.2023	16:00 Uhr"/> 
                                <NewLine/> 
                                <Text text="Stadthalle Möckern"/>
                            </ListElement>
                            <ListElement>
                                <Text text="17.12.2023	15:00 Uhr"/> 
                                <NewLine/> 
                                <Text text="MGH „Die Stube“ Kirchmöser"/>
                            </ListElement>
                            <ListElement>
                                <Text text="24.12.2023	14:30 Uhr"/> 
                                <NewLine/> 
                                <Text text="Grundschule L. Uhland, Genthin"/>
                            </ListElement>
                            <ListElement>
                                <Text text="06.01.2024	14:30 Uhr"/> 
                                <NewLine/> 
                                <Text text="Grundschule L. Uhland, Genthin"/>
                            </ListElement>
                        </UnorderedList>
                    </Normal>
                </Centered>
                <Text text="Für die Vorstellungen in Kade und Genthin (26.11.; 10.12.; 24.12. und 06.01.24)
                beginnt der Kartenvorverkauf am"/> 
                <Text text="15.11.2023 " bold={true} /> 
                <Text text="bei der "/> 
                <Link text="Touristinformation Genthin." destination="http://www.touristinfo-genthin.de/" bold={true} />
            </TextContainer>
        </BaseContainer>
    );
}


/*
<hr className='blue'/>
            <div className='content-pane texttype'>
                <h1>Wie geht Theater?</h1>
                <h2>gat bietet Schnupperkurs</h2>
                <p>Damit sich Mädchen und Jungen mal wieder unverbindlich ausprobieren können, wie es denn so mit dem Theaterspielen geht, bietet das genthiner amateurtheater e.V. (gat) wieder einmal einen Schnupper-Casting-Termin an. 
                Dabei handelt es sich nicht um einen Eignungstest, sondern um einen Einblick in die verschiedenen Bereiche einer Schauspielerausbildung. Beim Mitmachen kann jeder für sich selbst feststellen, ob das Spaß macht und ob damit die Lust geweckt wird, das Schauspielern zum Hobby zu machen.</p>
                <p>Die Veranstaltung findet <b>am Samstag, dem 10. Juni 2023, um 10:00 Uhr</b> im Probenstudio von gat, <b>Dattelner Straße 12 (Hinterhaus), 39307 Genthin</b> statt und wird maximal <b>150 Minuten</b> dauern. Der Kurs ist <b>kostenfrei</b>. 
                Aufgerufen sind Mädchen und Jungen im Alter von 10 bis 14 Jahren. Wir freuen uns aber auch über Interessenten, die älter sind.</p>
                <p>Die Teilnahme ist zahlenmäßig begrenzt. Deshalb ist eine <b>Anmeldung unbedingt erforderlich</b>. Schreiben sie uns eine Mail an <a href="mailto:info@gat-genthin.de">info@gat-genthin.de</a> oder melden sie sich per Telefon (03933 806922) an.</p>



            </div>
*/

export default Welcome;
