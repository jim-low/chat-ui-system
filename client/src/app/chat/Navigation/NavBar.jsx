import { RxCalendar, RxGear, RxHome, RxPerson, RxReader } from 'react-icons/rx'
import { BsBuilding, BsChat, BsEnvelope } from "react-icons/bs"
import { AiOutlineHourglass } from "react-icons/ai"
import styles from '../styles/Navigation/Navbar.module.css'
import { useState } from 'react'
import { Flex } from '@radix-ui/themes'

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

// const DesktopSidebarNav = () => {
//   return (
//     <div className={styles.desktopNav}>
//       {
//         icons.map((icon, i) => {
//           return  <NavIcon key={i} icon={icon} />
//         })
//       }
//     </div>
//   )
// }

const DesktopSidebarNav = () => {
  return (
    <Flex direction="column" justify="center" gap="5" className={styles.desktopNav}>
      {
        icons.map((icon, i) => {
          return  <NavIcon key={i} icon={icon} />
        })
      }
    </Flex>
  )
}

const NavIcon = ({ icon, iconActive = false }) => {
  const [isActive, setActive] = useState(false)

  return (
    <Flex justify="center" className={styles.icon}>
      {icon}
    </Flex>
  )
}

export default NavBar
