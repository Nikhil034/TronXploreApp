import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;400;600&display=swap');

  body {
    font-family: "Poppins", sans-serif;
    background-color: #000000;
    color: #ffffff;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: radial-gradient(
      circle at 10% 20%,
      rgba(255, 0, 0, 0.1) 0%,
      transparent 20%
    ),
    radial-gradient(
      circle at 90% 80%,
      rgba(255, 0, 0, 0.1) 0%,
      transparent 20%
    );
  }
`;

const Container = styled.div`
  max-width: 600px;
  width: 90%;
  background-color: rgba(36, 36, 36, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(255, 0, 0, 0.2),
    0 0 0 1px rgba(255, 0, 0, 0.1);
  position: relative;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  margin-top: 0;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3),
    0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 30px;
`;

const OrderedList = styled.ol`
  padding-left: 0;
  counter-reset: item;
  list-style-type: none;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  position: relative;
  padding-left: 50px;
  font-size: 16px;

  &::before {
    content: counter(item);
    counter-increment: item;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ff0000;
    color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-family: "Orbitron", sans-serif;
  }
`;

const Link = styled.a`
  color: #ff6666;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #ff9999;
  }
`;

const Note = styled.div`
  background-color: rgba(82, 79, 79, 0.8);
  padding: 20px;
  border-left: 4px solid #ff0000;
  margin-top: 30px;
  border-radius: 0 10px 10px 0;
  font-size: 14px;
`;

const Button = styled.a`
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  margin-top: 30px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc0000;
  }
`;

const BackButtonStyled = styled.button`
//   position: fixed;
//   top: 1.25rem;
//   left: 1.25rem;

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
  margin: 20px 20px 0 20px;

  &:hover {
    background-color: #b91c1c;
  }
`;

interface TronLinkGuideProps {
  onBack: () => void;
}

const TronLinkGuide: React.FC<TronLinkGuideProps> = ({ onBack }) => {
  return (
    <>
      <GlobalStyle />
      <BackButtonStyled onClick={onBack}>← Back to Game</BackButtonStyled>
      <Container>
        <Title>HOW TO CREATE A TRONLINK ACCOUNT</Title>
        <OrderedList>
          <ListItem>
            Visit the official TronLink extension page:{' '}
            <Link href="https://www.tronlink.org/" target="_blank">
              TronLink
            </Link>
          </ListItem>
          <ListItem>Click on 'Add to Chrome' to install the TronLink extension.</ListItem>
          <ListItem>
            Once installed, click on the TronLink icon in your browser toolbar.
          </ListItem>
          <ListItem>
            Click on 'Create Account' and follow the steps to set up your new
            account, including backing up your private key.
          </ListItem>
          <ListItem>You're now ready to use TronLink with the Tron blockchain!</ListItem>
        </OrderedList>
        <Note>
          <strong>Note:</strong> Always keep your private key secure and never
          share it with anyone.
        </Note>
        <Button
          href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"
          target="_blank"
        >
          Add TronLink Extension
        </Button>
      </Container>
    </>
  );
};

export default TronLinkGuide;