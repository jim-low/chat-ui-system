import { useEffect, useState } from 'react'
import '../styles/Groups/GroupsDisplay.css'
import axios from 'axios'
import { useLogInUser } from '@/contexts/LoggedInUserContext'
import { Flex, Text } from '@radix-ui/themes'

const Group = ({ groupName }) => {
  function getInitial(str) {
    return str.split(' ').find(word => word.match(/[a-z]/g))[0]
  }

  const colors = ["#d3cdfa", "#f8f5ca", "#ffe6f4", "#e5fff1"]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  return (
    <Flex gap="5" width="80%" style={{ margin: "0 auto", fontSize: "1.1rem" }}>
      <Flex align='center' justify='center' className="initial-container" style={{ width: "25px", height: "25px" }}>
        <Text as='p' align='center' style={{ backgroundColor: randomColor, width: "100%", borderRadius: 5 }}>{getInitial(groupName)}</Text>
      </Flex>
      <Text>{groupName}</Text>
    </Flex>
  )
}

const GroupsDisplay = () => {
  const { loggedInUser } = useLogInUser()
  const [groupsList, setGroupsList] = useState([])

  useEffect(() => {
    axios('http://13.212.255.177/api/chatSystem/groups/list').then(res => {
      setGroupsList(res.data.filter(group => group.users.includes(loggedInUser?.id)))
    })
  }, [loggedInUser])

  return (
    <div id="groupsDisplay">
      <div className="title">
        <p>Groups ({groupsList?.length})</p>
        <p>+</p>
      </div>
      <div className="groupsList">
        {
          groupsList.map((group, i) => <Group key={i} groupName={group.name} />)
        }
      </div>
    </div>
  )
}

export default GroupsDisplay
