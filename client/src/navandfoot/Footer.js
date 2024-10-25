import {HashRouter} from "react-router-dom"
import { Icon } from '@iconify/react'
import instagramIcon from '@iconify/icons-mdi/instagram'

function Footer(){
    return(
        <div className="footer">
            <div>
                <div className="center-foot">
                    <div className='foot-parallel'>
                        <div className="footer-column">
                        <HashRouter>
                            <a href={"/"} className="ref">
                                <div className="navItem inactive light" id="home">
                                    Willkommen
                                </div>
                            </a>
                            <a href="#/about" className="ref">
                                <div className="navItem inactive light">
                                    Über uns
                                </div>
                            </a>
                            <a href="#/repertoire" className="ref">
                                <div className="navItem inactive light">
                                    Repertoire
                                </div>
                            </a>
                            <a href="#/gallery" className="ref">
                                <div className="navItem inactive light">
                                    Galerie
                                </div>
                            </a>
                            <a href="#/contact" className="ref">
                                <div className="navItem inactive light">
                                    Kontakt
                                </div>
                            </a>
                            <a href="#/imprint" className="ref">
                                <div className="navItem inactive light">
                                    Impressum
                                </div>
                            </a>
                            {(process.env.REACT_APP_TEST_MODE === "t")&&
                                <a href="#/test" className="ref">
                                    <div className="navItem inactive light">
                                        Testinhalte
                                    </div>
                                </a>
                            }
                        </HashRouter>
                        </div>
                        <div className="verticalrow">
                            <div className="rowfill"/>
                        </div>
                        <div className="footer-column text">
                            gat bei Social Media <br/><br/>
                            <a href='https://www.instagram.com/genthiner.amateurtheater/' target='_blank' className='silentLink'><Icon icon={instagramIcon} width="24" inline={true}/> @ genthiner.amateurtheater</a>
                        </div>
                    </div>
                    Copyright @ genthiner amateurtheater e.V. 2022 | Designed by Jan Jeschinski
                </div>
            </div>
        </div>
    )
}

export default Footer