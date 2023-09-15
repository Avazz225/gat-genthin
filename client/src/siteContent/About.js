import './css/About.css';

function About(){
    return(
        <div className="content">
            <h1>Über uns</h1>
            <div className='content-pane texttype'>
                <p>Im Herbst 1971 entschieden sich Mitglieder des Klubrates im Jugendklubhaus Genthin (heute Begegnungsstätte Lindenhof) zur Weihnachtszeit Theater zu spielen. 
                    Ein Zufall wollte es, dass die Aufführung einer kleinen Märchenrevue auf den Nachmittag des 24. Dezember fiel. 
                    Ein volles Haus ermunterte dazu, im Folgejahr ähnliches zu tun. Diese Tradition hat sich bis heute erhalten.
                    Aus der saisonal tätigen Laienspielgruppe wurde in den Jahren ein Amateurtheater, das sich ab 1977 "Märchentruhe Genthin" nannte. 
                    In den Folgejahren wuchs der Wunsch nach mehr Theater. Mit der ersten Schauspielinszenierung (1987 Regina b. - Ein Tag in ihrem Leben) 
                    die uns bis zum DDR-Leistungsvergleich nach Halle (Saale) führte, nannte sich das Ensemble "genthiner amateurtheater", in Kurzform also -gat-.</p>
            </div>
            <br></br>
            <div className='content-pane texttype'>
                <p>Das Domizil war das Kreiskulturhaus Volksgarten. Zuvor fusionierte -gat- mit dem Dramatischen Zirkel des Waschmittelwerkes, 
                    mit dem ohnehin schon enge personelle Verflechtung bestanden. Mit der Wende entschied sich -gat- dorthin zu gehen, 
                    wo die Zuschauer sind und begann sein Hans-Sachs-Projekt als Straßentheater. Das war ein Volltreffer, der sich vor allem als finanzieller Rettungsanker erwies.</p>
            </div>
            <br></br>
            <blockquote>Das genthiner amateurtheater e.V. (gat) feierte mit der Spielzeit 2020/21 sein 50-jähriges Bestehen.</blockquote>

            <hr className="blue"></hr>
            <h1>Spielorte</h1>
            <div className='content-pane center-elements'>
                <img src="images/spielorte.png" alt="Sparkasse Magdeburg" className='map'></img>
            </div>
        </div>
    );
}

export default About;