import React, { useState } from "react";
import { Heading, Text} from "../atoms/TextContainers";
import { BaseContainer, TextContainer } from "../atoms/ContentContainers";
import { getToken } from "./token";

import './UserMgmt.css'
import { Centered } from "../atoms/Arrangement";
import AddUser from "./AddUser";

class UserMgmt extends React.Component{
    constructor(){
        super();
        this.state = {
            user_data: []
        }

        this.orderBy = this.orderBy.bind(this)
        this.changeUserRole = this.changeUserRole.bind(this)
        this.removeUserRigths = this.removeUserRigths.bind(this)
        this.addUserToList = this.addUserToList.bind(this)
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_AUTH_API+'accounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': getToken(),
                'source':process.env.REACT_APP_SYSTEM_ID,
                "GetAllCurrent": true
            }
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .then((data) => {
                this.setState({
                    user_data: data['accounts']
                })       
            })
            .catch((error) => {
                if (error.message === '403' || error.message === "401") {
                    // No access rights
                    this.setState({
                        password_error: false,
                        email_error: false,
                        generalErrID: "err.noAccessRights"
                    })
                
                } else {
                    // Internal server error
                    this.setState({
                        password_error: false,
                        email_error: false,
                        generalErrID: "err.authserviceunavailable"
                    })
                }   
            });
    }

    addUserToList(elementToAdd){
        let existingList = this.state.user_data
        let found = false;

        for (let i = 0; i < existingList.length; i++) {
            if (existingList[i][0] === elementToAdd[0]) {
                existingList[i] = elementToAdd;
                found = true;
                break;
            }
        }
        if (!found) {
            existingList.push(elementToAdd);
        }

        this.setState({
            user_data: existingList,
        })
    }

    changeUserRole(value, userid){
        fetch(process.env.REACT_APP_AUTH_API+'permissions', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': getToken(),
                'source':process.env.REACT_APP_SYSTEM_ID,
            },
            body: JSON.stringify({
                'user_id': userid,
                'role': value
            })
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .catch((error) => {
                if (error.message === '403' || error.message === "401") {
                    // No access rights
                    this.setState({
                        password_error: false,
                        email_error: false,
                        generalErrID: "err.noAccessRights"
                    })
                
                } else {
                    // Internal server error
                    this.setState({
                        password_error: false,
                        email_error: false,
                        generalErrID: "err.authserviceunavailable"
                    })
                }   
            });
    }

    removeUserRigths(userid){
        fetch(process.env.REACT_APP_AUTH_API+'permissions', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': getToken(),
                'source':process.env.REACT_APP_SYSTEM_ID,
            },
            body: JSON.stringify({
                'user_id': userid
            })
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.status);
                }
            })
            .catch((error) => {
                if (error.message === '403' || error.message === "401") {
                    // No access rights
                    this.setState({
                        password_error: false,
                        email_error: false,
                        generalErrID: "err.noAccessRights"
                    })
                
                } else {
                    // Internal server error
                    this.setState({
                        password_error: false,
                        email_error: false,
                        generalErrID: "err.authserviceunavailable"
                    })
                }   
        });
        let list = [...this.state.user_data];

        list = list.filter(sublist => sublist[0] !== userid);

        this.setState({
            user_data: list
        });
}

    orderBy(index){
        let list = [...this.state.user_data];

        list.sort((a, b) => {
            if (a[index] < b[index]) {
                return -1;
            }
            if (a[index] > b[index]) {
                return 1;
            }
            return 0;
        });

        this.setState({
            user_data: list
        })
    }


    render(){
        let role = localStorage.getItem("internal_role")
        if (role !== 'admin' && role !=='owner'){
            window.location.href="/#"
        }
        return(
            <BaseContainer>
                <Heading text="Nutzerverwaltung" editable={false} />
                <Heading type={3} text="Hier können Zugänge zum administrativen Interface verwaltet werden." editable={false} />
                <Heading type={4} text="Es kann bis zu 5 Minuten dauern bis Änderungen wirksam sind." editable={false} />
                <Centered>
                    <TextContainer>
                        <table className="userMgmtTable">
                            <tr>
                                <th onClick={() => this.orderBy(1)}>Email</th>
                                <th onClick={() => this.orderBy(2)}>Rolle</th>
                                <th>Aktionen</th>
                            </tr>
                            <AddNewRow addUserToList={this.addUserToList} />
                            <UserMapper data={this.state.user_data} changeUserRole={this.changeUserRole} removeUserRigths={this.removeUserRigths} ownEmail={localStorage.getItem("own_email")}/>
                        </table>
                    </TextContainer>
                </Centered>
            </BaseContainer>
        )
    }
}

function AddNewRow(props){
    const [addUserActive, setactive] = useState(false)
    return(
        <>
        {(addUserActive)?
            <tr>
                <AddUser changeAddState={setactive} addUserToList={props.addUserToList} />
            </tr>
            :
            <tr onClick={() => setactive(!addUserActive)}>
                <td className="specialRow" colSpan={3}>
                    Neuen User hinzufügen
                </td>
            </tr>
        }
        
        </>
    )
}

const UserMapper = ({data, changeUserRole, removeUserRigths, ownEmail}) => (
    <>
    {data.map(data => (
        <tr key={data[0]} >
            <td className="regulartd">{data[1]} {(ownEmail==data[1]) && <span className="emphasized">(Dieser Account)</span>}</td>
            <td className="regulartd"><ChangeUserRole role={data[2]  } changeUserRole={changeUserRole} userid={data[0]} ownEmail={ownEmail} email={data[1]} /></td>
            <td className="flexWrapper regulartd">
                <DelUserAccess role={data[2]} userid={data[0]}  removeUserRigths={removeUserRigths} ownEmail={ownEmail} email={data[1]}/>
            </td>
        </tr>
    ))}
    </>
)

function ChangeUserRole({role, changeUserRole, userid, ownEmail, email}){
    const availableRoles = {"mod": "Moderator/in", "admin": "Administrator/in"}
    return(
        <>
        {(role === "owner")? 
            <>Seitenbesitzer/-in</>
            :
            <>
            <select name="roles" id="roles" onChange={(e) => changeUserRole(e.target.value, userid)} disabled={ownEmail === email} >
                {Object.keys(availableRoles).map(key => (
                    <option value={key} selected={key===role} disabled={ownEmail === email} >
                        {availableRoles[key]}
                    </option>
                ))}
                {availableRoles[role]}
            </select>
            </>
        }
        </>
    )
}

function DelUserAccess({role, userid, removeUserRigths, ownEmail, email}){
    const [delConfirm, changeDelConfirm] = useState(false)

    return(
        <>
        {(role!== "owner" && ownEmail !== email)&& 
            <div className="userMgmtDeleteComponentWrapper" style={{width: "100%"}}>
                {(delConfirm)?
                <>
                    User wirklich entfernen?
                    <div className="centered">
                        <div className="userMgmtBtn" onClick={() => removeUserRigths(userid)}>Ja</div>
                        <div className="userMgmtBtn class2" onClick={() => changeDelConfirm(!delConfirm)}>Nein</div>  
                    </div>
                </>
                :
                <div className="userMgmtBin">
                    <div onClick={() => changeDelConfirm(!delConfirm)} className="userMgmtBinBox"/>
                </div>
                }
                
            </div>
        }
        </>
    )
}

export default UserMgmt