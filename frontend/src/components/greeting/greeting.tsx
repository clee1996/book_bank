import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useAuthState, logout, useAuthDispatch} from '../context/index.js'
import BounceLoader from 'react-spinners/BounceLoader'
import './greeting.css'

type Book = {
  title: string;
  canonicalVolumeLink: string;
  imageLinks: {smallThumbnail: string}
}

type VolumeInfo = {
  volumeInfo: Book
}



const Greeting = () => {

  const history = useHistory()
  const dispatch = useAuthDispatch()
  const [info, setInfo] = useState<VolumeInfo[]>([])
  const [fetchingBooks, setFetchingBooks] = useState<boolean>(true)

  useEffect(() => {

    const fetchInfo = async () => {
      if (fetchingBooks) {
      const response = await fetch("https://www.googleapis.com/books/v1/users/109771133625933164510/bookshelves/0/volumes?key=AIzaSyAmMhNJaRV1WpZciy6On46vefxALDOaGag")
      const data = await response.json()
      //declare types in typescript
      let arr:VolumeInfo[] = []

      //go through array of data and sort it using the information i need
      for (let i = 0; i < data.items.length; i++) {

        arr.push(data.items[i])
      }

      setFetchingBooks(false)
      setInfo(prev => [...prev, ...arr])


      }
      //cleanup
      setFetchingBooks(false)
    }

    fetchInfo()


  })

  const handleLogout = () => {
    logout(dispatch)
    //history.push('/')

  }

  if (info.length < 1) {
    return <div className = "spinner">
      <BounceLoader/>
    </div>
  }



  return(
    <div className="greeting-component">
      <h1 className="header">Welcome to the Book Bank</h1>
      <button className="logout-button"onClick={handleLogout}>Logout</button>
        <h2 className = "sub-header-greeting">Random Recommended List of Books for your Pleasure!</h2>
      {info.map((books, idx) => (
        <div className="greeting-list-book" key ={idx}>
          <div>{books.volumeInfo.title}</div>
          <a href={books.volumeInfo.canonicalVolumeLink} target="_blank"><img className="link-to-book" src={books.volumeInfo.imageLinks.smallThumbnail}></img></a>
        </div>
      ))}
        <div className="link-tags">
          <Link to ="/books"><button className="link-one">View Your Favorite Books</button></Link>

          <Link to ="/formforbooks"><button className="link-two">Add a Book</button></Link>

        </div>


    </div>
  )
}

export default Greeting;
