import { RxCalendar, RxGear, RxHome, RxPerson, RxReader } from 'react-icons/rx'
import { BsBuilding, BsChat, BsEnvelope } from "react-icons/bs"
import { AiOutlineHourglass } from "react-icons/ai"
import styles from '../styles/Navigation/Navbar.module.css'
import { Flex } from '@radix-ui/themes'
import { useState } from 'react'

const NavBar = ({ isMobile = false }) => {
  return isMobile ? null : <DesktopSidebarNav />
}

const DesktopSidebarNav = () => {
  const [navItems, setNavItems] = useState([
    { name: "home", icon: <RxHome />, active: false },
    { name: "building", icon: <BsBuilding />, active: false },
    { name: "history", icon: <AiOutlineHourglass />, active: false },
    { name: "emails", icon: <BsEnvelope />, active: true },
    { name: "notes", icon: <RxReader />, active: false },
    { name: "calendar", icon: <RxCalendar />, active: false },
    { name: "messages", icon: <BsChat />, active: false },
    { name: "settings", icon: <RxGear />, active: false },
    { name: "profile", icon: <RxPerson />, active: false }
  ])

  function resetActive(clickedName) {
    setNavItems(prevList => {
      const list = [...prevList]
      list.find(nav => nav.active).active = false
      list.find(nav => nav.name === clickedName).active = true
      return [...list]
    })
  }

  return (
    <Flex direction="column" justify="center" gap="5" className={styles.desktopNav}>
      {
        navItems.map(nav => {
          return  <NavIcon key={nav.name} icon={nav.icon} isActive={nav.active} handleClick={() => resetActive(nav.name)}/>
        })
      }
    </Flex>
  )
}

const NavIcon = ({ icon, isActive = false, handleClick }) => {
  return (
    <Flex justify="center" className={`${ styles.icon } ${ isActive ? styles.active : null }`} onClick={handleClick}>
      {icon}
    </Flex>
  )
}

export default NavBar
