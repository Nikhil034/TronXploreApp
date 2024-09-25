import React from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #000;
    color: #fff;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Orbitron', sans-serif;
  }
`

const fadeIn = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const ContainerWrapper = styled.div`
  padding: 1.25rem;
  padding-top: 6rem;
  background-color: black;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const BackButtonStyled = styled.button`
  position: fixed;
  top: 1.25rem;
  left: 1.25rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  z-index: 10;
  background-color: #dc2626;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b91c1c;
  }
`

const ContentWrapper = styled.div`
  opacity: 0;
  transform: translateY(1.25rem);
  animation: ${fadeIn} 0.5s ease-out forwards;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const InfoCardWrapper = styled.div`
  background: linear-gradient(to bottom right, #111827, #000000);
  border: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  padding: 30px;
  border-radius: 0.5rem;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: translateY(-0.25rem);
  }
`

const CardTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ef4444;
  margin-bottom: 1rem;
`

const CardContent = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.625;
`

const Container = ({ onBack }) => (
  <ContainerWrapper>
    <BackButton onBack={onBack} />
    <Content />
  </ContainerWrapper>
)

const BackButton = ({ onBack }) => (
  <BackButtonStyled onClick={onBack}>
    ← Back to Game
  </BackButtonStyled>
)

const Content = () => (
  <ContentWrapper>
    <InfoCard
      title="What is Tron Blockchain?"
      content="Tron is a decentralized blockchain platform that aims to build a free, global digital content entertainment system with distributed storage technology. It allows easy and cost-effective sharing of digital content."
    />
    <InfoCard
      title="Why Tron?"
      content="Tron is known for its scalability, high throughput, and low fees, making it ideal for creating decentralized applications (dApps), including games, finance, and content sharing platforms. It also supports smart contracts, making it a versatile option for developers."
    />
    <InfoCard
      title="Our Purpose"
      content="We are creating a gamified learning platform that provides an interactive way for users to learn about the Tron blockchain. Through various stages and tasks, you'll explore Tron's core features, its use cases, and gain valuable knowledge of how to use the Tron ecosystem effectively."
    />
  </ContentWrapper>
)

const InfoCard = ({ title, content }) => (
  <InfoCardWrapper>
    <CardTitle>{title}</CardTitle>
    <CardContent>{content}</CardContent>
  </InfoCardWrapper>
)

export default function Frame1({ onBack }) {
  return (
    <>
      <GlobalStyle />
      <Container onBack={onBack} />
    </>
  )
}