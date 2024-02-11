import { Heading } from "../atoms/TextContainers"

function AdminControls(props){
    let role = localStorage.getItem("internal_role")
    return(
        <div className="adminControlWrapper">
            <Heading text={(role==="admin"||role==="owner")?"Administration":"Moderation"} type={1} topSpace={0} />
            <div className="centerHeight">
                <label class="switch">
                    <input type="checkbox" checked={props.adminComponentsVisible} className="authCheckbox"/>
                    <span className="slider round" onClick={() => props.setAdminComponentVisibility(!props.adminComponentsVisible)}/>
                </label>
                Seitenelemente hinzufügen
            </div>
        </div>
    )
}

export default AdminControls