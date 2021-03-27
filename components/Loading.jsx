import styled from 'styled-components'
import { BeatLoader, RingLoader } from 'react-spinners'

export default function Loading() {
  return (
    <LoadingContainer>
      <BeatLoader color="#25D366" size={20} />
    </LoadingContainer>
  )
}

const LoadingContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`
