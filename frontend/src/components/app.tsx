import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import Greeting from './greeting/greeting'
import Books from './book_list/books'
import Form from './post_book/form_book_page'
import UserSession from './user_ui/user_form'
import Homepage from './homepage/homepage'
import EditForm from './edit_book/editbook'
import {AuthProvider} from './context/index.js'
import {ProtectedRoute, AuthRoute} from './context/routes_util.js'

const App = () => {
  return(
    <div>
      <AuthProvider>
      <Router>
        <AuthRoute exact path="/" component={Homepage}/>
        <ProtectedRoute exact path="/books" component={Books}/>
        <ProtectedRoute exact path="/formforbooks" component={Form}/>
        <ProtectedRoute exact path="/editformforbooks" component={EditForm}/>
        <AuthRoute exact path="/entry" component={UserSession}/>
        <ProtectedRoute exact path="/greeting" component={Greeting}/>
      </Router>
      </AuthProvider>
    </div>
  )
}

export default App
