import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './form_book.css'
import {useAuthState} from '../context/index.js'
import {cookieValue} from '../context/helperfuncs.js'

const Form = () => {

  const [showPostStatus, updatePostStatus] = useState<boolean>(false)
  const user = useAuthState()


  const handleSubmit = (event: any) => {


    event.preventDefault();
    let url = 'http://localhost:5000/api/bookspost'
    let data = {author: event.target.author.value,
      title: event.target.title.value,
    synopsis: event.target.synopsis.value,
    person_id: user.userDetails.id
    }


    fetch(url,
    {method: 'POST',
    body: JSON.stringify(data),
    headers: {'X-CSRF-TOKEN': cookieValue()},
    credentials: 'include'
    }
         ).then(res => {
           updatePostStatus(true)
         })
  }




  return (
    <div>
      <h1 className="post-header">Put Your Favorite Books in Our Database!</h1>
      <Link to ="/greeting"><button>Back</button></Link>
      <form onSubmit={handleSubmit} className="post-form">
        <label>Author:</label><input type="text" name="author"></input>
        <label>Title:</label><input type="text" name="title"></input>
        <label>Synopsis:</label><textarea name="synopsis"></textarea>
        <button className = "button-form-label"type="submit">Submit</button>
        {showPostStatus ? <div>Success!</div> : null}
      </form>
    </div>
  )


}

export default Form;
