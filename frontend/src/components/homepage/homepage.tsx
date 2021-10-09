import React from 'react'
import {Link} from 'react-router-dom'
import './homepage.css'

const Homepage = (props: any) => {

  return (
    <div>
    <h1 className="homepage-header">Book Your Way to Perfection Today</h1>
      <img className="gif-image"src="https://media.giphy.com/media/1TgECF0mNVirC/giphy.gif?cid=ecf05e47sphmhilb66b418f597yfo9nyrruo8924e1nfmrng&rid=giphy.gif&ct=g"alt="imagee"/>
      <div className="homepage-links">
      <Link to={{pathname: "/entry", state: {formType: "login"}}}><div className="homepage-login">Login</div></Link>
      <Link to={{pathname: "/entry", state: {formType: "signup"}}}><div className="homepage-signup">Signup</div></Link>
      </div>
    </div>
  )
}


export default Homepage
