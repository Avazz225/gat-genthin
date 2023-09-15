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
                        <h3>Gefördert durch:</h3>
                        <a href="https://engagiert-fuer-kultur.de" target="blank">
                        <img src="./images/02_Mikrokulturfonds_Projekt_gross.jpg" className="imageAuto"/>
                        </a><br/><br/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;