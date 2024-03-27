import { useEffect, useState } from 'react'
import '../styles/Groups/GroupsDisplay.css'
import axios from 'axios'

const GroupsDisplay = () => {
  const [groupsList, setGroupsList] = useState([])

  useEffect(() => {
    axios('http://13.212.255.177/api/chatSystem/groups/list').then(res => {
      setGroupsList(res.data)
    })
  }, [])

  return (
    <div id="groupsDisplay">
      <div className="title">
        <p>Groups ({groupsList.length})</p>
        <p>+</p>
      </div>
      <div className="groupsList">
      </div>
    </div>
  )
}

export default GroupsDisplay
