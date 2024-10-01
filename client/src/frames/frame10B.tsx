import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
  display: flex;
  align-items: center;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 20px 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`
const ButtonCont = styled(Button)`
  background: linear-gradient(45deg, #4caf50, #388e3c);
`
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
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
  const address = 'hfgegyedtwftye'
  const navigate = useNavigate()

  return (
    <>
      <GlobalStyle />
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
              //   value={amount}
              //   onChange={(e) => setAmount(e.target.value)}
            />
            <CardTitle> Enter your last transaction bandwidth</CardTitle>
            <Input
              type="text"
              placeholder="Enter bandwidth here..."
              //   value={recipient}
              //   onChange={(e) => setRecipient(e.target.value)}
            />

            <ButtonGroup>
              <Button>Check it!</Button>
              <ButtonCont onClick={() => navigate('/')}>Continue Your Journey</ButtonCont>
            </ButtonGroup>
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
