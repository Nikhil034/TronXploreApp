import { useEffect, useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { Copy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { ScaleLoader } from 'react-spinners'

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
`

const Address = styled.span`
  font-size: 16px;
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
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px auto;
`

const TokenDetails = styled.div`
  // margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  width: 100%;
`

const ToketDetail = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

interface TokenDetails {
  name: string
  symbol: string
  supply: string
}


export default function SendTRX({ onBack }: SendTRXProps) {
  const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null)
  const [trc20address,Settrc20address]=useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    TRC20tokenaddress()
  },[])
  

  const TRC20tokenaddress=async()=>{
    if (!window.tronWeb || !window.tronWeb.ready) {
      toast.error('TronLink wallet is not installed or not logged in.', {
        position: 'top-center',
      });
      return;
    }
    const userAddress = window.tronWeb.defaultAddress.base58;
    const tokenaddress=await axios(`http://localhost:2567/api/users/${userAddress}/trc20mintcontract`);
    // console.log(tokenaddress.data.trc20mint_contract_address);
    Settrc20address(tokenaddress.data.trc20mint_contract_address);
  }

  const handleSearch = async () => {
    // Simulating token details fetch
    setLoading(true);
    const getdetails=await axios.get(`http://localhost:2567/api/users/${trc20address}`);
    if(getdetails.data) {
      setLoading(false)
    }
    const mockTokenDetails = {
      name: getdetails.data.name,
      symbol: getdetails.data.symbol,
      supply: getdetails.data.supply
    }
    setTokenDetails(mockTokenDetails)
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(trc20address)
    alert('Address copied to clipboard!')
  }

  return (
    <>
      <GlobalStyle />
      <Toaster/>
      <PageWrapper>
        <BackButton onClick={onBack}>← Back to Game</BackButton>
        <ScrollableContent>
          <Container>
            <Title>Approve Tokens and Transfer TRC20</Title>
            <Text>
              You're about to send TRX to the address provided. Please review the details carefully
              before proceeding.
            </Text>

            <Subtitle>Your TRC20 Token Address</Subtitle>
            <AddressDisplay>
              <Address>{trc20address}</Address>
              <IconButton onClick={handleCopyAddress} aria-label="Copy address">
                <Copy size={20} />
              </IconButton>
            </AddressDisplay>

            <ButtonContainer>
              <Button onClick={handleSearch}> {loading ? <ScaleLoader height={15} width={4} color="white" /> : 'View Token Details'}</Button>
            </ButtonContainer>

            {tokenDetails && (
              <div className="flex flex-col items-center m-0">
                <TokenDetails>
                  <Subtitle>Token Name : </Subtitle>
                  <ToketDetail>{tokenDetails.name}</ToketDetail>
                  <Subtitle>Token Symbol : </Subtitle>
                  <ToketDetail>{tokenDetails.symbol}</ToketDetail>
                  <Subtitle>Token Supply : </Subtitle>
                  <ToketDetail>{tokenDetails.supply}</ToketDetail>
                </TokenDetails>

                <Button onClick={() => navigate('/task9_continue')}>
                  Let's sent your custome tokken
                </Button>
              </div>
            )}
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
