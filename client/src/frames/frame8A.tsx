import { useEffect, useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { ScaleLoader } from 'react-spinners'
import Cookies from 'js-cookie'

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

const Description = styled.p`
  margin-bottom: 15px;
  font-size: 14px;
`

const InputGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  font-family: 'Orbitron', sans-serif;
  display: block;
  margin-bottom: 5px;
  color: #ff6666;
  font-weight: 700;
  font-size: 20px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 4px;
  font-size: 14px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const HighlightedText = styled.p`
  margin-bottom: 15px;
  margin-top: 30px;
  background-color: rgb(82 79 79 / 80%);
  padding: 20px;
  border-left: 4px solid #cc0000;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`
const HighlightedText2 = styled(HighlightedText)`
  margin-bottom: 50px;
`

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 30px;
`

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
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0 10px;
  text-decoration: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`

const ButtonCont = styled(Button)`
  background: linear-gradient(45deg, #4caf50, #388e3c);
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

const ContractAddressBox = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ContractAddress = styled.span`
  font-family: 'Orbitron', sans-serif;
  color: #ff6666;
`

interface CopyButtonProps {
  copied: boolean
}

const CopyButton = styled.button<CopyButtonProps>`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, width 0.3s;
  min-width: 100px;

  &:hover {
    background-color: ${(props) => (props.copied ? '#45a049' : '#45a049')};
  }
`

const List = styled.ol`
  padding-left: 20px;
  counter-reset: item;
  list-style-type: none;
  margin-bottom: 30px;
  margin-top: 20px;
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

const InstructionsList = styled.ol`
  font-size: 14px;
  margin-top: 20px;
  padding-left: 20px;
  list-style: number;
`

const InstructionItem = styled.li`
  margin-bottom: 10px;
`

const DiscList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 10px;
`

const Lists = styled.li`
  margin-bottom: 5px;
`

interface MintTRC20TokensProps {
  onBack: () => void
}

export default function MintTRC20Tokens({ onBack }: MintTRC20TokensProps) {
  const navigate = useNavigate()
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [initialSupply, setInitialSupply] = useState('')
  const [contractAddress, setContractAddress] = useState('')
  const [isTokenMinted, setIsTokenMinted] = useState(false)
  const [isTokenVerified, setIsTokenVerified] = useState(false)
  const [copyButtonText, setCopyButtonText] = useState('Copy Address')
  const [trc20_adddress, setTrc20address] = useState('')
  const [address, Setaddress] = useState('')
  const [txhash, Settxhash] = useState('')
  const [txhashlink, SettxhashLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingtrx,setLoadingtrx]=useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false)
  const [isValid, setIsValid] = useState(false)
  const [isdissable,setDisablemint]=useState(false);

  useEffect(() => {
    // Check if the task is already completed when component mounts
    const taskStatus = getTaskStatus()
    if (taskStatus['is_trc20_mint_task8']) {
      setIsValid(true)
    }
  }, [])

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
    // Fetch the task status when the component loads
    const fetchTaskStatus = async () => {
      try {
        const username = Cookies.get('username')
        // console.log(username);
        const response = await axios.get(
          `https://api.tronxplore.blockchainbytesdaily.com/api/users/${username}/tasks-status`
        )
        const taskStatus = response.data.is_trc20_mint_task8 // Adjust based on the actual response structure
        setIsTaskCompleted(taskStatus) // Update the state based on the task status
        setIsValid(taskStatus)
      } catch (error) {
        console.error('Error fetching task status:', error)
        toast.error('Failed to fetch task status.')
      }
    }
    fetchTaskStatus()
  }, []) // Empty dependency array to run only on component mount

  const handleMint = async () => {
    if (!window.tronWeb || !window.tronWeb.ready) {
      toast.error('TronLink wallet is not installed or not logged in.', {
        position: 'top-center',
      })
      return
    }

    if (!tokenName || !tokenSymbol || !initialSupply || parseInt(initialSupply, 10) <= 0) {
      toast.error('Please enter valid details for the token!', {
        position: 'top-center',
      })
      return
    }

    try {
      setLoadingtrx(true)
      const userAddress = window.tronWeb.defaultAddress.base58
      Setaddress(userAddress)
      const FACTORY_ADDRESS = 'TD25qAECSNdpcTDFhDj3Ffa6hf1sZUstJL'
      const DEFAULT_DECIMALS = 18

      const contract = await window.tronWeb.contract().at(FACTORY_ADDRESS)
      const bigIntSupply = BigInt(initialSupply) * BigInt(10 ** DEFAULT_DECIMALS)

      const transaction = await contract
        .createToken(tokenName, tokenSymbol, userAddress, bigIntSupply.toString())
        .send({ feeLimit: 400000000 })

      // console.log('Transaction sent:', transaction);
      Settxhash(transaction)

      const tronScannileLink = `https://nile.tronscan.org/#/transaction/${transaction}`
      SettxhashLink(tronScannileLink)

      // Set up a loop to check for the transaction receipt
      let receipt
      let attempts = 0
      const maxAttempts = 10
      const delayBetweenAttempts = 5000 // 5 seconds

      while (!receipt && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delayBetweenAttempts))
        receipt = await window.tronWeb.trx.getTransactionInfo(transaction)
        attempts++
      }

      // console.log('Transaction receipt:', receipt);

      if (receipt && receipt.result === 'SUCCESS') {
        if (receipt.log && receipt.log.length > 0) {
          const eventLog = receipt.log[0]
          const newTokenAddress = window.tronWeb.address.fromHex(eventLog.topics[1])

          setContractAddress(newTokenAddress)
          setIsTokenMinted(true)
          setDisablemint(true);

          toast.success(
            <div>
              Token successfully minted!
              <br />
              Token Address: {newTokenAddress}
              <br />
              <a href={tronScannileLink} target="_blank" rel="noopener noreferrer">
                View on TronScan
              </a>
            </div>
          )
          setLoading(false)
        } else {
          toast.success(
            <div>
              Token minted successfully,go to transaction and show event log and copy address
              <br />
              <a href={tronScannileLink} target="_blank" rel="noopener noreferrer">
                View on TronScan
              </a>
            </div>
          )
          setIsTokenMinted(true)
          setLoadingtrx(false)
          setDisablemint(true)
        }
      } else {
        toast.success(
          <div>
            Token minted successfully,go to transaction and show event log and copy address
            <br />
            <a href={tronScannileLink} target="_blank" rel="noopener noreferrer">
              View on TronScan
            </a>
          </div>
        )
        setIsTokenMinted(true)
        setLoadingtrx(false)
        setDisablemint(true);
      }
    } catch (error) {
      console.error('Error during minting:', error)
      toast.error('An error occurred while minting tokens. Please try again.', {
        position: 'top-center',
      })
      setLoading(false)
    }
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopyButtonText('Copied!')
    setTimeout(() => setCopyButtonText('Copy Address'), 2000)
  }

  const handleVerifyToken = async () => {

    if(!trc20_adddress){
      toast.error('Please enter your token address!',{position:'top-center'});
      return;
    }

    setLoading(false)
    const getdetails = await axios.get(
      `https://api.tronxplore.blockchainbytesdaily.com/api/users/${trc20_adddress}`
    )
    const response = await axios.patch(
      'https://api.tronxplore.blockchainbytesdaily.com/api/users/user_task8',
      {
        address: address,
        contract_address: trc20_adddress,
        token_symbol: getdetails.data.symbol,
        txhash: txhash,
      }
    )
    toast.success(
      `Your token with symbol ${getdetails.data.symbol} founded,Congratulations on completing your task! 🎉`,
      {
        position: 'top-center',
      }
    )
    updateTaskStatus('is_trc20_mint_task8');
    if (response.data) {
      setLoading(false)
      setIsTokenVerified(true)
      setIsTaskCompleted(true);
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
            <Title>Mint TRC-20 Tokens</Title>
            {/* <Description>
              For this minting token purpose, we are using the Nile testnet. Nile is a TRON testnet
              that allows developers to test their smart contracts and applications without using
              real TRX.
            </Description> */}
            <Description>
              Create your own TRC-20 token on the TRON mainnet. This process requires real TRX for
              transaction fees. Make sure you have sufficient TRX in your wallet before proceeding.
            </Description>

            {/* <Label>What is Nile Testnet?</Label> */}
            <Label>Important Information</Label>
            <HighlightedText>
              <DiscList>
                {/* <Lists>Nile is a test environment that mimics the TRON mainnet.</Lists>
                <Lists>It allows free testing of smart contracts and DApps.</Lists>
                <Lists>Transactions on Nile do not involve real TRX or tokens.</Lists>
                <Lists>
                  It's ideal for development and testing before deploying to the mainnet.
                </Lists> */}
                <Lists>You are creating a real TRC-20 token on the TRON mainnet.</Lists>
                <Lists>Transaction fees will be charged in real TRX.</Lists>
                <Lists>The token will be immediately tradeable on the TRON network.</Lists>
                <Lists>Make sure to save your token's contract address after minting.</Lists>
              </DiscList>
            </HighlightedText>

            {/* <Label>Steps to change network from Shasta to Nile:</Label>
            <List>
              <ListItem>Open your TronLink wallet extension.</ListItem>
              <ListItem>
                Click on the network dropdown at top-center(usually shows "Mainnet" or "Shasta").
              </ListItem>
              <ListItem>Select "Nile Testnet" from the list of available networks.</ListItem>
              <ListItem>Ensure that your wallet now shows "Nile" as the active network.</ListItem>
            </List> */}
            <Label>Before You Start:</Label>
            <List>
              <ListItem>Ensure your TronLink wallet is connected to Mainnet.</ListItem>
              <ListItem>Verify you have sufficient TRX for transaction fees.</ListItem>
              <ListItem>Double-check your token details before minting.</ListItem>
              <ListItem>Keep your contract address safe after minting.</ListItem>
            </List>

            {/* <HighlightedText2>
              To mint tokens on the Nile testnet, you'll need Nile TRX. You can get free Nile TRX
              from the{' '}
              <a
                href="https://nileex.io/join/getJoinPage"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ff6666' }}
              >
                Nile faucet
              </a>
              .
            </HighlightedText2> */}
             <HighlightedText>
              Note: Token decimals are set to 18 by default, providing the same precision as TRX.
              This is the standard for most TRC20 tokens.
            </HighlightedText>

            <InputGroup>
              <Label>Token Name:</Label>
              <Input
                type="text"
                placeholder="e.g., MyToken"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <Label>Token Symbol:</Label>
              <Input
                type="text"
                placeholder="e.g., MTK"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <Label>Initial Supply:</Label>
              <Input
                type="number"
                placeholder="e.g., 1000000"
                value={initialSupply}
                onChange={(e) => setInitialSupply(e.target.value)}
              />
            </InputGroup>

            <HighlightedText>
              Note: Decimals are set to 18 by default. This is the standard for most TRC20 tokens,
              providing the same precision as TRX.
            </HighlightedText>

            <ButtonGroup>
              <Button onClick={handleMint} disabled={isTaskCompleted || isdissable}>
                {loadingtrx ? (
                  <ScaleLoader height={15} width={4} color="white" />
                ) : isTaskCompleted ? (
                  'Task Completed'
                ) : (
                  'Mint Token'
                )}
              </Button>
            </ButtonGroup>

            {isTokenMinted && (
              <>
                
                <HighlightedText>
                  Great! Your TRC-20 token has been minted. Follow these steps to add it to your
                  TronLink wallet:
                </HighlightedText>
                <Label>Steps : </Label>
                <InstructionsList>
                  <InstructionItem>
                  Click the "View Transaction" button, navigate to the "Event Log" section, and copy the contract address. Paste the address into the input box below to verify your token.
                  </InstructionItem>
                  <InstructionItem>Open your TronLink wallet.</InstructionItem>
                  <InstructionItem>
                    Click the plus (+) sign located at the right-center of the wallet interface.
                  </InstructionItem>
                  <InstructionItem>Select "Custom Token" from the options.</InstructionItem>
                  <InstructionItem>
                    Paste the copied contract address into the designated field.
                  </InstructionItem>
                </InstructionsList>
                <ContractAddressBox>
                  <Input
                    type="text"
                    placeholder="Enter Event log address here..."
                    value={trc20_adddress}
                    onChange={(e) => setTrc20address(e.target.value)}
                  />
                </ContractAddressBox>
                <ButtonGroup>
                  <Button onClick={handleVerifyToken} disabled={isTaskCompleted}>
                    {' '}
                    {loading ? <ScaleLoader height={15} width={4} color="white" /> : 'Verify Token'}
                  </Button>
                  <a href={txhashlink} target="_blank" rel="noopener noreferrer">
                    <Button>View Transaction</Button>
                  </a>
                </ButtonGroup>
              </>
            )}

            {isTokenVerified && (
              <ButtonGroup>
                <ButtonCont onClick={() => navigate('/')}>Continue Your Journey</ButtonCont>
              </ButtonGroup>
            )}
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
