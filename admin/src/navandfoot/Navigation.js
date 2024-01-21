import {HashRouter, Link} from "react-router-dom";

function Navigation(){
    return(
        <div className="ham-container">
                <a href='' className="checkbox" onClick={(e) => e.preventDefault()}></a>
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
                    </Link><br/>
                    <Link to="about" onClick="window.location.reload();" className="ref">
                        <div className="navItem inactive">
                            Über uns
                        </div>
                    </Link><br/>
                    <Link to="repertoire" onClick="window.location.reload();" className="ref">
                        <div className="navItem inactive">
                            Repertoire
                        </div>
                    </Link><br/>
                    <Link to="gallery" onClick="window.location.reload();" className="ref">
                        <div className="navItem inactive">
                            Galerie
                        </div>
                    </Link><br/>
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