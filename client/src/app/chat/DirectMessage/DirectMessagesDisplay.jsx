import { useEffect, useState } from 'react'
import SearchBar from '../Utilities/SearchBar'
import '../styles/DirectMessage/DirectMessagesDisplay.css'
import axios from 'axios'
import { useLogInUser } from '@/contexts/LoggedInUserContext'
import Image from 'next/image'
import { Button, Flex, Text } from '@radix-ui/themes'
import clip from 'text-clipper'
import moment from 'moment'
import { useChatUser } from '@/contexts/ChatUserContext'

const DirectMessagesDisplay = () => {
  const [searchText, setSearchText] = useState('')
  const [usersList, setUsersList] = useState([])
  const { loggedInUser } = useLogInUser()

  useEffect(() => {
    axios('http://13.212.255.177/api/chatSystem/users/list').then(res => {
      setUsersList(res.data.filter(user => user.id !== loggedInUser?.id))
    })
  }, [loggedInUser])

  const matchUsername = user => user.username.match(new RegExp(searchText, "i"))
  const renderChat = (user, i) => <Chat key={i} user={user} loggedInUserId={loggedInUser?.id} /> 

  return (
    <Flex id="directMessagesDisplay" direction='column'>
      <Flex className='search-container' justify='center' align='center'>
        <SearchBar
          value={searchText}
          handleChange={e => setSearchText(e.target.value)}
          placeholder='Search Contact'
        />
      </Flex>
      <Flex className='messagesList' direction="column" align='center' gap="3">
        { usersList.length === 0 && "Loading..."}
        { searchText.length === 0 && usersList.map(renderChat) }
        { searchText.length !== 0 && usersList.filter(matchUsername).length === 0 && "No Results." }
        { searchText.length !== 0 && usersList.filter(matchUsername).map(renderChat) }
      </Flex>
      <Flex className='buttons-container' justify='between' align='center'>
        <Button className="primary-button btn" size='2'><Text>Meeting</Text></Button>
        <Button className="btn" size='2'><Text color='gray'>Schedule</Text></Button>
      </Flex>
    </Flex>
  )
}

const Chat = ({ user, loggedInUserId }) => {
  const { setChatUser } = useChatUser()
  const [info, setInfo] = useState({
    date: "",
    time: "",
    message: "",
    sentByCurrentUser: false
  })

  useEffect(() => {
    axios(`http://13.212.255.177/api/chatSystem/chatByUserId/${user?.id}`).then(res => {
      if (res.data.length === 0) return

      const data = res.data[res.data.length - 1]
      const timestamp = moment(data?.timestamp)
      const date = timestamp.format("MMM DD YYYY")
      const time = timestamp.format("hh.mmA")
      const message = clip(data?.message, 30)
      const sentByCurrentUser = (loggedInUserId === data?.fromUser)

      setInfo({ date, time, message, sentByCurrentUser })
    })
  }, [user])

  return (
    <Flex justify='center' gap="3" mt="1" mb="1" width='100%' onClick={() => setChatUser(user)}>
      <div className="user-image">
        <Image
          src={user?.profileImage}
          alt={user?.username}
          width={60}
          height={60}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <Flex direction='column' width="60%">
        <Text weight='medium' className="name">{user?.username}</Text>
        <Text color='gray' className="message">{info.sentByCurrentUser && "You: "}{info.message}</Text>
        <Flex justify='between'>
          <Text className="date">{info.date}</Text>
          <Text className="time">{info.time}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DirectMessagesDisplay
