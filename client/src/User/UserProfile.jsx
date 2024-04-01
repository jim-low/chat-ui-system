import { Flex, Grid, Text } from '@radix-ui/themes'
import './styles/UserProfile.css'
import Image from 'next/image'
import { VscLocation } from "react-icons/vsc";
import { MdPersonAddAlt } from "react-icons/md";
import { FiMessageCircle } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { HiOutlineInformationCircle, HiOutlineUserGroup  } from "react-icons/hi2";
import { AiOutlinePicture } from "react-icons/ai";
import { useChatUser } from '@/contexts/ChatUserContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopPart = ({ user }) => {

  const FloatingCard = () => {
    if (user == null) {
      return <React.Fragment></React.Fragment>
    }

    return (
    <Flex className='floating-card' direction='column' justify='center' align='center'>
      <Text weight="medium" className="name">{user?.username}</Text>
      <Text color="gray" className="position">{user?.position}</Text>
      <Flex width="100%" align='center' justify='center' className="address"><span className='icon'><VscLocation /></span><Text weight='medium'>{user?.address}</Text></Flex>
      <Flex justify='between' gap='4' className="buttons">
        <Flex justify='center' align='center' className="icon add-user"><MdPersonAddAlt /></Flex>
        <Flex justify='center' align='center' className="icon message"><FiMessageCircle /></Flex>
        <Flex justify='center' align='center' className="icon video-call"><BsCameraVideo /></Flex>
      </Flex>
    </Flex>
    )
  }

  return (
    <div className="top-part">
      { user != null &&
        <div className="image-container">
          <Image
            src={user?.profileImage}
            alt={user?.username}
            fill
            objectFit='cover'
            style={{ borderRadius: "20px" }}
          />
        </div>
      }
      <FloatingCard />
    </div>
  )
}

const BottomPart = ({ user }) => {
  const Info = ({ title, content }) => <Flex direction='column'><Text color='gray'>{title}</Text><Text size="3" weight='medium'>{content}</Text></Flex>

  const InfoSection = ({ title, icon, children}) => {
    return (
      <Flex direction='column' gap="3" pl="3" pr="3" mt="4" style={{ overflow: 'auto' }}>
        <Flex justify='between' align='center'>
          <Text weight='medium' size='4'>{title}</Text>
          <div className='icon'>
            {icon}
          </div>
        </Flex>
        {children}
      </Flex>
    )
  }

  const UserInformation = () => {
    return (
      <InfoSection
        title="User Information"
        icon={<HiOutlineInformationCircle />}
      >
        <Info title="Phone" content={user?.phone} />
        <Info title="Email" content={user?.email} />
      </InfoSection>
    )
  }

  const GroupsParticipants = () => {
    return (
    <InfoSection
        title="Group Participants"
        icon={<HiOutlineUserGroup />}
      />
    )
  }

  const Medias = () => {
    const [images, setImages] = useState([])

    useEffect(() => {
      axios(`http://13.212.255.177/api/chatSystem/chatByUserId/${user?.id}`).then(res => {
        setImages(res.data.filter(chat => chat.image != null))
      })
    }, [])

    return (
      <InfoSection
        title="Media"
        icon={<AiOutlinePicture />}
      >
        <Grid columns="3" rows="repeat(1, 120px)" gap="3" width="auto">
          {
            images.map((image, i) => {
              return (
                <Image
                  key={i}
                  src={image.image}
                  alt="Media Asset"
                  width={120}
                  height={120}
                  style={{ borderRadius: 20 }}
                />
              )
            })
          }
        </Grid>
      </InfoSection>
    )
  }

  return (
    <Flex className='bottom-part' direction='column'>
      <UserInformation />
      <GroupsParticipants />
      <Medias />
    </Flex>
  )
}

const UserProfile = () => {
  const { chatUser } = useChatUser()

  return (
    <Flex direction='column' id="userProfile">
      <TopPart user={chatUser} />
      <BottomPart user={chatUser} />
    </Flex>
  )
}

export default UserProfile
