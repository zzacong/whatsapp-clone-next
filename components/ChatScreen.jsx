import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Avatar, IconButton } from '@material-ui/core'
import {
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  InsertEmoticon,
  Mic,
} from '@material-ui/icons'
import TimeAgo from 'react-timeago'
import Message from './Message'
import { auth, db, timestamp as fireTimestamp } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { getRecipientEmail } from '../lib/utils'

export default function ChatScreen({ chat, messages }) {
  const [input, setInput] = useState('')
  const endOfMessagesRef = useRef()
  const router = useRouter()
  const [user] = useAuthState(auth)
  const recipientEmail = getRecipientEmail(chat.users, user)

  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', recipientEmail)
  )

  const recipient = recipientSnapshot?.docs?.[0]?.data()

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map(msgDoc => (
        <Message
          key={msgDoc.id}
          user={msgDoc.data().user}
          message={{
            ...msgDoc.data(),
            timestamp: msgDoc.data().timestamp?.toDate().getTime(),
          }}
        />
      ))
    } else {
      return messages.map(message => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  const sendMessage = e => {
    e.preventDefault()
    if (input) {
      db.collection('users')
        .doc(user.uid)
        .set({ lastSeen: fireTimestamp() }, { merge: true })

      db.collection('chats').doc(router.query.id).collection('messages').add({
        timestamp: fireTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
      })

      setInput('')
      scrollToBottom()
    }
  }

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behaviour: 'smooth',
      block: 'center',
    })
  }

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo date={recipient?.lastSeen?.toDate()} />
              ) : (
                'Unavailable'
              )}
            </p>
          ) : (
            <p>Loading last active...</p>
          )}
        </HeaderInformation>

        <HeaderIcons>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {/* show messages */}
        {showMessages()}
        <EndOfMessages ref={endOfMessagesRef} />
      </MessageContainer>

      <InputContainer onSubmit={sendMessage}>
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <Input
          type="text"
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
        <button hidden disabled={!input} type="submit" />
        <IconButton>
          <Mic />
        </IconButton>
      </InputContainer>
    </Container>
  )
}

const Container = styled.div`
  overflow-y: scroll;
  height: 98vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms--ms-overflow-style: none;
  scrollbar-width: none;
`

const Header = styled.header`
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem;
  height: 5rem;
`
const HeaderInformation = styled.div`
  flex: 1;
  margin-left: 1rem;

  > h3 {
    margin-bottom: 0;
  }

  > p {
    font-size: 0.8rem;
    color: slategray;
    font-style: italic;
  }
`

const HeaderIcons = styled.aside``

const MessageContainer = styled.main`
  padding: 2rem;
  background-color: #ece5dd;
  min-height: 90vh;
`

const EndOfMessages = styled.div`
  margin-bottom: 2rem;
`

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 0.6rem;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`

const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 1.2rem;
  margin: 0 0.6rem;
  font-size: 1rem;
`
