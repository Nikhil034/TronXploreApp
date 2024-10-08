import { useEffect, useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'
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

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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
  max-width: 600px;
  background-color: rgba(36, 36, 36, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(255, 0, 0, 0.2), 0 0 0 1px rgba(255, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out forwards;
  backdrop-filter: blur(10px);
  margin: 40px auto;
`

const Title = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3), 0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  margin-top: 0;
  display: flex;
`

const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
  // margin-bottom: 20px;
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

const Subtitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  color: #ff6666;
  margin-top: 24px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 20px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 4px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const Button = styled.button`
  cursor: pointer;
  color: #fff;
  transition: all 0.3s ease;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  display: inline-block;
  align-items: center;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 8px 5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
`

const CheckButton = styled(Button)`
  background: linear-gradient(45deg, #ff0000, #cc0000);
`

const ContinueButton = styled.button<{ disabled: boolean }>`
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
    content: ${({ disabled }) => (disabled ? '"Keep going and unlock next task! 🚀"' : '""')};
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

const AlertBox = styled.div<{ type: 'error' | 'success' }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 25px;
  background-color: ${(props) =>
    props.type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)'};
  border: 1px solid ${(props) => (props.type === 'error' ? '#ff0000' : '#00ff00')};
`

const AlertIcon = styled.span`
  margin-right: 10px;
`

const ResourceDisplay = styled.div`
  background: linear-gradient(145deg, rgba(26, 27, 30, 0.9), rgba(20, 21, 23, 0.9));
  border-radius: 16px;
  padding: 25px;
  margin: 25px 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`

const NetworkBadge = styled.div`
  display: inline-block;
  background: linear-gradient(45deg, #ff0000, #cc0000);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const ResourcesTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  margin: 0 0 20px 0;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
`

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0) 0%,
    rgba(255, 0, 0, 0.3) 50%,
    rgba(255, 0, 0, 0) 100%
  );
  margin: 20px 0;
`

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`

const ResourceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 0, 0, 0.1);
  }
`

const ResourceLabel = styled.div`
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const ResourceValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
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

const List = styled.ol`
  padding-left: 20px;
  counter-reset: item;
  list-style-type: none;
  margin-top: 20px;
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

interface TronResourceCheckerProps {
  onBack: () => void
}

export default function TronResourceChecker({ onBack }: TronResourceCheckerProps) {
  const [transactionHash, setTransactionHash] = useState('')
  const [resources, setResources] = useState<{ bandwidth: number; energy: number } | null>(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [isValid, setIsValid] = useState(false)
  const [uniqueHashes, setUniqueHashes] = useState<Set<string>>(new Set())
  const [network, setNetwork] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getWalletAddress = async () => {
      if (window.tronWeb && window.tronWeb.ready) {
        try {
          const address = window.tronWeb.defaultAddress.base58
          setWalletAddress(address)
        } catch (error) {
          console.error('Error getting wallet address:', error)
        }
      }
    }

    getWalletAddress()
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
        const taskStatus = response.data.is_check_bandwidth_task6 // Adjust based on the actual response structure
        setIsTaskCompleted(taskStatus) // Update the state based on the task status
        setIsValid(taskStatus)
      } catch (error) {
        console.error('Error fetching task status:', error)
        toast.error('Failed to fetch task status.')
      }
    }
    fetchTaskStatus()
  }, []) // Empty dependency array to run only on component mount

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
    if (taskStatus['is_check_bandwidth_task6']) {
      setIsValid(true)
    }
  }, [])

  const fetchTransactionUsage = async (transactionHash) => {
    try {
      if (!window.tronWeb || !window.tronWeb.ready) {
        toast.error('TronLink wallet is not installed or not logged in.', {
          position: 'top-center',
        })
        return
      }

      const tronWeb = window.tronWeb

      // Wait for transaction confirmation (5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 5000))

      const transactionInfo = await tronWeb.trx.getTransactionInfo(transactionHash)
      console.log(transactionInfo) // Log full transaction info for debugging

      if (!transactionInfo) {
        throw new Error('Transaction info not found')
      }

      const bandwidth = transactionInfo.receipt?.net_usage || 0
      const energyUsed = transactionInfo.receipt?.energy_usage_total || 0

      console.log(`Bandwidth: ${bandwidth}, Energy Used: ${energyUsed}`)

      if (bandwidth && energyUsed) {
        return { bandwidth, energyUsed }
      }
      return undefined
    } catch (error) {
      console.error('Error fetching transaction info:', error)
      return undefined
      // throw new Error('Failed to fetch transaction resources')
    }
  }

  const isValidTronHash = (hash: string) => {
    // Basic validation: 64 character hex string
    return /^[0-9a-fA-F]{64}$/.test(hash)
  }

  const handleCheck = async () => {
    if (window.tronWeb && window.tronWeb.ready) {
      // console.log('TronLink wallet is available and ready.')
      const tronWeb = window.tronWeb
      const currentNode = tronWeb.fullNode.host
      if (currentNode.includes('api.trongrid.io')) {
        setNetwork('Mainnet')
      } else if (currentNode.includes('api.shasta.trongrid.io')) {
        setNetwork('Shasta')
      } else if (currentNode.includes('nile.trongrid.io')) {
        setNetwork('Nile')
      } else {
        console.log('User is connected to a custom or private network')
      }
      if (!transactionHash) {
        setError('Please enter a transaction hash')
        return
      }

      if (!isValidTronHash(transactionHash)) {
        setError('Invalid transaction hash format')
        return
      }

      setError('')

      try {
        setLoading(true)
        const transactionResult = await fetchTransactionUsage(transactionHash)
        if (transactionResult) {
          const { bandwidth, energyUsed } = transactionResult
          console.log(`Bandwidth: ${bandwidth}, Energy Used: ${energyUsed}`)
        } else {
          console.log('Failed to fetch transaction usage.')
        }
        setUniqueHashes((prev) => new Set(prev).add(transactionHash))
        const tronWeb = window.tronWeb
        const address = tronWeb.defaultAddress.base58
        await callApi(address)
      } catch (error: any) {
        setError(error.message)
        toast.error(error.message, {
          position: 'top-center',
        })
        setLoading(false)
      }
    } else {
      toast.error('TronLink wallet is not installed or not logged in.', {
        position: 'top-center',
      })
      setLoading(false)
    }
  }

  const callApi = async (address: string) => {
    try {
      const response = await axios.patch(
        'https://api.tronxplore.blockchainbytesdaily.com/api/users/user_task6',
        {
          address: address,
        }
      )
      // // console.log("Response:",response.data);
      toast.success('Congratulations on completing your task! 🎉.', {
        position: 'top-center',
        duration: 5000,
      })
      setIsValid(true)
      setLoading(false)
      updateTaskStatus('is_check_bandwidth_task6')
    } catch (error: any) {
      toast.error(`Failed to complete the task: ${error.message}`, {
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
            <Title>Check Resources</Title>
            {/* <Text>Enter your transaction hash to check your Tron resources</Text> */}
            <Subtitle>Bandwidth</Subtitle>
            <HighlightedText>
              <Text>
                Bandwidth is primarily used to pay for transactions that transfer TRX (TRON's
                cryptocurrency) or other assets (tokens), and it is measured in bytes.
              </Text>
              <Text>
                <b>Bandwidth</b> = Transaction Size (in bytes)
              </Text>
            </HighlightedText>
            <Subtitle>Energy</Subtitle>
            <HighlightedText>
              <Text>
                The amount of energy consumed depends on the number of instructions executed by the
                smart contract and the Energy per operation (Energy per gas), similar to the concept
                of "gas" in Ethereum..
              </Text>
              <Text>
                <b>Energy</b> = Energy used per instruction × Number of instructions executed by the
                smart contract
              </Text>
            </HighlightedText>
            <br />

            <Text>
              For completing your task, you need to check bandwidth and energy. Follow these steps:
            </Text>
            <List>
              <ListItem>
                Visit the{' '}
                <Link
                  href={`https://shasta.tronscan.org/#/address/${walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tronscan website
                </Link>
                .
              </ListItem>
              <ListItem>Go to your last transaction.</ListItem>
              <ListItem>Check the bandwidth and energy usage for that transaction.</ListItem>
              <ListItem>Copy the transaction hash.</ListItem>
              <ListItem>Paste the transaction hash in the input field below.</ListItem>
              <ListItem>Click "Check Resources" to verify that your task is completed.</ListItem>
            </List>
            <Input
              type="text"
              placeholder="Enter transaction hash"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
            />

            <CheckButton onClick={handleCheck} disabled={isTaskCompleted || loading}>
              {loading ? (
                <ScaleLoader height={15} width={4} color="white" />
              ) : isTaskCompleted ? (
                'Task Completed'
              ) : (
                'Check Resources'
              )}
            </CheckButton>

            {error && (
              <AlertBox type="error">
                <AlertIcon>
                  <AlertCircle size={18} />
                </AlertIcon>
                {error}
              </AlertBox>
            )}

            {resources && (
              <ResourceDisplay>
                <NetworkBadge>{network}</NetworkBadge>
                <ResourcesTitle>
                  <span>Transaction Resources</span>
                </ResourcesTitle>
                <Divider />
                <ResourcesGrid>
                  <ResourceCard>
                    <ResourceLabel>Bandwidth</ResourceLabel>
                    <ResourceValue>{resources.bandwidth}</ResourceValue>
                  </ResourceCard>
                  <ResourceCard>
                    <ResourceLabel>Energy</ResourceLabel>
                    <ResourceValue>{resources.energy}</ResourceValue>
                  </ResourceCard>
                </ResourcesGrid>
              </ResourceDisplay>
            )}

            <ContinueButton disabled={!isValid} onClick={() => navigate('/')}>
              {isTaskCompleted ? 'Continue Your Journey' : 'Complete Task to Continue'}
            </ContinueButton>
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
