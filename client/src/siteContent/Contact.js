import './css/Contact.css';

function Contact(){
    return(
        <div className="content">
            <h1>Kontakt</h1>
            <div className='content-pane texttype'>
            <p>Wenn wir Ihr Interesse geweckt haben oder Sie einfach weitere Informationen benötigen, wenden Sie sich vertrauensvoll an die untenstehenden Kontaktpersonen.</p>
            </div>

            <hr className="blue"></hr>
            <div className='nextto'>
                <div className='element-wrapper'> 
                    <h3>Künstlerischer Leiter</h3>
                    <div className='content-pane texttype'>
                        <p>
                        Eckhard Neumann<br></br>
                        Baumschulenweg 12<br></br>
                        39307 Genthin<br></br><br></br>

                        Tel. 03933/2065<br></br>
                        </p>
                    </div>
                </div>
                <div className='element-wrapper'>
                    <h3>Organisation</h3>
                    <div className='content-pane texttype'>
                        <p>
                        Jürgen Wagner<br></br>
                        Schillerstr. 7a<br></br>
                        39307 Genthin<br></br><br></br>

                        Tel. 03933/806922<br></br>
                        E-Mail: <a href="mailto:info@gat-genthin.de">info@gat-genthin.de</a>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Contact;