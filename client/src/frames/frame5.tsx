import axios from 'axios'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
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

const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
`

const HighlightedText = styled(Text)`
  margin-bottom: 15px;
  background-color: rgb(82 79 79 / 80%);
  padding: 20px;
  border-left: 4px solid #cc0000;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`

const List = styled.ol`
  padding-left: 20px;
  counter-reset: item;
  list-style-type: none;
`

const slideIn = keyframes`
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

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
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  display: inline-block;
  align-items: center;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 20px 5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(255, 0, 0, 0.15);
  }
`

const SentTitle = styled.p`
  font-family: 'Orbitron', sans-serif;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 30px;
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

const ButtonCont = styled.button<{ disabled: boolean }>`
  background: ${({ disabled }) =>
    disabled
      ? 'linear-gradient(45deg, #4CAF50, #388E3C)'
      : 'linear-gradient(45deg, #4caf50, #388e3c)'};
  color: ${({ disabled }) => (disabled ? '#fff' : 'white')};
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-block;
  align-items: center;
  width: fit-content;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 10px 5px;
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-2px)')};
    box-shadow: ${({ disabled }) => (disabled ? 'none' : '0 6px 8px rgba(0, 0, 0, 0.15)')};
  }

  &::after {
    content: ${({ disabled }) =>
      disabled ? '"Fantastic job so far! Wrap up this task to unlock next! 🌈🔓"' : '""'};
    position: absolute;
    bottom: -80%; // Adjust as needed for the tooltip placement
    left: 70%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 60, 0.8);
    color: white;
    padding: 8px;
    border-radius: 5px;
    font-size: 13px;
    white-space: nowrap;
    display: ${({ disabled }) =>
      disabled ? 'none' : 'block'}; // Hide by default when not disabled
    opacity: 0; // Start with opacity 0
    transition: opacity 0.2s ease; // Smooth transition for opacity
  }

  &:hover::after {
    display: ${({ disabled }) => (disabled ? 'block' : 'none')}; // Show only when disabled
    opacity: ${({ disabled }) =>
      disabled ? '1' : '0'}; // Make it fully visible only when disabled
  }
`

interface SendTRXProps {
  onBack: () => void
}

export default function SendTRX({ onBack }: SendTRXProps) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [isValid, setIsValid] = useState(false)

  const getTaskStatus = (): Record<string, boolean> => {
    const taskStatus = localStorage.getItem('tasks_status')
    return taskStatus ? JSON.parse(taskStatus) : {}
  }

  const updateTaskStatus = (taskKey: string) => {
    const taskStatus = getTaskStatus()
    taskStatus[taskKey] = true
    localStorage.setItem('tasks_status', JSON.stringify(taskStatus))
  }

  useEffect(() => {
    // Check if the task is already completed when component mounts
    const taskStatus = getTaskStatus()
    if (taskStatus['is_send_trx_task5']) {
      setIsValid(true)
    }
  }, [])

  const handleSend = async () => {
    try {
      if (window.tronWeb && window.tronWeb.ready) {
        const tronLink = window.tronWeb
        const address = tronLink.defaultAddress.base58

        if (!recipient || !amount) {
          toast.error('Please enter both recipient address and amount.', {
            position: 'top-center',
          })
          return
        }

        // Validate recipient address
        if (!tronLink.isAddress(recipient)) {
          toast.error('Invalid recipient address.', {
            position: 'top-center',
          })
          return
        }

        // Validate amount
        const amountInSun = tronLink.toSun(amount)
        if (isNaN(amountInSun) || amountInSun <= 0) {
          toast.error('Invalid amount.', {
            position: 'top-center',
          })
          return
        }

        const transaction = await tronLink.transactionBuilder.sendTrx(recipient, amountInSun)
        const signedTransaction = await tronLink.trx.sign(transaction)
        const result = await tronLink.trx.sendRawTransaction(signedTransaction)

        console.log(result)
        console.log(result.txid)

        if (result.result) {
          const response = await axios.patch('https://api.tronxplore.blockchainbytesdaily.com/api/users/user_task5', {
            address: address,
            recepient_address: recipient,
            amount: amount,
            txhash: result.txid,
          })
          // console.log(response.data);
          toast.success('Congratulations on completing your task! 🎉', {
            position: 'top-center',
          })
          setRecipient('')
          setAmount('')
          setIsValid(true)
          updateTaskStatus('is_send_trx_task5')
        } else {
          toast.error('Transaction Failed!', {
            position: 'top-center',
          })
        }
      } else {
        toast.error('TronLink wallet is not installed or not logged in.', {
          position: 'top-center',
        })
      }
    } catch (error) {
      console.error('Error: ', error)
      toast.error('An error occurred while sending TRX.', {
        position: 'top-center',
      })
    }
  }

  return (
    <>
      <GlobalStyle />
      <Toaster />
      <PageWrapper>
        <BackButton onClick={onBack}>← Back to Game</BackButton>
        <ScrollableContent>
          <Container>
            <Title>Send TRX to Another Address</Title>
            <HighlightedText>
              To safely test transactions, you can create a sub-account on TronLink. This allows you
              to test with smaller amounts of TRX without risking your main account.
            </HighlightedText>

            <List>
              <ListItem>Open your TronLink wallet and navigate to the "Accounts" tab.</ListItem>
              <ListItem>
                Click "Create Sub-account" and follow the instructions to generate a new
                sub-account.
              </ListItem>
              <ListItem>
                Transfer a small amount of TRX to the sub-account for testing purposes.
              </ListItem>
              <ListItem>Use the sub-account's address for safe testing in this step.</ListItem>
            </List>

            <SentTitle>Now you can start sending TRX</SentTitle>
            <Text>
              Follow the steps below to safely send TRX using your TronLink wallet. If you created a
              sub-account for testing, you can use the sub-account's address here.
            </Text>

            <Subtitle>Step 1: Enter the Recipient's/Sub-account's Address</Subtitle>
            <Input
              type="text"
              placeholder="Enter Tron address here..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />

            <Subtitle>Step 2: Enter the Amount of TRX to Send</Subtitle>
            <Input
              type="number"
              placeholder="Enter amount of TRX..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Subtitle>Step 3: Confirm the Transaction</Subtitle>
            <Text>
              Once you press the "Send" button, a transaction will be initiated in your TronLink
              wallet. Please review the details carefully before signing the transaction.
            </Text>

            <Button onClick={handleSend}>Send TRX</Button>
            <ButtonCont disabled={!isValid} onClick={onBack}>
              Continue Your Journey
            </ButtonCont>
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
