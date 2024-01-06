import React from 'react';
import { getTimespan } from '../helpers/tools';
import './css/gatvent.css'

function GatCalendar(){
    let order = [18, 9, 3, 16, 6, 22, 2, 12, 1, 4, 14, 20, 11, 10, 24, 19, 15, 5, 21, 7, 13, 8, 17, 23]
    let srcSet = [
        'maerchen/2018/15-2.jpg',
        'maerchen/2017/Lilie9.jpg',
        'maerchen/2016/web0.jpg',
        'maerchen/2015/Regen-4.jpg',
        'maerchen/2013/maerchen2013_DSC_0129.jpg'
    ]

    return(
        <div className='calWrapper'>
            <div className="calendarGrid" style={{backgroundImage: 'url('+process.env.REACT_APP_CDN_URL+srcSet[Math.floor(Math.random()*srcSet.length)]+')', backgroundSize: 'cover', backgroundPosition: '50%'}}>
                <CalendarDoor data={order}/>
            </div>
        </div>
    )

}

const CalendarDoor = ({data}) => ( 
    <>
    {data.map(data => (
        <div className='calendar-door-wrapper'>
            <CalendarDoorContent data={data} enabled={getTimespan([data,12,2023], [])} />
        </div>
    ))}
    </>
)

class CalendarDoorContent extends React.Component{
    constructor(props){
        super();
        this.state = {
            data: props.data,
            clicked: false,
            enabled: props.enabled
        }

        this.openDoor = this.openDoor.bind(this)
    }

    openDoor(){
        this.setState({
            clicked: true
        })

        setTimeout(() => {
            window.location.href = '/#/calendar?id='+this.state.data
        }, 2500);
    }

    render(){
        return(
            <div className={'calendar-door-sub-wrapper door' + this.state.data}>
                <div className={(this.state.clicked)?'calendar-door open':'calendar-door'} onClick={() => {if(this.state.enabled){this.openDoor()}}}>
                    {this.state.data}
                </div>
            </div>
        )
    }
}

export default GatCalendar