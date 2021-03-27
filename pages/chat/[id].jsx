import Head from 'next/head'
import styled from 'styled-components'
import ChatScreen from '../../components/ChatScreen'
import Sidebar from '../../components/Sidebar'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getRecipientEmail } from '../../lib/utils'

export default function Chat({ messages, chat }) {
  const [user] = useAuthState(auth)

  // console.log(messages)
  // console.log(chat)

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)} | Nextjs</title>
      </Head>

      <Sidebar />

      <ChatContainer>
        <ChatScreen chat={chat} messages={JSON.parse(messages)} />
      </ChatContainer>
    </Container>
  )
}

export async function getServerSideProps({ query }) {
  const ref = db.collection('chats').doc(query.id)

  const messageRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = messageRes.docs.map(msgDoc => {
    const props = msgDoc.data()
    return {
      id: msgDoc.id,
      ...props,
      timestamp: props.timestamp.toDate().getTime(),
    }
  })

  const chatRes = await ref.get()
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  }

  return {
    props: { messages: JSON.stringify(messages), chat },
  }
}

const Container = styled.div`
  display: flex;
`

const ChatContainer = styled.div`
  flex: 1;
`
