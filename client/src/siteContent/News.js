import ImagePopUp from '../components/ImagePopUp';
import React from 'react';
import PageMapper from '../helpers/pageMapper';
import { jsonReader } from '../helpers/tools';
import { TextContainer } from '../atoms/ContentContainers';
import { Heading } from '../atoms/TextContainers';
import { Image } from '../atoms/Image';

class News extends React.Component{
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    async componentDidMount(){
        jsonReader("page_news.json")
        .then(result => this.setState({
            data: result
        })
        )
    }

    render(){
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
                        <PageMapper data={this.state.data}/>
                        <TextContainer>
                            <Heading type={3} text="Gefördert durch:" />
                            <a href="https://engagiert-fuer-kultur.de" target="blank">
                                <Image src={process.env.REACT_APP_CDN_URL+"02_Mikrokulturfonds_Projekt_gross.jpg"} width={100}/>
                            </a>
                        </TextContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default News;
