import "./TimedConfigurator.css"

function TimedConfigurator({ index, startDisplay, endDisplay, changeProperty, children }){
    let start = startDisplay[2]+'-'+String(startDisplay[1]).padStart(2, '0')+'-'+String(startDisplay[0]).padStart(2, '0')
    let end = endDisplay[2]+'-'+String(endDisplay[1]).padStart(2, '0')+'-'+String(endDisplay[0]).padStart(2, '0')
    return(
        <div className="timedConfigurator">
            <div className="wrench">
                <div className="configurator">
                    <div className="centered">
                    <b>Zeitgesteuerten Container anpassen</b><br/><br/>
                    </div>
                    <div className="spreadItems">
                        Anzeigen ab:     
                        <input type="date" defaultValue={start} onChange={(e) => {changeProperty(transformValue(e.target.value), index, "startDisplay")}}/>
                    </div>
                    <div className="spreadItems">
                        Anzeigen bis einschl:
                        <input type="date" defaultValue={end} onChange={(e) => {changeProperty(transformValue(e.target.value), index, "endDisplay")}}/>
                    </div>
                </div>
            </div>
            { children }
        </div>
    )
}

function transformValue(val){
    return val.split('-').reverse().map(Number)
}

export default TimedConfigurator