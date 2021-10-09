import React, {Component} from 'react'
import {Redirect, Route} from "react-router-dom"

import {useAuthState} from './context.js'

export const ProtectedRoute = ({component: Component, ...rest}) => {

  const auth = useAuthState()
  return(
    <Route {...rest}
      render = {props =>
          auth.login ? <Component {...rest} {...props}/> :
          <Redirect to="/"/>
      }/>
  )
}

export const AuthRoute = ({component: Component, ...rest}) => {
  const auth = useAuthState()
  return(
    <Route {...rest}
      render = {props =>
          !auth.login ? <Component {...rest} {...props}/> :
          <Redirect to="/greeting"/>
      }
    />
  )
}

