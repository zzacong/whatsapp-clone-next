import styled, { css } from 'styled-components'
import moment from 'moment'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

export default function Message({ user, message }) {
  const [loggedInUser] = useAuthState(auth)

  return (
    <Container>
      <MessageBubble isSender={user === loggedInUser.email}>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </Timestamp>
      </MessageBubble>
    </Container>
  )
}

const Container = styled.div``

const MessageBubble = styled.p`
  width: fit-content;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0.6rem;
  min-width: 3.75rem;
  padding-bottom: 1.5rem;
  position: relative;
  text-align: right;

  ${({ isSender }) =>
    isSender
      ? css`
          margin-left: auto;
          background-color: #dcf8c6;
        `
      : css`
          background-color: whitesmoke;
          text-align: left;
        `}
`

const Timestamp = styled.span`
  color: slategray;
  padding: 0.6rem;
  font-size: 0.55rem;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`
