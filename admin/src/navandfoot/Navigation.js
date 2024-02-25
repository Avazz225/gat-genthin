import {HashRouter} from "react-router-dom";
import { NavLink } from "../atoms/TextContainers";

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
                        <NavLink id="home" text="Willkommen" destination={"#/"}/>
                        <br/>
                        <NavLink id="about" text="Über uns" destination={"#/about"}/>
                        <br/>
                        <NavLink id="repertoire" text="Repertoire" destination={"#/repertoire"}/>
                        <br/>
                        <NavLink id="gallery" text="Galerie" destination={"#/gallery"}/>
                        <br/>
                        <NavLink id="contact" text="Kontakt" destination={"#/contact"}/>
                    </HashRouter>
                </div>
            </div>
    );
}

export default Navigation;