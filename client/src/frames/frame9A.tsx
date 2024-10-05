import { useEffect, useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { Copy, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { ScaleLoader } from 'react-spinners'
import Cookies from 'js-cookie';

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
  margin-bottom: 20px;
`

const AddressDisplay = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`

const Address = styled.span`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: #ff6666;
  cursor: pointer;
  padding: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff9999;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
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
  margin: 10px 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(255, 0, 0, 0.15);
  }
`
const ButtonCont = styled(Button)`
  background: linear-gradient(45deg, #4caf50, #388e3c);
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 20px auto;
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
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s ease;

  &:hover {
    color: #ff9999;
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
  const navigate = useNavigate()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState<number>();
  const [txnHash, setTxnHash] = useState('')
  const [showVerificationSteps, setShowVerificationSteps] = useState(false)
  const [verificationUrl,setVerificationURL]=useState('');
  const [address,setUseraddress]=useState('');
  const [verificationHash, setVerificationHash] = useState('')
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the task status when the component loads
    const fetchTaskStatus = async () => {
      try {
        const username = Cookies.get('username');
        // console.log(username);
        const response = await axios.get(`https://api.tronxplore.blockchainbytesdaily.com/api/users/${username}/tasks-status`);
        const taskStatus = response.data.is_trc20_send_task9; // Adjust based on the actual response structure
        setIsTaskCompleted(taskStatus); // Update the state based on the task status
        // setIsValid(taskStatus);
      } catch (error) {
        console.error('Error fetching task status:', error);
        toast.error('Failed to fetch task status.');
      }
    };
    fetchTaskStatus();
  }, []); // Empty dependency array to run only on component mount
 

  const handleSend = async () => {
    if (window.tronWeb && window.tronWeb.ready) {
      if (!recipient || !amount) {
        toast.error('Please enter both the recipient address and the amount of tokens to send.', {
          position: 'top-center',
        });
        return;
      }
  
      try {
        const userAddress = window.tronWeb.defaultAddress.base58;
        setUseraddress(userAddress);
        const contractAddress=await axios.get(`https://api.tronxplore.blockchainbytesdaily.com/api/users/${userAddress}/trc20mintcontract`);
  
        // TRC-20 standard ABI
        const trc20ABI = [
          {
            "constant": false,
            "inputs": [
              { "name": "_to", "type": "address" },
              { "name": "_value", "type": "uint256" }
            ],
            "name": "transfer",
            "outputs": [{ "name": "", "type": "bool" }],
            "type": "function"
          }
        ];
  
        // Get contract instance using explicit ABI
        const contract = await window.tronWeb.contract(trc20ABI, contractAddress.data.trc20mint_contract_address);
  
        // Convert amount to correct number of decimals (assuming 18 decimals)
        const tokenDecimals = 18;
        const tokenAmount = window.tronWeb.toBigNumber((amount) * (10 ** tokenDecimals));
  
        // Send the transaction
        const transaction = await contract.transfer(recipient, tokenAmount.toString()).send();
  
        // Get transaction hash
        const txnHash = transaction; // In TronWeb, the send function returns the transaction hash
        setVerificationURL(`https://nile.tronscan.org/#/address/${userAddress}`);
        // console.log(txnHash);
        setTxnHash(txnHash);
        setShowVerificationSteps(true);
        toast.success(`Transaction sent successfully!}`, {
          position: 'top-center',
        });
      } catch (error) {
        console.error('Error sending tokens:', error);
        toast.error('Error sending tokens. Please try again.', {
          position: 'top-center',
        });
      }
    } else {
      toast.error('TronLink wallet is not installed or not logged in.', {
        position: 'top-center',
      });
    }
  };
  

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(verificationUrl)
    alert('Verification URL copied to clipboard!')
  }

  const handleVerify = async() => {
    try {
      // Get transaction info
      if (window.tronWeb && window.tronWeb.ready)
        {
          
        setLoading(true);
        const txInfo = await window.tronWeb.trx.getTransaction(txnHash);
        let energyUsage=""
        
        // Extract ref_block_number from raw_data
        const refBlockNumber = parseInt(txInfo.raw_data.ref_block_bytes, 16);

        // console.log(`Reference Block Number: ${refBlockNumber}`);

        // Get detailed transaction info
        const txInfoDetails = await window.tronWeb.trx.getTransactionInfo(txnHash);

        // Extract actual block number and bandwidth usage
        const blockNumber = txInfoDetails.blockNumber;
        const bandwidthUsage = txInfoDetails.receipt.net_usage || txInfoDetails.receipt.net_fee;

        // console.log(`Actual Block Number: ${blockNumber}`);
        // console.log(`Bandwidth Usage: ${bandwidthUsage}`);

        // If energy was used instead of bandwidth
        if (txInfoDetails.receipt.energy_usage || txInfoDetails.receipt.energy_fee) {
            energyUsage = txInfoDetails.receipt.energy_usage || txInfoDetails.receipt.energy_fee;
            // console.log(`Energy Usage: ${energyUsage}`);
        }
        
        const response = await axios.patch('https://api.tronxplore.blockchainbytesdaily.com/api/users/user_task9 ', { address: address,txhash:txnHash,blockno:blockNumber,bandwidth:energyUsage });
         toast.success("Congratulations on completing your task! 🎉", {
          position: 'top-center',
         });
         setLoading(false);

      }
      
    
  } catch (error) {
      console.error('Error:', error);
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
            <Title>Send TRX </Title>

            <Text>
              Now, you can send your tokens to another address. Please enter the recipient's address
              and the amount you wish to send.
            </Text>

            <Subtitle>Enter the Recipient's/Subaccount's Address</Subtitle>
            <Input
              type="text"
              placeholder="Enter address of recipient..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              aria-label="Recipient's address"
            />

            <Subtitle>Enter the Amount of TRX to Send</Subtitle>
            <Input
              type="number"
              placeholder="Enter amount of TRX..."
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              aria-label="Amount of TRX to send"
            />

            <ButtonContainer>
              <Button onClick={handleSend} disabled={isTaskCompleted}>{isTaskCompleted?'Task Completed':'Send Now'}</Button>
            </ButtonContainer>

            {showVerificationSteps && (
              <>
                <Subtitle>Transaction Sent</Subtitle>
                <Text>
                  Your transaction has been sent successfully🎉. Please follow these steps to verify
                  your transaction:
                </Text>

                <Subtitle>Verification URL</Subtitle>
                <AddressDisplay>
                  <Address>{verificationUrl}</Address>
                  <IconButton onClick={handleCopyUrl} aria-label="Copy verification URL">
                    <Copy size={20} />
                  </IconButton>
                </AddressDisplay>

                <ButtonContainer>
                  <Link href={verificationUrl} target="_blank" rel="noopener noreferrer">
                    Open Verification URL <ExternalLink size={16} style={{ marginLeft: '5px' }} />
                  </Link>
                </ButtonContainer>

                <List>
                  <Subtitle>Steps : </Subtitle>
                  <ListItem>
                    Click the "Open Verification URL" button above to view your transaction details.
                  </ListItem>
                  <ListItem>
                    On the opened page, locate and copy the transaction hash of your last
                    transaction.
                  </ListItem>
                  <ListItem>Paste the copied transaction hash in the input field below.</ListItem>
                  <ListItem>
                    Click the "Verify Transaction" button to confirm your transaction.
                  </ListItem>
                </List>

                <Subtitle>Enter Transaction Hash for Verification</Subtitle>
                <Input
                  type="text"
                  placeholder="Paste the transaction hash here..."
                  value={verificationHash}
                  onChange={(e) => setVerificationHash(e.target.value)}
                  aria-label="Transaction hash for verification"
                />

                <ButtonContainer>
                  <Button onClick={handleVerify}>{loading ? <ScaleLoader height={15} width={4} color="white" /> : 'Verify Transaction'}</Button>
                  <ButtonCont onClick={() => navigate('/')}>Continue Your Journey</ButtonCont>
                </ButtonContainer>
              </>
            )}
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
