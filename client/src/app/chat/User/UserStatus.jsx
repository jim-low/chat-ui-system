import { useLogInUser } from '@/contexts/LoggedInUserContext'
import '../styles/User/UserStatus.css'
import Image from 'next/image'
import { Flex, Text } from '@radix-ui/themes'

const UserStatus = () => {
  const { loggedInUser: user } = useLogInUser()

  return (
    <Flex id='userStatus' direction="column" justify="center" align="center" >
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
        <Text align="center" m="0" mt="3px" weight="bold">{user?.username.split(" ")[0]}</Text>
      </div>
    </Flex>
  )
}

export default UserStatus
