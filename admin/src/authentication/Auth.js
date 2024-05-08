import React from "react";
import { FormattedMessage } from "react-intl";
import './auth.css'

function ErrorMsg(props){
    return(
        <>
        {(props.id === "")?<></>:
            <span className="error">
                <FormattedMessage id={props.id}/>
            </span>
        }
        </>
    )
}


function BtnClass3(props){
    return(
        <button onClick={(e) => props.action(e)} name={props.name} className={(props.noUnderline)?"btn Class3 sec noUnderline":"btn Class3 sec"} disabled={(props.disabled)? true:false}>{props.text}</button>
    )
}


function HrefClass3(props){
    return(
        <a href={props.action} className={(props.noUnderline)?"href Class3 sec noUnderline":"href Class3 sec"}>{props.text}</a>
    )
}


class Auth extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            singInMode: true,
            email: "",
            password: "",
            password_confirmation: "",
            email_error: false,
            password_error: false,
            emailErrID: "",
            pwdErrID: "",
            generalErrID: "",
            permanent_login: false,
            apiProcess: false
        };

        this.toggleMode = this.toggleMode.bind(this)
        this.changeState = this.changeState.bind(this)
        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
        this.checkEmail = this.checkEmail.bind(this)
        this.checkPwd = this.checkPwd.bind(this)
        this.togglePermanentLogin = this.togglePermanentLogin.bind(this)
    }

    toggleMode(){
        this.setState({
            singInMode: !this.state.singInMode,
            password: "",
            password_confirmation: "",
            emailErrID: "",
            pwdErrID: "",
            generalErrID: "",
            apiProcess: false
        })
    }

    changeState(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    checkEmail(e){
        let result =  e.target.value.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        if (!result){
            this.setState({
                email_error: true,
                emailErrID: "err.nomail"
            })
        } else {
            this.setState({
                email_error: false,
                emailErrID: ""
            })
        }
    } 

    checkPwd(){
        let res = this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

        if (!res){
            this.setState({
                password_error: true,
                pwdErrID: "err.passwordtooweak"
            })
        } else {
            this.setState({
                password_error: false,
                pwdErrID: ""
            })
        

            if (this.state.password !== this.state.password_confirmation && this.state.password !== "" && this.state.password_confirmation !== ""){
                this.setState({
                    password_error: true,
                    pwdErrID: "err.passwordmismatch"
                })
            } else {
                this.setState({
                    password_error: false,
                    pwdErrID: ""
                })
            }
        }
    }

    async signIn(e){
        e.preventDefault();
        await this.setState({
            apiProcess: true
        })
        await fetch(process.env.REACT_APP_AUTH_API+'authentication_tokens/'+(this.state.permanent_login?'persistent_token':'timed_token'), {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'source':process.env.REACT_APP_SYSTEM_ID
        },
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
        })
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then((data) => {
            if (!data.restricted_check){
                throw new Error(406)
            }

            localStorage.setItem("internal_role", data.role)
            localStorage.setItem("own_email", this.state.email)
            
            window.location.href="/"
        })
        .catch((error) => {
            if (error.message === '401') {
                // Invalid Password
                this.setState({
                    password_error: true,
                    email_error: false,
                    pwdErrID: "err.pwdIncorrect",
                    emailErrID: "",
                })
            } else if (error.message === '404') {
                // E-Mail not found
                this.setState({
                    email_error: true,
                    pwdpassword_errorErr: false,
                    pwdErrID: "",
                    emailErrID: "err.emailNotFound"
                })
            } else if (error.message === '422') {
                // Token type not valid
                this.setState({
                    password_error: false,
                    email_error: false,
                    pwdErrID: "",
                    emailErrID: "",
                    generalErrID: "err.malformedrequest"
                })
            
            } else if (error.message === '406') {
                // No access rights
                this.setState({
                    password_error: false,
                    email_error: false,
                    pwdErrID: "",
                    emailErrID: "",
                    generalErrID: "err.noAccessRights"
                })
            
            } else {
                // Internal server error
                this.setState({
                    password_error: false,
                    email_error: false,
                    pwdErrID: "",
                    emailErrID: "",
                    generalErrID: "err.authserviceunavailable"
                })
            }   
        });
        this.setState({
            apiProcess: false
        })
    };

    async signUp(e){
        e.preventDefault();
        await this.setState({
            apiProcess: true
        })
        await fetch(process.env.REACT_APP_AUTH_API+'accounts', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'source':process.env.REACT_APP_SYSTEM_ID
            },
            body: JSON.stringify({
                "e_mail": this.state.email,
                "password": this.state.password
            })
            })
            .then((response) => {
                if (response.ok) {
                    return response
                } else {
                    throw new Error(response.status);
                }
            })
            .catch((error) => {
                if (error.message === '409') {
                    // Email already in use
                    this.setState({
                        emailErrID: "err.emailInUse"
                    })
                } else {
                    // Internal server error
                    this.setState({
                        generalErrID: "err.regserviceunavailable"
                    })
                }
            });
        this.setState({
            apiProcess: false
        })
    }

    togglePermanentLogin(){
        this.setState({
            permanent_login: !this.state.permanent_login
        })
    }

    render(){
        return(
            <div className="relPos authContent"> 
                <Overlay toggle={this.toggleMode} singInMode={this.state.singInMode} />
                <div className="flexWrapper">
                    <SignUp 
                        email={this.state.email} 
                        password={this.state.password} 
                        password_confirmation={this.state.password_confirmation} 
                        email_error={this.state.email_error}
                        password_error={this.state.password_error}
                        changeState={this.changeState}  
                        checkEmail={this.checkEmail}
                        checkPwd={this.checkPwd}
                        signUp={this.signUp}
                        emailErr={this.state.emailErrID}
                        pwdErr={this.state.pwdErrID}
                        generalErr={this.state.generalErrID}
                        apiProcess={this.state.apiProcess}
                    />
                    <LogIn 
                        email={this.state.email} 
                        password={this.state.password} 
                        changeState={this.changeState} 
                        signIn={this.signIn}
                        emailErr={this.state.emailErrID}
                        pwdErr={this.state.pwdErrID}
                        generalErr={this.state.generalErrID}
                        email_error={this.state.email_error}
                        password_error={this.state.password_error}
                        permanent_login={this.state.permanent_login}
                        togglePermanentLogin={this.togglePermanentLogin}
                        apiProcess={this.state.apiProcess}
                    />
                </div>
            </div>
        )
    }
}

function LogIn(props){
    return(
        <div className="halfWidth flexWrapper authcentered">
            <h0><FormattedMessage id="auth.logIn"/></h0>
            <h3><FormattedMessage id="auth.input.email"/></h3>
            <input className={(props.email_error)?"authInput error":"authInput"} type="text" placeholder="example@gat-genthin.de" value={props.email} name={'email'} onChange={(e) => props.changeState(e)} />
            <ErrorMsg id={props.emailErr} />
            <div className="authspacer"/>
            <h3><FormattedMessage id="auth.input.password"/></h3>
            <input className={(props.password_error)?"authInput error":"authInput"} type="password" placeholder="***" value={props.password} name={'password'} onChange={(e) => props.changeState(e)} />
            <ErrorMsg id={props.pwdErr} />
            <div className="authspacer"/>
            <span className="checkboxContainer">
                <input type="checkbox" checked={props.permanent_login} className="authCheckbox"/>
                <span className="authCheckmark" onClick={() => props.togglePermanentLogin()}/>
                <FormattedMessage id="auth.button.stayLoggedIn"/>
            </span>
            <div className="authspacer"/>
            <HrefClass3 text={<FormattedMessage id="auth.button.forgot"/>} action={"/changepwd"}/>
            <div className="authspacer"/>
            <button className={"authInput authBtn"} onClick={(e) => {if(!props.apiProcess){props.signIn(e)}}} disabled={ props.email === "" || props.password === ""} >
                {(!props.apiProcess)?<FormattedMessage id="auth.button.login"/>:<LoadingAnimation/>}
            </button>
            <ErrorMsg id={props.generalErr} />
        </div>
    )
}

function SignUp(props){
    return(
        <div className="halfWidth flexWrapper authcentered">
            <h0><FormattedMessage id="auth.signUp"/></h0>
            <h3><FormattedMessage id="auth.input.email"/></h3>
            <input className={(props.email_error)?"authInput error":"authInput"} type="text" placeholder="example@gat-genthin.de" value={props.email} name={'email'} onChange={(e) => props.changeState(e)} onBlur={(e) => props.checkEmail(e)} />
            <ErrorMsg id={props.emailErr} />
            <div className="authspacer"/>
            <h3><FormattedMessage id="auth.input.password"/></h3>
            <input className={(props.password_error)?"authInput error":"authInput"} type="password" placeholder="***" value={props.password} name={'password'} onChange={(e) => props.changeState(e)} onBlur={() => props.checkPwd()} />
            <div className="authspacer"/>
            <h3><FormattedMessage id="auth.input.passwordConfirm"/></h3>
            <input className={(props.password_error)?"authInput error":"authInput"} type="password" placeholder="***" value={props.password_confirmation} name={'password_confirmation'} onChange={(e) => props.changeState(e)} onBlur={() => props.checkPwd()} />
            <ErrorMsg id={props.pwdErr} />
            <div className="authspacer"/>
            <button className={"authInput authBtn"} onClick={(e) => {if(!props.apiProcess){props.signUp(e)}}} disabled={ props.email_error || props.password_error || props.password === "" || props.password_confirmation === "" || props.email === ""} >
                {(!props.apiProcess)?<FormattedMessage id="auth.button.signUp"/>:<LoadingAnimation/>}
            </button>
            <ErrorMsg id={props.generalErr} />
        </div>
    )
}


function LoadingAnimation(){
    return(
        <div className="relPos">
            <div className="loader"/>
        </div>
    )
}


function Overlay(props){
    return(
        <div className={(props.singInMode)?"absPos authOverlay":"absPos authOverlay right"}>
            <div className="flexWrapper heightCenter">
                <Left toggle={props.toggle} singInMode={props.singInMode} />
                <Right toggle={props.toggle} singInMode={props.singInMode} />
            </div>
        </div>
    )
}

function Left(props){
    return(
        <div className="flexWrapper column authcentered authOverlayCol1">
            <center>
                <h0><FormattedMessage id="auth.welcomeBack"/></h0>
            </center>
            <div className='authspacer'/><div className='authspacer'/><div className='authspacer'/><div className='authspacer'/>
            <center>
                <div className="flexWrapper column">
                    <h2 className="quarterWidth normalWeight"><FormattedMessage id="auth.skalarLightInfo"/></h2>
                    <div className="authspacer"/>
                    <FormattedMessage id="auth.notRegisteredYet"/>
                    <BtnClass3 text={<FormattedMessage id="auth.switchToRegister"/>} action={props.toggle} disabled={!props.singInMode} />
                </div>
            </center>
        </div>
    )
}

function Right(props){
    return(
        <div className="flexWrapper column authcentered authOverlayCol2">
            <center>
                <h0><FormattedMessage id="auth.welcomeTo"/></h0>
            </center>
            <div className='authspacer'/><div className='authspacer'/><div className='authspacer'/><div className='authspacer'/>
            <center>
                <div className="flexWrapper column">
                    <h2 className="quarterWidth normalWeight"><FormattedMessage id="auth.skalarLightInfo2"/></h2>
                    <div className="authspacer"/>
                    <FormattedMessage id="auth.alreadyRegistered"/>
                    <BtnClass3 text={<FormattedMessage id="auth.LogIn"/>} action={props.toggle} disabled={props.singInMode} />
                </div>
            </center>
        </div>
    )
}

export default Auth