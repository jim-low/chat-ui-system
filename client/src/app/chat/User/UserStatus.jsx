import { useLogInUser } from '@/contexts/LoggedInUserContext'
import '../styles/User/UserStatus.css'
import Image from 'next/image'

const UserStatus = () => {
  const { loggedInUser: user } = useLogInUser()

  return (
    <div id="userStatus">
      <div className="user-image">
        <Image
          src={user?.profileImage}
          alt={user?.username}
          width={80}
          height={80}
          style={{ borderRadius: '50%' }}
        />
      </div>
      <div className="user-name">
        <p style={{ margin: 0, marginTop: 5 }}>{user?.username.split(" ")[0]}</p>
      </div>
    </div>
  )
}

export default UserStatus
