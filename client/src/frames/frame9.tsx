import { useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'

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
`

const fadeIn = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`

const Container = styled.div`
  max-width: 650px;
  background-color: rgba(36, 36, 36, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(255, 0, 0, 0.2), 0 0 0 1px rgba(255, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.5s ease-out forwards;
  backdrop-filter: blur(10px);
  margin: auto;
`

const Title = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3), 0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
`

const Subtitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-weight: 500;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: left;
  color: #ff6666;
`

const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
`
const TextTRX = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 10px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 5px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const Button = styled.button`
  background: linear-gradient(45deg, #ff0000, #cc0000);
  color: white;
  border: none;
  padding: 8px 24px;
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
`
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 10px auto;
`

const TxnHashWrapper = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
`

const TxnHashDisplay = styled.input`
  width: calc(100% - 100px);
  margin-right: 10px;
`

const CopyButton = styled(Button)`
  width: 80px;
`

const Link = styled.a`
  color: #ff6666;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #ff9999;
  }

  &::after {
    content: '';
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
`

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
`

interface SendTRXProps {
  onBack: () => void
}

export default function SendTRX({ onBack }: SendTRXProps) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [hash, setHash] = useState('')
  const [txnHash, setTxnHash] = useState('')
  const [showTxnHash, setShowTxnHash] = useState(false)

  const handleSend = async () => {
    if (!recipient || !amount) {
      alert('Please enter both recipient address and amount.')
      return
    }

    try {
      // Call the TronLink API to send TRX (Example, you need actual TronLink logic here)
      const tronLink = (window as any).tronWeb
      const transaction = await tronLink.transactionBuilder.sendTrx(
        recipient,
        tronLink.toSun(amount)
      )
      const signedTransaction = await tronLink.trx.sign(transaction)
      const result = await tronLink.trx.sendRawTransaction(signedTransaction)

      if (result.txid) {
        alert('Transaction successfully sent!')
        setTxnHash(result.txid)
        setShowTxnHash(true)
      } else {
        alert('Transaction failed.')
      }
    } catch (error) {
      alert('An error occurred while sending TRX.')
      console.error('Error: ', error)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(txnHash)
    alert('Transaction hash copied to clipboard!')
  }

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <BackButton onClick={onBack}>← Back to Game</BackButton>
        <ScrollableContent>
          <Container>
            <Title>Approve Tokens and Transfer TRC20</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, rerum. Alias, accusantium. Sit aperiam blanditiis necessitatibus, quam ullam mollitia odit?
            </Text>

            <Subtitle>Enter the Recipient's Address</Subtitle>
            <Input
              type="text"
              placeholder="Enter Tron address here..."
              value={recipient}
              //   onChange={(e) => setRecipient(e.target.value)}
            />

            <Subtitle>Enter the Amount of TRX to Send</Subtitle>
            <Input
              type="number"
              placeholder="Enter amount of TRX..."
              value={amount}
              //   onChange={(e) => setAmount(e.target.value)}
            />

            <ButtonContainer>
              <Button>Send Now</Button>
            </ButtonContainer>

            <Subtitle>Transaction Hash</Subtitle>
            <TextTRX>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, facere qui voluptate corrupti ea harum.
            </TextTRX>
            <Input
              type="text"
              placeholder="Enter transaction hash"
              value={hash}
              //   onChange={(e) => setAmount(e.target.value)}
            />

            <ButtonContainer>
              <Button>Check</Button>
            </ButtonContainer>

            <TxnHashWrapper visible={showTxnHash}>
              <Subtitle>Transaction Hash:</Subtitle>
              <TxnHashDisplay type="text" value={txnHash} readOnly />
              <CopyButton onClick={handleCopy}>Copy</CopyButton>
              <Link href={`https://shasta.tronscan.org/#/transaction/${txnHash}`} target="_blank">
                View on TronScan
              </Link>
            </TxnHashWrapper>
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
