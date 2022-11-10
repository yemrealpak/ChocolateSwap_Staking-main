import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CryptoJS from 'crypto-js'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: -10rem;
  flex-direction: column;
`

const TextContainer = styled.div`
  background: #FDFDFD;
  height: 40%;
  padding: 1rem;
  border-radius: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Index = () => {
  const {account} = useActiveWeb3React()
  const [referralCode,setReferralCode] = useState('')
  useEffect(() => {
    if (account !== undefined) {
  
    const ciphertext = CryptoJS.AES.encrypt(account, 'ChocolateSwap').toString();
    setReferralCode(account.substring(2,account.length))
    }
  }, [account])
  return (
    <Container>
      <TextContainer>
        <h1 style={{ marginBottom: '3rem', color: '#3E8FFF', fontSize: '1.6rem' }}>Your Referral Code</h1>
        <div style={{ background: '#B1B1B1', padding: '2rem 3rem', borderRadius: '1rem', color: 'black' }}>
          <h1>{referralCode}</h1>
        </div>
      </TextContainer>
    </Container>
  )
}

export default Index
