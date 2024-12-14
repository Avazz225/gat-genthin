import {HashRouter, Link} from "react-router-dom";
import { Icon } from '@iconify/react';
import instagramIcon from '@iconify/icons-mdi/instagram';

function Footer(){
    return(
        <div className="footer">
            <div>
                <div className="center-foot">
                    <div className='foot-parallel'>
                        <div className="footer-column">
                        <HashRouter>
                            <Link to={"/"} className="ref">
                                <div className="navItem inactive light" onClick="window.location.reload();" id="home">
                                    Willkommen
                                </div>
                            </Link>
                            <Link to="about" onClick="window.location.reload();" className="ref">
                                <div className="navItem inactive light">
                                    Über uns
                                </div>
                            </Link>
                            <Link to="repertoire" onClick="window.location.reload();" className="ref">
                                <div className="navItem inactive light">
                                    Repertoire
                                </div>
                            </Link>
                            <Link to="gallery" onClick="window.location.reload();" className="ref">
                                <div className="navItem inactive light">
                                    Galerie
                                </div>
                            </Link>
                            <Link to="contact" onClick="window.location.reload();" className="ref">
                                <div className="navItem inactive light">
                                    Kontakt
                                </div>
                            </Link>
                            <Link to="imprint" onClick="window.location.reload();" className="ref">
                                <div className="navItem inactive light">
                                    Impressum
                                </div>
                            </Link>
                        </HashRouter>
                        </div>
                        <div className="verticalrow">
                            <div className="rowfill"/>
                        </div>
                        <div className="footer-column text">
                            gat bei Social Media <br/><br/>
                            <a href='https://www.instagram.com/genthiner.amateurtheater/' target='_blnak' className='silentLink'><Icon icon={instagramIcon} width="24" inline={true}/> @ genthiner.amateurtheater</a>
                        </div>
                    </div>
                    Copyright @ genthiner amateurtheater e.V. 2022 | Designed by Jan Jeschinski
                </div>
            </div>
        </div>
    );
}

export default Footer;