import { Avatar, Button, IconButton } from '@material-ui/core'
import { MoreVert, Chat, Search } from '@material-ui/icons'
import styled from 'styled-components'

export default function Sidebar() {
  return (
    <Container>
      <Header>
        <UserAvatar />
        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>

      <SearchContainer>
        <Search />
        <SearchInput placeholder="Search in chats" />
      </SearchContainer>

      <SidebarButton>Start a new chat</SidebarButton>

      {/* List of chats */}
    </Container>
  )
}

const Container = styled.div``

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
  box-shadow: 0 2px whitesmoke;
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
