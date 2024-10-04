import axios from 'axios'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
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
  max-height: 100vh;
  overflow-y: auto;
  margin: 40px auto;
`

const Title = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  margin-top: 0;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3), 0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
`

const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 20px;
`

const Label = styled.label`
  font-family: 'Orbitron', sans-serif;
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  color: #ff6666;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
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
`

const StakeButton = styled(Button)`
  background: linear-gradient(45deg, #ff0000, #cc0000);
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

const InfoBox = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const InfoTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #ff6666;
  margin-bottom: 10px;
`

const InfoText = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 10px;
`

const InfoList = styled.ul`
  list-style-type: none;
  padding-left: 0;
`

const InfoListItem = styled.li`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 5px;
  padding-left: 20px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #ff6666;
  }
`

const ButtonCont = styled.button<{ disabled: boolean }>`
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
      disabled ? '"You are doing great! unlock next task ✨"' : '""'};
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


interface StakeTRXProps {
  onBack: () => void
}

export default function StakeTRX({ onBack }: StakeTRXProps) {
  const [trxAmount, setTrxAmount] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const [isValid, setIsValid] = useState(false)

  const handleStake = async () => {
    setError('')
    setSuccess('')
    const amount = parseFloat(trxAmount)

    if (!amount || amount <= 0) {
      setError('Please enter a valid TRX amount to stake.')
      return
    }

    if (!(window as any).tronWeb || !(window as any).tronWeb.ready) {
      setError('TronLink wallet is not installed or unlocked. Please ensure TronLink is available.')
      return
    }

    try {
      const tronWeb = (window as any).tronWeb
      const userAddress = tronWeb.defaultAddress.base58
      // console.log('User address:', userAddress)

      if (!tronWeb.isAddress(userAddress)) {
        throw new Error('Invalid TRON address')
      }

      const sunAmount = tronWeb.toSun(amount)
      // console.log('Staking amount in SUN:', sunAmount)

      const balance = await tronWeb.trx.getBalance(userAddress)
      // console.log('Account balance (SUN):', balance)
      // console.log('Current network:', tronWeb.fullNode.host)

      const accountResources = await tronWeb.trx.getAccountResources(userAddress)
      // console.log('Account resources:', accountResources)

      if (accountResources.EnergyLimit > 0) {
        // console.log('Existing freeze detected. Please unfreeze before creating a new freeze.')
        setError('You have an existing freeze. Please unfreeze before staking again.')
        return
      }

      if (balance < sunAmount) {
        // console.log('Insufficient balance')
        setError('Insufficient balance to complete the staking transaction.')
        return
      }

      // console.log('Preparing freeze balance transaction...')
      const result = await tronWeb.transactionBuilder.freezeBalanceV2(
        sunAmount,
        'ENERGY',
        userAddress
      )
      // console.log('Freeze balance transaction prepared:', result)

      // console.log('Signing transaction...')
      const signedTxn = await tronWeb.trx.sign(result)
      // console.log('Transaction signed:', signedTxn)

      console.log('Broadcasting transaction...')
      const txnReceipt = await tronWeb.trx.sendRawTransaction(signedTxn)
      // console.log('Transaction receipt:', txnReceipt)

      if (txnReceipt.result) {
        // setSuccess(`Staking successful! Transaction Hash: ${txnReceipt.txid}`)
      const response = await axios.patch('https://api.tronxplore.blockchainbytesdaily.com/api/users/user_task7', {address:userAddress,txhash:txnReceipt.txid,amount:amount});
      // console.log("Response:",response.data);
      toast.success('Congratulations on completing your task! 🎉.', {
        position: 'top-center',
        duration: 5000,
      })
      setSuccess('Succesfully staked energy you can check out your wallet.')
      setIsValid(true);
      } else {
        console.error('Transaction failed:', txnReceipt)
        setError('Transaction failed. Please check the console for details and try again.')
      }
    } catch (error: any) {
      console.error('Error during staking:', error)
      if (error.message === 'Invalid TRON address') {
        setError('The TRON address is invalid. Please check your wallet connection.')
      } else if (error.error === 'CONTRACT_VALIDATE_ERROR') {
        console.error('Contract validation error details:', error)
        const decodedMessage = Buffer.from(error.message, 'hex').toString('utf8')
        // console.log('Decoded error message:', decodedMessage)
        setError(`Contract validation error: ${decodedMessage}`)
      } else {
        setError('An error occurred while staking TRX: ' + error.message)
      }
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
            <Title>Stake TRX for Energy</Title>
            {/* <Text>Stake TRX to gain Energy that can be used for executing smart contracts. Enter the amount of TRX you wish to stake and click "Stake TRX".</Text> */}

            <InfoBox>
              <InfoTitle>Understanding Energy Staking</InfoTitle>
              <InfoText>
                Staking TRX for Energy is a crucial aspect of the Tron blockchain. Here's what you
                need to know:
              </InfoText>
              <InfoList>
                <InfoListItem>
                  Energy is used to execute smart contracts and complex operations on the Tron
                  network.
                </InfoListItem>
                <InfoListItem>
                  By staking TRX, you receive Energy in return, which regenerates daily.
                </InfoListItem>
                <InfoListItem>
                  The amount of Energy you receive depends on the amount of TRX staked and current
                  network conditions.
                </InfoListItem>
                <InfoListItem>
                  Staking helps you avoid burning TRX for each transaction, potentially saving costs
                  in the long run.
                </InfoListItem>
                <InfoListItem>
                  The minimum staking period is 3 days, after which you can unfreeze your TRX if
                  needed.
                </InfoListItem>
              </InfoList>
            </InfoBox>
            <Label htmlFor="trxInput">Enter TRX amount to stake:</Label>
            <Input
              type="number"
              id="trxInput"
              placeholder="e.g., 100"
              value={trxAmount}
              onChange={(e) => setTrxAmount(e.target.value)}
            />

            <StakeButton onClick={handleStake}>Stake TRX</StakeButton>
            <ButtonCont onClick={() => navigate('/')} disabled={!isValid}>Continue Your Journey</ButtonCont>

            {error && <Text style={{ color: 'red' }}>{error}</Text>}
            {success && <Text style={{ color: 'green' }}>{success}</Text>}
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>)}