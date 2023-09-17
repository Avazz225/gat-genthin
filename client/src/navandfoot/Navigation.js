import './Navigation.css';
import {HashRouter, Link} from "react-router-dom";

function Navigation(){
    return(
        <div className="ham-container">
                <input type="checkbox" className="checkbox"></input>
                <div className="hamburger-lines">
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>
                <div className="logoBox">
                    <img src={process.env.REACT_APP_CDN_URL+"gat-blue3.png"} alt="GAT Logo" className="logo"></img>
                </div>
                <div className="spacer"></div>
                <div className="navContainer">
                    <HashRouter>
                    <Link to={"/"} className="ref">
                        <div className="navItem inactive" onClick="window.location.reload();" id="home">
                            Willkommen
                        </div>
                    </Link>
                    <Link to="about" onClick="window.location.reload();" className="ref">
                        <div className="navItem inactive">
                            Über uns
                        </div>
                    </Link>
                    <Link to="repertoire" onClick="window.location.reload();" className="ref">
                        <div className="navItem inactive">
                            Repertoire
                        </div>
                    </Link>
                    <Link to="gallery" onClick="window.location.reload();" className="ref">
                        <div className="navItem inactive">
                            Galerie
                        </div>
                    </Link>
                    <Link to="contact" onClick="window.location.reload();" className="ref">
                        <div className="navItem inactive">
                            Kontakt
                        </div>
                    </Link>
                    </HashRouter>
                </div>
            </div>
    );
}

export default Navigation;