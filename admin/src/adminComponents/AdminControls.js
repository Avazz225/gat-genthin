import { ParallelContainer } from "../atoms/ContentContainers"
import { Heading, NavLink } from "../atoms/TextContainers"

function AdminControls(props){
    let role = localStorage.getItem("internal_role")
    return(
        <div className="adminControlWrapper">
            <Heading text={(role==="admin"||role==="owner")?"Administration":"Moderation"} type={1} topSpace={0} editable={false} />
            <ParallelContainer>
                <div className="centerHeight">
                    <label className="switch">
                        <input type="checkbox" checked={props.adminComponentsVisible} className="authCheckbox"/>
                        <span className="slider round" onClick={() => props.setAdminComponentVisibility(!props.adminComponentsVisible)}/>
                    </label>
                    Seitenelemente hinzufügen
                </div>
                <div className="adminSpacer"/>
                <div className="centerHeight">
                    <label className="switch">
                        <input type="checkbox" checked={props.deleteMode} className="authCheckbox"/>
                        <span className="slider round" onClick={() => props.setDeleteMode(!props.deleteMode)}/>
                    </label>
                    Elemente löschen
                </div>
                <div className="adminSpacer"/>
                <div className="centerHeight">
                    <label className="switch">
                        <input type="checkbox" checked={props.textEditor} className="authCheckbox"/>
                        <span className="slider round" onClick={() => props.setTextEditor(!props.textEditor)}/>
                    </label>
                    Texteditor
                </div>  
                {(role==="admin"||role==="owner")&& <ToUserMgmt/>}
            </ParallelContainer>
        </div>
    )
}

function ToUserMgmt(){
    return(
        <div>
            <NavLink id="users" text="Nutzerverwaltung" destination="#/users"/>
        </div>
    )
}

export default AdminControls