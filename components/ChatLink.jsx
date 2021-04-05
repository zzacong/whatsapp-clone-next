import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import { getRecipientEmail } from '../lib/utils'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../config/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'

export default function Chat({ id, users }) {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const recipientEmail = getRecipientEmail(users, user)
  const [recipientSnapshot] = useCollection(
    firestore.collection('users').where('email', '==', recipientEmail)
  )

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data()

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.8rem;
  word-break: break-word;

  :hover {
    background-color: whitesmoke;
  }
`

const UserAvatar = styled(Avatar)`
  margin: 0.5rem;
  margin-right: 1rem;
`
