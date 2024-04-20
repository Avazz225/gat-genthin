import React from 'react';
import "./GoogleAdComponent.css"

export default class AdComponent extends React.Component {
    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render () {
        return (
            <ins className='adsbygoogle adComponent'
                data-ad-client='ca-pub-12121212'
                data-ad-slot='12121212'
                data-ad-format='auto' />
        );
    }
}