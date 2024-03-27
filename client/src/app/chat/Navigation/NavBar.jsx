import { RxCalendar, RxGear, RxHome, RxPerson, RxReader } from 'react-icons/rx'
import { BsBuilding, BsChat, BsEnvelope } from "react-icons/bs"
import { AiOutlineHourglass } from "react-icons/ai"
import styles from '../styles/Navigation/Navbar.module.css'
import { useState } from 'react'

const NavBar = ({ isMobile = false }) => {
  return isMobile ? null : <DesktopSidebarNav />
}

// Desktop Sidebar Nav stuf

const icons = [
  <RxHome />,
  <BsBuilding />,
  <AiOutlineHourglass />,
  <BsEnvelope />,
  <RxReader />,
  <RxCalendar />,
  <BsChat />,
  <RxGear />,
  <RxPerson />
]
const DesktopSidebarNav = () => {
  return (
    <div className={styles.desktopNav}>
      {
        icons.map((icon, i) => {
          return (
            <NavIcon
              key={i}
              icon={icon}
            />
          )
        })
      }
    </div>
  )
}

const NavIcon = ({ icon, iconActive = false }) => {
  const [isActive, setActive] = useState(false)

  return (
    <div className={`icon ${styles.icon} ${isActive ? styles.active : null}`}>
      {icon}
    </div>
  )
}

export default NavBar
