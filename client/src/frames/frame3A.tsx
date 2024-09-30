import { useNavigate } from 'react-router-dom';
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

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
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
  margin-bottom:30px;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3),
    0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Subtitle = styled.h3`
  font-family: "Orbitron", sans-serif;
  font-size: 24px;
  margin-top: 20px;
  color: #ff6666;
  font-weight:500;
  margin-bottom:16px;
`;

const TextTitle = styled.p`
    font-size: 14px;
`

const Text = styled.p`
  margin-bottom: 15px;
  background-color: rgb(82 79 79 / 80%);
  padding: 20px;
  border-left: 4px solid #cc0000;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  font-size: 14px;
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

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 10px;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #ff0000, #cc0000);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  display: inline-block;
  align-items: center;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 10px 5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(255, 0, 0, 0.15);
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

interface TransactionSigningProps {
  onBack: () => void;
//   onContinue: () => void;
//   onExit: () => void;
}

export default function TransactionSigning({ onBack }: TransactionSigningProps) {
  const navigate=useNavigate();

  const handleSignTransaction = async () => {
    try {
      const message = "Hello, TronWeb! This is a test message.";
      console.log("Message to sign:", message);

      // Convert message to hex
      const messageHex = (window as any).tronWeb.toHex(message);
      console.log("Message in hex:", messageHex);

      // Sign the message
      console.log("Signing message...");
      const signedMessage = await (window as any).tronWeb.trx.sign(messageHex);
      console.log("Signed message:", signedMessage);

      // Verify the signature
      const address = (window as any).tronWeb.defaultAddress.base58;
      const isValid = (window as any).tronWeb.trx.verifyMessage(
        messageHex,
        signedMessage,
        address
      );
      console.log("Signature is valid:", isValid);

      if (isValid) {
        alert(
          "Message signed and verified successfully! Check the console for details."
        );
      } else {
        alert(
          "Message signed, but verification failed. Check the console for details."
        );
      }
    } catch (error: any) {
      console.error("Error details:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
      <BackButton onClick={onBack}>← Back</BackButton>
      <ScrollableContent>
      <Container>
        <Title>Understanding Transaction Signing</Title>
        <TextTitle>
          In this step, you will learn how to sign a transaction using your
          TronLink wallet. Signing transactions is crucial to verify and authorize
          actions on the blockchain.
        </TextTitle>

        <Subtitle>What is Signing a Transaction?</Subtitle>
        <Text>
          Signing a transaction is a way to prove ownership and approve blockchain
          actions using your private key. Without signing, the network won't allow
          the transaction to proceed.
        </Text>

        <Subtitle>Why is Signing Important?</Subtitle>
        <Text>
          Signing ensures that only the wallet owner can authorize actions, making
          it secure and preventing unauthorized access to your funds.
        </Text>

        <Subtitle>How to Sign Using TronLink</Subtitle>
        <List>
          <ListItem>Ensure your TronLink wallet is unlocked.</ListItem>
          <ListItem>Click the "Sign Transaction" button below.</ListItem>
          <ListItem>Your TronLink wallet will prompt you to sign the transaction.</ListItem>
          <ListItem>Review the transaction details carefully.</ListItem>
          <ListItem>Click "Confirm" to sign the transaction.</ListItem>
        </List>

        <ButtonGroup>
        <Button onClick={handleSignTransaction}>Sign Transaction</Button>
        <ButtonCont onClick={()=>navigate('/')}>Continue Your Journey</ButtonCont>
        </ButtonGroup>
      </Container>
      </ScrollableContent>
      </PageWrapper>
    </>
  );
}