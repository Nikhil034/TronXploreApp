import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'
import { taskCompleted } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions'
import { ScaleLoader } from 'react-spinners'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;400;600&display=swap');

  body {
    font-family: "Poppins", sans-serif;
    background-color: #000000;
    color: #ffffff;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    overflow: hidden;
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
`

const fadeInn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
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

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
  }
`

const Container = styled.div`
  max-width: 650px;
  background-color: rgba(36, 36, 36, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(255, 0, 0, 0.2), 0 0 0 1px rgba(255, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeInn} 0.5s ease-out forwards;
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

const CardTitle = styled.h4`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #ff6666;
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
  margin: 10px 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(255, 0, 0, 0.15);
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
      disabled
        ? '"Your dedication has brought you here, now it\'s time to complete the journey 🏆"'
        : '""'};
    position: absolute;
    bottom: 100%; // Adjust as needed for the tooltip placement
    left: 50%;
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
const ButtonGroup = styled.div`
  display: flex;
  margin-top: 30px;
  gap: 10px;
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
  margin: 20px auto 20px 20px;

  &:hover {
    background-color: #b91c1c;
  }
`

const SubTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
  text-align: center;
  margin-bottom: 1.5rem;
  margin-top: 40px;
  font-size: 2rem;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 5px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const List = styled.ol`
  padding-left: 20px;
  counter-reset: item;
  list-style-type: none;
  margin-bottom: 50px;
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
const Link = styled.a`
  color: #ff6666;
  display: flex;
  align-items: center;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
interface TronEnergyExplainerProps {
  onBack: () => void
}

export default function TronEnergyExplainer({ onBack }: TronEnergyExplainerProps) {
  const [address, setAddress] = useState('')
  const [blockno, setBlockno] = useState('')
  const [energy, setEnergy] = useState('')
  const [isValid, setIsValid] = useState(false)
  const navigate = useNavigate()
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false)
  // const [netfee, setNetfee] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!window.tronWeb || !window.tronWeb.ready) {
      toast.error('TronLink wallet is not installed or not logged in.', {
        position: 'top-center',
      })
      return
    }
    const userAddress = window.tronWeb.defaultAddress.base58
    setAddress(userAddress)
  }, [])

  useEffect(() => {
    // Fetch the task status when the component loads
    const fetchTaskStatus = async () => {
      try {
        const username = Cookies.get('username')
        // console.log(username);
        const response = await axios.get(
          `https://api.tronxplore.blockchainbytesdaily.com/api/users/${username}/tasks-status`
        )
        const taskStatus = response.data.is_view_transaction_task10 // Adjust based on the actual response structure
        setIsTaskCompleted(taskStatus) // Update the state based on the task status
        setIsValid(taskStatus)
        // setIsValid(taskStatus);
      } catch (error) {
        console.error('Error fetching task status:', error)
        toast.error('Failed to fetch task status.')
      }
    }
    fetchTaskStatus()
  }, []) // Empty dependency array to run only on component mount

  const HandleTransaction = async () => {
    setLoading(true)
    let netFee = 0
    const getdetails = await axios.get(
      `https://api.tronxplore.blockchainbytesdaily.com/api/users/${address}/trc20-send-blockno-bandwidth`
    )
    // console.log(getdetails.data.trc20_send_blockno_nile)
    // console.log(getdetails.data.trc20_send_bandwidth_nile)

    const block = await window.tronWeb.trx.getBlock(getdetails.data.trc20_send_blockno_nile)

    if (!block || !block.transactions) {
      setLoading(false)
      throw new Error('Block not found or has no transactions.')
    }

    // Initialize total bandwidth usage
    let totalBandwidthUsage = 0

    // Iterate through each transaction to calculate total bandwidth usage
    for (const transaction of block.transactions) {
      console.log(`Transaction ID: ${transaction.txID}`)

      // Fetch transaction info
      const transactionInfo = await window.tronWeb.trx.getTransactionInfo(transaction.txID)

      if (transactionInfo && transactionInfo.receipt) {
        const netUsage = transactionInfo.receipt.net_usage || 0 // Get net usage
        netFee = transactionInfo.receipt.net_fee || 0 // Get net fee if needed

        // Log the usage details
        console.log(`Net Usage for ${transaction.txID}: ${netUsage}`)
        console.log(`Net Fee for ${transaction.txID}: ${netFee}`)
        // setNetfee(netFee)

        totalBandwidthUsage += netUsage // Add the net usage for each transaction
      } else {
        console.log(`No receipt found for transaction ${transaction.txID}`)
      }
    }

    // console.log(
    //   `Total bandwidth usage for block ${getdetails.data.trc20_send_blockno_nile}: ${totalBandwidthUsage}`
    // )

    if (
      blockno == getdetails.data.trc20_send_blockno_nile &&
      netFee == getdetails.data.trc20_send_bandwidth_nile
    ) {
      const response = await axios.patch(
        'https://api.tronxplore.blockchainbytesdaily.com/api/users/user_task10',
        { address: address }
      )
      // console.log("Response:",response.data);
      if (response.data) {
        toast.success('Congratulations on completing Final task! 🎉', {
          position: 'top-center',
        })
        setBlockno('')
        setEnergy('')
        setLoading(false)
      }
      setIsValid(true)
    } else {
      toast.error('Incorrect Blockno or Bandwidth found,try again!', {
        position: 'top-center',
      })
      setLoading(false)
    }
  }

  return (
    <>
      <GlobalStyle />
      <Toaster />
      <PageWrapper>
        <BackButton onClick={onBack}>← Back</BackButton>
        <ScrollableContent>
          <Container>
            <Title>View Transaction</Title>

            <CardTitle>Follow these steps to find your transaction details:</CardTitle>
            <List>
              <ListItem className="flex items-center gap-1">
                Go to{' '}
                <Link
                  href={`https://nile.tronscan.org/#/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nile Tronscan
                  <ExternalLink size={14} style={{ marginLeft: '5px' }} />
                </Link>
              </ListItem>
              <ListItem>Scroll down to the "Transactions" section</ListItem>
              <ListItem>
                Find your most recent transaction on the Nile testnet regarding TRC-20 token
              </ListItem>
              <ListItem>Click on the transaction to view its details</ListItem>
              <ListItem>Look for the "Block" and "Bandwidth" information</ListItem>
            </List>

            <SubTitle>Let's check your knowledge</SubTitle>

            <CardTitle>Enter your last transcation block number</CardTitle>
            <Input
              type="number"
              placeholder="Enter transcation block number..."
              value={blockno}
              onChange={(e) => setBlockno(e.target.value)}
            />
            <CardTitle> Enter your last transaction Energy</CardTitle>
            <Input
              type="number"
              placeholder="Enter Bandwidth here..."
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
            />

            <ButtonGroup>
              <Button onClick={HandleTransaction} disabled={isTaskCompleted || loading}>
                {loading ? (
                  <ScaleLoader height={15} width={4} color="white" />
                ) : isTaskCompleted ? (
                  'Task Completed'
                ) : (
                  'Check it!'
                )}
              </Button>
              <ButtonCont onClick={() => navigate('/')} disabled={!isValid}>
                Finish
              </ButtonCont>
            </ButtonGroup>
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
