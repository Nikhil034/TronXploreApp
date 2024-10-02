import { useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'


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
  display:flex;
`


const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 20px;
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


const VerifyButton = styled(Button)`
  background: linear-gradient(45deg, #4caf50, #45a049);
`


// const ContinueButton = styled(Button)`
//   background: linear-gradient(45deg, #4caf50, #45a049);
// `

const ContinueButton = styled.button<{ disabled: boolean }>`
  background: ${({ disabled }) => (disabled ? 'linear-gradient(45deg, #4CAF50, #388E3C)' : 'linear-gradient(45deg, #4caf50, #388e3c)')};
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
  opacity: ${({disabled})=>(disabled?0.5:1)};


  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'translateY(-2px)')};
    box-shadow: ${({ disabled }) => (disabled ? 'none' : '0 6px 8px rgba(0, 0, 0, 0.15)')};
  }


  &::after {
    content: ${({ disabled }) =>
      disabled ? '"Keep going and unlock next task! 🚀"' : '""'};
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
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
`


const ResourceItem = styled.div`
  display: flex;
  justify-content: space-between;
`


interface TronResourceCheckerProps {
  onBack: () => void
}


export default function TronResourceChecker({ onBack }: TronResourceCheckerProps) {
  const [transactionHash, setTransactionHash] = useState('')
  const [lasthash,setLasthash]=useState('');
  const [resources, setResources] = useState<{ bandwidth: number; energy: number } | null>(null)
  const [error, setError] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const navigate = useNavigate()
  const [isValid, setIsValid] = useState(false)
  const [uniqueHashes, setUniqueHashes] = useState<Set<string>>(new Set())
  const [isApiCalled, setIsApiCalled] = useState(false)
  const [network,setNetwork]=useState('');

  const fetchTransactionUsage = async (transactionHash: string) => {
    try {
      if (!window.tronWeb || !window.tronWeb.ready) {
        toast.error('TronLink wallet is not installed or not logged in.', {
          position: 'top-center',
        });

      }

      const tronWeb = window.tronWeb
      const transactionInfo = await tronWeb.trx.getTransactionInfo(transactionHash)
      // console.log(transactionInfo);

      if (!transactionInfo) {
        throw new Error('Transaction info not found')
      }

      const bandwidth = transactionInfo.receipt?.net_usage || 0
      const energyUsed = transactionInfo.receipt?.energy_usage_total || 0
      // console.log(`${bandwidth} and ${energyUsed}`);

      return { bandwidth, energyUsed }
    } catch (error) {
      console.error('Error fetching transaction info:', error)
      throw new Error('Failed to fetch transaction resources')
    }
  }
  const isValidTronHash = (hash: string) => {
    // Basic validation: 64 character hex string
    return /^[0-9a-fA-F]{64}$/.test(hash)
  }

  const handleCheck = async () => {

    if (window.tronWeb && window.tronWeb.ready) {
      console.log("TronLink wallet is available and ready.");
      const tronWeb = window.tronWeb
      const currentNode = tronWeb.fullNode.host;
      if (currentNode.includes('api.trongrid.io')) {
        setNetwork("Mainnet");
        } else if (currentNode.includes('api.shasta.trongrid.io')) {
        setNetwork("Shasta");
       } else if (currentNode.includes('nile.trongrid.io')) {
        setNetwork("Nile");
       } else {
        console.log('User is connected to a custom or private network');
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
        if (uniqueHashes.has(transactionHash)) {
          toast.error('This transaction hash has already been checked', {
            position: 'top-center',
          })
          return
        }
  
        const { bandwidth, energyUsed } = await fetchTransactionUsage(transactionHash)
        setResources({ bandwidth, energy: energyUsed })
  
        setUniqueHashes(prev => new Set(prev).add(transactionHash))
  
        if (uniqueHashes.size === 2) {  // This will be the third unique hash
          const tronWeb = window.tronWeb
          const address = tronWeb.defaultAddress.base58;
          await callApi(address)
        } else {
          toast.success(`Transaction ${uniqueHashes.size + 1}/3 checked successfully`, {
            position: 'top-center',
          })
        }
      } catch (error: any) {
        setError(error.message)
        toast.error(error.message, {
          position: 'top-center',
        })
      }
    }
    else{
      toast.error('TronLink wallet is not installed or not logged in.', {
        position: 'top-center',
      });
    }
  }

  const callApi = async (address:string) => {
    try {
      
      const response = await axios.patch('https://api.tronxplore.blockchainbytesdaily.com/ws/users/user_task6', {address:address})
      // console.log("Response:",response.data);
      toast.success('Congratulations on completing your task! 🎉.', {
        position: 'top-center',
        duration: 5000,
      })
      setIsValid(true);
    } catch (error: any) {
      toast.error(`Failed to complete the task: ${error.message}`, {
        position: 'top-center',
      })
    }
  }

  return (
    <>
      <GlobalStyle />
      <Toaster/>
      <PageWrapper>
        <BackButton onClick={onBack}>← Back</BackButton>
        <ScrollableContent>
          <Container>
            <Title>Check Resources</Title>
            <Text>Enter your transaction hash to check your Tron resources</Text>
            <div>
            <Text>* Bandwidth is primarily used to pay for transactions that transfer TRX (TRON's cryptocurrency) or other assets (tokens), and it is measured in bytes.</Text>
            <Text><b>Bandwidth</b> = Transaction Size (in bytes)</Text>
            <Text>* The amount of energy consumed depends on the number of instructions executed by the smart contract and the Energy per operation (Energy per gas), similar to the concept of "gas" in Ethereum..</Text>
            <Text><b>Energy</b> = Energy used per instruction × Number of instructions executed by the smart contract</Text>
            </div>
            <br/>
            <Text>Note :- In order to complete this task you need to check 3 transaction hash resources,bandwidth and energy with 0 is mark as invalid hash and make sure you are on right network before check resource </Text>
            <Input
              type="text"
              placeholder="Enter transaction hash"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
            />


            <CheckButton onClick={handleCheck}>Check Resources</CheckButton>


            {error && (
              <AlertBox type="error">
                <AlertIcon>
                  <AlertCircle size={18} />
                </AlertIcon>
                {error}
              </AlertBox>
            )}


            {resources && (
              <>
                <ResourceDisplay>
                  <h3>Transaction Resources of {network} Network</h3>
                  <hr/><br/>
                  <ResourceItem>
                    <span>Bandwidth:</span>
                    <span>{resources.bandwidth}</span>
                  </ResourceItem>
                  <ResourceItem>
                    <span>Energy:</span>
                    <span>{resources.energy}</span>
                  </ResourceItem> 
                </ResourceDisplay>
              </>
            )}


              <ContinueButton disabled={!isValid} onClick={() => navigate('/')}>Continue Your Journey</ContinueButton>
          
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
