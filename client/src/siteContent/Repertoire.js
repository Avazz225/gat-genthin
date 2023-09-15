import './css/Repertoire.css';

function Repertoire(){
    return(
        <div className="content">
            
            <h1>Großes Bühnenmärchen</h1>

            <div className='content-pane texttype '>
                <p>
                    <li>Ende November bis 6. Januar</li>
                    <li>jeweils Samstag und Sonntag</li>
                    <li>ca. 60 - 70 Minuten</li>
                </p>
            </div>
            <br></br>
            <hr className="blue"></hr>
            <h1>Musikalisch-literarische Programme</h1>

            <div className='nextto'>
                <div className='element-wrapper'>
                    <div className='content-pane texttype'>
                        <p>
                            <h4>Ri - Ra - Ringelnatz</h4>
                            Eine biografische Querbeetlesung über Leben und Werk von Joachim Ringelnatz (1883 - 1934) <br></br>

                            <li>5 Mitwirkende</li>
                            <li>55 Min.</li>
                        </p>
                    </div>
                </div>
                <div className='element-wrapper'>
                    <div className='content-pane texttype'>
                        <p>
                            <h4>Wer liebt, lacht doch</h4>
                            Heiteres für Liebende und Verliebte <br></br>
                            
                            <li>15 Mitwirkende</li>
                            <li>90 Min.</li>
                            
                        </p>
                    </div>
                </div>
                <div className='element-wrapper'>
                    <div className='content-pane texttype'>
                        <p>
                            <h4>Da kann es keinen Zweifel geben!</h4>
                            Ein Heinz-Erhardt-Abend<br></br>
                            
                            <li>9 Mitwirkende</li>
                            <li>2 Std. (inkl. Pause)</li>
                            
                        </p>
                    </div>
                </div>
                <div className='element-wrapper'>
                    <div className='content-pane texttype'>
                        <p>
                            <h4>Für diese Programme gilt...</h4>
                            <li>Räume mit max. 120 Plätzen</li>
                            <li>Gastronomie vor, nach u. in der Pause des Programms ausdrücklich erwünscht (Ringelnatz ohne Pause)</li>
                            <li>Podest 4x3m (kann auch von gat gestellt werden)</li>
                            <li>Stromanschluss 2x16A oder auch Kraft</li>
                            <li>Nebenraum für die Mitwirkenden</li>
                        </p>
                    </div>
                </div>
            </div>
            
            <hr className="blue"></hr>
            <h1>Straßentheater</h1>
            <div className='content-pane texttype'>
                <p>
                mit Fastnachtsspielen von Hans Sachs
                </p>
            </div>

        </div>
    );
}

export default Repertoire;