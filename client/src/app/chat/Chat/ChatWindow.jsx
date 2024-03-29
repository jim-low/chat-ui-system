import { Flex, Text, TextField } from '@radix-ui/themes'
import { TbPhoneCall } from "react-icons/tb";
import { BsCameraVideo, BsPaperclip  } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineTextFormat, MdOutlineAlternateEmail  } from "react-icons/md";
import { AiOutlinePicture, AiOutlineLink } from "react-icons/ai";
import { PiSmileyLight } from "react-icons/pi";
import { FaRegPaperPlane } from "react-icons/fa";
import '../styles/Chat/ChatWindow.css'
import Image from 'next/image'
import { useLogInUser } from '@/contexts/LoggedInUserContext'
import SearchBar from '../Utilities/SearchBar'
import { useChatUser } from '@/contexts/ChatUserContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopPart = ({ user }) => {
  return (
    <Flex className="top" justify='between' pl='3' pr='3'>
      <Flex gap="2" align='center' className="left">
        { user == null &&
          <div className="image-container">
          </div>
        }
        { user != null &&
          <div className="image-container">
            <Image
              width={80}
              height={80}
              src={user?.profileImage}
              alt={user?.username}
              style={{ borderRadius: "50%" }}
            />
          </div>
        }
        <Flex direction='column' className="text-container">
          <Text size='4' weight='medium'>{user?.username}</Text>
          <Text color='gray'>{user?.position}</Text>
        </Flex>
      </Flex>
      <Flex className="right" align="center" justify='end' gap='2'>
        <div className="search-container">
          <SearchBar />
        </div>
        <Flex align='center' justify='center' className="icon">
          <TbPhoneCall />
        </Flex>
        <Flex align='center' justify='center' className="icon">
          <BsCameraVideo />
        </Flex>
        <Flex align='center' justify='center' className="icon">
          <HiOutlineDotsVertical />
        </Flex>
      </Flex>
    </Flex>
  )
}

const BottomPort = ({ fromUser, toUser }) => {
  const [messageText, setMessageText] = useState('')

  function handleSendMessage(e) {
    if (e.key !== "Enter") {
      return
    }

    axios.post('http://13.212.255.177/api/chatSystem/chat/add', {
      fromUser: fromUser,
      toUser: toUser,
      message: messageText
    }).then(res => {
        console.log(res.data)
    }).catch(err => console.error(err))

    setMessageText('')
    e.preventDefault()
  }

  return (
    <Flex className="bottom" justify='between' pl="3" pr="3" align='center'>
      <div className="input-container">
        <TextField.Root
          placeholder="Type a message here.."
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          onKeyDown={handleSendMessage}
          size='3'
        />
      </div>
      <Flex className="buttons" justify='between' align='center' gap='3'>
        <div className="icon"><MdOutlineAlternateEmail /></div>
        <div className="icon"><MdOutlineTextFormat /></div>
        <div className="icon"><BsPaperclip /></div>
        <div className="icon"><PiSmileyLight /></div>
        <div className="icon"><AiOutlinePicture /></div>
        <div className="icon"><AiOutlineLink /></div>
        <Flex justify='center' align='center' className="icon special-icon" onClick={handleSendMessage}><FaRegPaperPlane /></Flex>
      </Flex>
    </Flex>
  )
}

const Message = ({ image, user, message, selfSent }) => {
  const ProfilePic = () =>
    <div className="image-container">
      <Image
        src={user.profileImage}
        alt={user.username}
        width={50}
        height={50}
        style={{ borderRadius: "50%" }}
      />
    </div>

  return (
    <Flex gap="4" mt="5" justify={selfSent ? 'end' : 'start'} mb="5">
      { !selfSent && <ProfilePic /> }
      <Flex className="message-container" direction='column' align={selfSent ? 'end' : 'start'}>
        <Text weight="bold" mb="2">{user.username}</Text>
        <Text className={`message-box ${selfSent && 'self-sent'}`}>

          {
            image != null &&
              <React.Fragment>
                <Image
                  width={256}
                  height={256}
                  src={image}
                  alt="Media Image"
                  style={{ borderRadius: 20, marginBottom: 15 }}
                />
                <br />
              </React.Fragment>
          }
          {message}
        </Text>
      </Flex>
      { selfSent && <ProfilePic /> }
    </Flex>
  )
}

const ChatWindow = () => {
  const { loggedInUser } = useLogInUser()
  const { chatUser } = useChatUser()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios(`http://13.212.255.177/api/chatSystem/chatByUserId/${chatUser?.id}`).then(res => {
      setMessages(res.data)
    })
  }, [chatUser])

  return (
    <Flex direction='column' width="70%" height="100%" id="chatWindow">
      <TopPart user={chatUser} />
      <div className="mid">
        {
          messages.length !== 0 &&
            messages.map((msg, i) => {
              const sentByLoggedInUser = msg.fromUser === loggedInUser?.id
              return (
                <Message key={i} user={sentByLoggedInUser ? loggedInUser : chatUser} message={msg.message} selfSent={sentByLoggedInUser} image={msg.image} />
              )
            })
        }
      </div>
      <BottomPort fromUser={loggedInUser?.id} toUser={chatUser?.id} />
    </Flex>
  )
}

export default ChatWindow
