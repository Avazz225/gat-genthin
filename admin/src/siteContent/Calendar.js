import React from "react";
import { useSearchParams } from "react-router-dom";
import { getTimespan, jsonReader } from "../helpers/tools";
import CalendarItem from "./CalendarItem";

function Calendar(){
    const [searchParams, setSearchParams] = useSearchParams();
    return(
        <div className="content">
            <Cal param={searchParams.get("id")} />            
        </div>
        
    )
}

class Cal extends React.Component{
    constructor(){
        super();
        this.state = {
            dateData: {}
        }
    }

    async componentDidMount(){
        await jsonReader("dates.json")
        .then(result => this.setState({
            dateData: result[this.props.param]
        })
        )
    }

    render(){
        if (this.state.dateData.timespan){
            if (getTimespan(this.state.dateData.timespan.from,this.state.dateData.timespan.to)){
                return(
                    <CalendarItem content={this.state.dateData.content} id={this.props.param} />
                )
            } else {
                return(
                    <NotAvailable/>
                )
            }
        }
        
    }
}

function NotAvailable(){
    return(
        <div className="content">
            <div className="centered">
                <center>
                    <h1>Der angeforderte Inhalt ist noch nicht verfügbar</h1>
                    <h2>Bitte komm später wieder</h2>
                </center>
            </div>
        </div>
    )
}

export default Calendar