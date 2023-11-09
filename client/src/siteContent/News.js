import ImagePopUp from '../components/ImagePopUp';
import './css/News.css';

function News(){
    return(
        <div className='news-main'>
            <input type="checkbox" className="info-toggle"></input>
            <div className='information-icon-border'>
                <div className='i-container'>
                    <div>
                        <div className='i-dot'></div>
                        <div className='i-stroke'></div>
                        <div className='x-stroke1'></div>
                        <div className='x-stroke2'></div>
                    </div>
                </div>
            </div>
            <div className="NewsContainer">
                
                <div>
                    <ImagePopUp/>
                    <h1>Aktuelles</h1>
                    <div className="content-pane texttype">
                        <h3>Vorstellungen - Die drei Federn</h3>
                        <ul>
                            <li><b>26.11.2023 14:30 *</b><br/>Gasthof "Pflaumbaum" Kade</li>
                            <li><b>03.12.2023 15:00</b><br/>Tucheim</li>
                            <li><b>10.12.2023 14:30 *</b><br/>Lindenhof Genthin</li>
                            <li><b>16.12.2023 16:00</b><br/>Stadthalle Möckern</li>
                            <li><b>17.12.2023 15:00</b><br/>MGH "Die Stube" Kirchmöser</li>
                            <li><b>24.12.2023 14:30 *</b><br/>Grundschule L. Uhland Genthin</li>
                            <li><b>06.01.2024 14:30 *</b><br/>Grundschule L. Uhland Genthin</li>
                        </ul>
                        <br/><br/>
                        <b>* Kartenvorverkauf ab 15.11.2023</b><br/> Touristinformation Genthin
                    </div>
                    <br/>
                    <div className="content-pane texttype">
                        <h3>Gefördert durch:</h3>
                        <a href="https://engagiert-fuer-kultur.de" target="blank">
                        <img src={process.env.REACT_APP_CDN_URL+"02_Mikrokulturfonds_Projekt_gross.jpg"} className="imageAuto"/>
                        </a><br/><br/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;
