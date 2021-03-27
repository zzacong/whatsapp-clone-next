import Head from 'next/head'
import NextImage from 'next/image'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import { auth, googleProvider } from '../config/firebase'

export default function Login() {
  const signIn = () => {
    auth.signInWithPopup(googleProvider).catch(alert)
  }

  return (
    <Container>
      <Head>
        <title>Login | Nextjs</title>
      </Head>

      <LoginContainer>
        <NextImage
          src="/whatsapp_logo.png"
          alt="Logo of Whatsapp"
          width={120}
          height={120}
        />

        <LoginButton
          variant="outlined"
          startIcon={
            <NextImage src="/google_logo.svg" width={20} height={20} />
          }
          onClick={signIn}
        >
          Sign in with Google
        </LoginButton>
      </LoginContainer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`

const LoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
`

const LoginButton = styled(Button)`
  &&& {
    margin-top: 5rem;
  }
`
