import { Centered, HorizontalRow, Normal } from '../atoms/Arrangement';
import { BaseContainer, ParallelContainer, TextContainer } from '../atoms/ContentContainers';
import { Heading, Link, NewLine, Text } from '../atoms/TextContainers';
import './css/Contact.css';

function Contact(){
    return(
        <BaseContainer>
            <Heading text="Kontakt"/>
            <TextContainer>
                <Text text="Wenn wir Ihr Interesse geweckt haben oder Sie einfach weitere Informationen benötigen, wenden Sie sich vertrauensvoll an die untenstehenden Kontaktpersonen."/>
            </TextContainer>
            <HorizontalRow blue={true}/>
            <NewLine/>
            <ParallelContainer>
                <TextContainer>
                    <Centered>
                        <Normal>
                            <Heading type={3} text="Künstlerischer Leiter" topSpace={-0.25} />
                            <Text text="Eckhard Neumann"/>
                            <NewLine/>
                            <Text text="Baumschulenweg 12"/>
                            <NewLine/>
                            <Text text="39307 Genthin"/>
                            <NewLine/>
                            <NewLine/>
                            <Text text="Tel. 03933/2065"/>
                        </Normal>
                    </Centered>
                </TextContainer>
                <TextContainer>
                    <Centered>
                        <Normal>
                            <Heading type={3} text="Organisation" topSpace={-0.25}/>
                            <Text text="Jürgen Wagner"/>
                            <NewLine/>
                            <Text text="Schillerstr. 7a"/>
                            <NewLine/>
                            <Text text="39307 Genthin"/>
                            <NewLine/>
                            <NewLine/>
                            <Text text="Tel. 03933/806922"/>
                            <NewLine/>
                            <Text text="E-Mail: "/>
                            <Link text="info@gat-genthin.de" destination="mailto:info@gat-genthin.de"/>
                        </Normal>
                    </Centered>
                </TextContainer>
            </ParallelContainer>
        </BaseContainer>
    );
}

export default Contact;