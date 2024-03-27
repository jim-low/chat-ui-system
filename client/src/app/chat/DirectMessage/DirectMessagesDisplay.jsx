import { useEffect, useState } from 'react'
import SearchBar from '../Utilities/SearchBar'
import '../styles/DirectMessage/DirectMessagesDisplay.css'
import axios from 'axios'
import { useLogInUser } from '@/contexts/LoggedInUserContext'
import Image from 'next/image'

const DirectMessagesDisplay = () => {
  const [searchText, setSearchText] = useState('')
  const [chatList, setChatList] = useState([])
  const { loggedInUser } = useLogInUser()

  useEffect(() => {
    axios('http://13.212.255.177/api/chatSystem/users/list').then(res => {
      const list = []
      for (const person of res.data) {
        if (person.id !== loggedInUser?.id) {
          list.push(person)
        }
      }
      setChatList(list)
    })
  }, [loggedInUser])

  return (
    <div id="directMessagesDisplay">
      <SearchBar
        value={searchText}
        handleChange={e => setSearchText(e.target.value)}
        placeholder='Search Contact'
      />

      <div className="messagesList">
        { chatList.length === 0 && "Loading..."}
        {
          searchText.length === 0 && 
            chatList.map(chat => {
              return (
                <Chat
                  key={chat?.id}
                  id={chat?.id}
                  profileImage={chat?.profileImage}
                  username={chat?.username}
                  sentByCurrentUser={Math.random() < 0.5}
                />
              )
            })
        }
      </div>

      <div className="buttons-container">
        <div className="primary-button btn">Meeting</div>
        <div className="btn">Schedule</div>
      </div>

    </div>
  )
}

const Chat = ({ id, profileImage, username, sentByCurrentUser = false }) => {
  const [recentMessage, setRecentMessage] = useState("")

  {/* useEffect(() => { */}
  {/*   axios(`http://13.212.255.177/api/chatSystem/chatByUserId/${id}`).then(res => { */}
  {/*   }) */}
  {/* }, []) */}

  return (
    <div className="chat">
      <div className="user-image">
        <Image
          src={profileImage}
          alt={username}
          width={60}
          height={60}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div className="user-details">
        <div className="name">{username}</div>
        <div className="message">{sentByCurrentUser && "You: "}lorem ipsum and some stuff idk</div>
        <div className="timestamp">
          <span className="date">Dec 12 69420</span>
          <span className="time">10.69AM</span>
        </div>
      </div>
    </div>
  )
}

export default DirectMessagesDisplay
