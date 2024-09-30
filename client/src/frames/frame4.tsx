import styled, { createGlobalStyle, keyframes } from 'styled-components';

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

const Container = styled.div`
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
  color: #fff;
  text-align: center;
  margin-bottom:20px;
`;

const Subtitle = styled.h3`
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin-top: 20px;
  margin-bottom:16px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3),
    0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ff6666;
  text-align: left;
`;

const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
`;

const HighlightedText = styled(Text)`
  margin-bottom: 15px;
  background-color: rgb(82 79 79 / 80%);
  padding: 20px;
  border-left: 4px solid #cc0000;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`;

const List = styled.ol`
  padding-left: 20px;
  counter-reset: item;
  list-style-type: none;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  opacity: 0;
  transform: translateX(-20px);
  animation: ${slideIn} 0.5s ease-out forwards;
  position: relative;
  padding-left: 40px;

  &::before {
    content: counter(item);
    counter-increment: item;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(45deg, #ff0000, #cc0000);
    color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(255, 0, 0, 0.3);
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
  display: inline-block;
  align-items: center;
  width: fit-content;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 10px 5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
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

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #ff3333;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
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
  margin: 20px auto 0 20px;

  &:hover {
    background-color: #b91c1c;
  }
`;

interface GettingTRXProps {
  onBack: () => void;
}

export default function GettingTRX({ onBack }: GettingTRXProps) {
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
      <BackButton onClick={onBack}>← Back to Game</BackButton>
      <ScrollableContent>
      <Container>
        <Title>Getting TRX in Your TronLink Wallet</Title>
        <Text>
          TRX is the native cryptocurrency of the Tron blockchain. It is used for
          paying transaction fees, smart contract interactions, and much more.
        </Text>

        <Subtitle>What is Shasta Testnet?</Subtitle>
        <HighlightedText>
          Shasta Testnet is a testing environment for Tron developers. It allows
          you to use TRX for free in a simulated environment without affecting the
          main Tron network. It's great for learning and experimenting without any
          risk.
        </HighlightedText>

        <Subtitle>Steps to Get TRX on Shasta Testnet</Subtitle>
        <List>
          <ListItem>
            Open your TronLink wallet and click on the network drop-down (top
            center).
          </ListItem>
          <ListItem>
            Select <strong>Shasta Testnet</strong> from the list of available
            networks.
          </ListItem>
          <ListItem>
            Once switched, go to the Shasta Faucet at &nbsp;
            <Link href="https://shasta.tronex.io/" target="_blank">
              https://shasta.tronex.io/
            </Link>
            .
          </ListItem>
          <ListItem>Copy your TronLink wallet address.</ListItem>
          <ListItem>
            Paste your wallet address in the Shasta Faucet and click "Submit".
          </ListItem>
          <ListItem>
            You should receive TRX in your wallet shortly. Check your TronLink
            wallet balance.
          </ListItem>
        </List>

        <ButtonCont onClick={onBack}>Continue Your Journey</ButtonCont>
      </Container>
      </ScrollableContent>
      </PageWrapper>
    </>
  );
}