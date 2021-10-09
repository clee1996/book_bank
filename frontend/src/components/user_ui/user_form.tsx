import React, {useState} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {loginUser, useAuthState, useAuthDispatch} from '../context/index.js'
import './user_form.css'


interface stateType {
  formType: string
  }

interface Data {
  username: string;
  password: string;
}


const UserSession = (props: any) => {


const location = useLocation()
const state = location.state as stateType
const {formType} = state;
const dispatch = useAuthDispatch()
const history = useHistory()
const [errr, displayErr] = useState<boolean>(false)
const [msg, setMsg] = useState<string>("")


const {loading, errorMesage} = useAuthState()

const submit = async (data: Data) => {

      try {
      let res =  await loginUser(dispatch, data)
      if (!res.user) {
        displayErr(true)
        setMsg(res.msg)
        return
      }
     //history.push('/greeting')
      } catch (error) {
      }
}


  const handleSubmit = (event: any) => {
    event.preventDefault();
    let data: Data = {
      username: event.target.username.value,
      password: event.target.password.value
    }


    submit(data)
  }

  const registerSubmit = (event: any) => {
    event.preventDefault()
    let data: Data = {
      username: event.target.username.value,
      password: event.target.username.value
    }

    const register = async () => {
    let url = "http://localhost:5000/api/register"
    let res = await fetch(url, {method: "POST", body: JSON.stringify(data)})
    let jsonObj = await res.json()
    if (jsonObj.msg) {
      displayErr(true)
      setMsg(jsonObj.msg)
    }
    else {
      submit(data)
    setMsg("Success!")
    }

    }

    register()


  }



  //const location = useLocation()
  //const state = location.state as stateType
  //const {formType} = state;

  if (formType === 'login') {
  return(
    <div>
      <h1 className="heading-user">Welcome to the Book Bank</h1>
      <form className="form-for-user" onSubmit={handleSubmit}>
        <label>Username:</label><input className="user-input"type="text" name="username"></input>
        <label>Password:</label><input className="user-input"type="password" name="password"></input>
        <button className="button-user" type="submit">Login</button>
      {errr ? <div>{msg}</div> : null}
      </form>
    </div>
  )
  }
  else if (formType === 'signup') {
    return(
      <div>
        <h1 className="heading-user">Welcome to the Book Bank</h1>
        <form className= "form-for-user"onSubmit={registerSubmit}>
          <label>Username:</label><input className="user-input" type="text" name="username"/>
          <label>Password:</label><input className="user-input"type="password" name="password"/>
          <button className="button-user" type="submit" >Signup</button>
        </form>
        {errr ? <div>{msg}</div> : null}
      </div>
    )
  }
}

export default UserSession
