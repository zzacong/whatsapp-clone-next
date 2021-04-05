import { Avatar, Button, IconButton } from '@material-ui/core'
import {
  MoreVert as MoreVertIcon,
  Chat as ChatIcon,
  Search as SearchIcon,
} from '@material-ui/icons'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { isEmail } from 'validator'
import { auth, firestore } from '../config/firebase'
import ChatLink from './ChatLink'

export default function Sidebar() {
  const [user] = useAuthState(auth)
  const userChatRef = firestore
    .collection('chats')
    .where('users', 'array-contains', user?.email)
  const [chatsSnapshot] = useCollection(userChatRef)

  const createChat = () => {
    const input = prompt(
      'Please enter an email address for the user you wish to chat with'
    )

    if (!input) return
    if (isEmail(input) && !chatAlreadyExists(input) && input !== user.email) {
      // TODO: add the chat into the DB 'chats' collection
      firestore.collection('chats').add({
        users: [user.email, input],
      })
    }
  }

  const chatAlreadyExists = recipientEmail =>
    !!chatsSnapshot?.docs.find(chat =>
      chat.data().users.includes(recipientEmail)
    )

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </SearchContainer>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of chats */}
      {chatsSnapshot?.docs.map(chat => (
        <ChatLink key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  )
}

const Container = styled.nav`
  flex: 0.45;
  border-right: 2px solid whitesmoke;
  height: 98vh;
  min-width: 18.5rem;
  max-width: 22rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`

const Header = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`

const IconsContainer = styled.div``

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`

const SearchInput = styled.input`
  outline: none;
  border: none;
  border-radius: 20px;
  padding: 1rem;
  margin-left: 0.5rem;
  flex: 1;

  :hover,
  :focus {
    background-color: whitesmoke;
  }
`
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 2px solid whitesmoke;
    border-bottom: 2px solid whitesmoke;
  }
`
