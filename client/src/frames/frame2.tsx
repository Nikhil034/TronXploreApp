import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;400;600&display=swap');

  body {
    font-family: "Poppins", sans-serif;
    padding: 20px;
    background-color: #000000;
    color: #ffffff;
    line-height: 1.6;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
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
    overflow-x: hidden;
  }
`;

const PageWrapper = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
overflow: hidden;
`;

const ScrollableContent = styled.div`
flex: 1;
overflow-y: auto;
padding: 20px;
`;

const fadeIn = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const DialogWrapper = styled.div`
  max-width: 650px;
  background-color: rgba(36, 36, 36, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(255, 0, 0, 0.2),
    0 0 0 1px rgba(255, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.5s ease-out forwards;
  backdrop-filter: blur(10px);
  margin:auto;
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
  color: #ffffff;
`;

const Paragraph = styled.p`
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateX(-20px);
  animation: ${slideIn} 0.5s ease-out forwards;
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 80px;
  gap: 20px;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #ff0000, #cc0000);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;
const ButtonCont = styled.button`
  background: linear-gradient(45deg, #4caf50, #388e3c);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: fit-content;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const WalletAddress = styled.p`
  margin-top: 20px;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  background-color: rgba(82, 79, 79, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const SpanText = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const BackButton = styled.button`
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
  margin:20px auto 0 20px;

  &:hover {
    background-color: #b91c1c;
  }
`;

interface TronLinkWalletConnectionProps {
  onBack: () => void;
}

const TronLinkWalletConnection: React.FC<TronLinkWalletConnectionProps> = ({ onBack }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // Check if TronLink is installed
      if (typeof window.tronWeb === 'undefined') {
        toast.error('TronLink wallet is not installed or not logged in.', {
          position: 'top-center',
        });
        return;
      }

      // Request account access
      await window.tronWeb.request({ method: 'tron_requestAccounts' });

      // Check if the user is connected after the request
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        const connectedAddress = window.tronWeb.defaultAddress.base58;
        setWalletAddress(connectedAddress);
        const username = Cookies.get('username');
        const response = await axios.patch('https://api.tronxplore.blockchainbytesdaily.com/ws/users/user_task2', { username: username,address:connectedAddress });
        toast.success('Congratulations on completing your task! 🎉', {
          position: 'top-center',
        });   
      } else {
        toast.error('Failed to connect. Please try again!', {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('An error occurred while connecting. Please make sure TronLink is unlocked and try again.', {
        position: 'top-center',
      });
      
    }
  };
 
  return (
    <>
      <GlobalStyle />
      <Toaster/>
      <PageWrapper>
      <BackButton onClick={onBack}>← Back to Game</BackButton>
      <ScrollableContent>
      <DialogWrapper>
        <Title>Connect your TronLink Wallet</Title>
        <Paragraph>Please click the button below to connect your TronLink wallet.</Paragraph>
        
        <Button onClick={connectWallet}>Connect Wallet</Button>
        <WalletAddress>
          <SpanText>Wallet Address :</SpanText> {walletAddress || 'Not Connected'}
        </WalletAddress>
        
        <ButtonGroup>
          <ButtonCont onClick={onBack}>Continue Your Journey</ButtonCont>
        </ButtonGroup>
      </DialogWrapper>
      </ScrollableContent>
      </PageWrapper>
    </>
  );
};

export default TronLinkWalletConnection;