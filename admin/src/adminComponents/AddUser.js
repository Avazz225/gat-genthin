import React from "react";
import { Icon } from "@iconify/react";

class AddUser extends React.Component{
    constructor(){
        super();
        this.state = {
            available_user_data: [],
            selected_user_id: -1,
            selected_user_email: "",
            selected_role: "",
            searchStr: '',
        }

        this.searchUsers = this.searchUsers.bind(this)
        this.setValue = this.setValue.bind(this)
        this.addUser = this.addUser.bind(this)
    }

    setValue(value, key){
        this.setState({
            [key]: value
        })
    }

    searchUsers(){
        if (this.state.searchStr.length < 5){
            return
        }

        fetch(process.env.REACT_APP_AUTH_API+'accounts', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'source':process.env.REACT_APP_SYSTEM_ID,
                'SearchByEmail': true,
                'searchStr': this.state.searchStr
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
                    available_user_data: data.accounts
                });
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

    addUser(){
        fetch(process.env.REACT_APP_AUTH_API+'permissions', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'source':process.env.REACT_APP_SYSTEM_ID
            }, 
            body: JSON.stringify({
                'user_id': this.state.selected_user_id,
                'role': this.state.selected_role
            })
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log(response)
                    throw new Error(response.status);
                }
            })
            .then((data) => {
                let newObject = [this.state.selected_user_id, this.state.selected_user_email, this.state.selected_role]
                this.props.addUserToList(newObject)
                this.props.changeAddState(false)
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
            })
    }


    render(){
        return(
            <>
                <td className="specialRow left">
                    <UserSearch searchStr={this.state.searchStr} setValue={this.setValue} searchUsers={this.searchUsers} available_user_data={this.state.available_user_data} />
                </td>
                <td className="specialRow middle">
                    {(this.state.selected_user_id === -1)?
                    <div className="centered">
                        Wähle zuerst einen User aus
                    </div>
                    :
                    <RolePicker setValue={this.setValue}/>
                    }
                </td>
                <td className="specialRow right">
                    <div className="centered">
                        {(this.state.selected_user_id !== -1 && this.state.selected_role !== "")&& <div className="userMgmtBtn" onClick={() => this.addUser()}>Hinzufügen</div>}
                        <div className="userMgmtBtn class2" onClick={() => this.props.changeAddState(false)}>Abbrechen</div>
                    </div>
                </td>
            </>
        )
    }
}

function UserSearch(props){

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.searchUsers()
            props.setValue(-1, 'selected_user_id')
            props.setValue("", "selected_role")
        }
    }

    return(
        <div className="relPos">
            <span className="centered searchBar">
                <input type="text" className="searchInput" value={props.searchStr} onChange={(e) => props.setValue(e.target.value, 'searchStr')} onKeyDown={handleKeyDown} />
                <Icon icon="mdi:account-search" className="searchIcon" onClick={() => props.searchUsers()}/>
                <div className="accountDisplay">
                    {props.available_user_data.map(user => (
                        <div key={user[0]} onClick={() => {props.setValue(user[1], 'searchStr'); props.setValue(user[0], 'selected_user_id'); props.setValue(user[1], 'selected_user_email')}}>
                            {user[1]}
                        </div>
                    ))}
                </div>
            </span>
            
        </div>
    )
}

function RolePicker(props){
    const availableRoles = {"admin": "Administrator/in", "mod": "Moderator/in"}
    return(
        <select name="roles" id="roles" onChange={(e) => props.setValue(e.target.value, 'selected_role')}>
            <option value="" selected disabled hidden>Rolle auswählen</option>
            {Object.keys(availableRoles).map(key => (
                <option value={key} >
                    {availableRoles[key]}
                </option>
            ))}
        </select>
    )
}

export default AddUser