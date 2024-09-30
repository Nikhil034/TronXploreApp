import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { Smartphone, Bus, Car, Cpu, Database } from 'lucide-react'
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
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(255, 0, 0, 0.1) 0%, transparent 20%);
  }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #ff0000, #cc0000);
    border-radius: 5px;
  }
`

const Container = styled.div`
  max-width: 1200px;
  background-color: rgba(36, 36, 36, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(255, 0, 0, 0.2), 0 0 0 1px rgba(255, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out forwards;
  backdrop-filter: blur(10px);
  margin: auto;
`

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 36px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3), 0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
`

const Subtitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 28px;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #ff6666;
  text-align: center;
`

const Text = styled.p`
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 20px;
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(255, 0, 0, 0.2);
  }
`

const CardTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 22px;
  margin-top: 0;
  margin-bottom: 15px;
  color: #ff6666;
  display: flex;
  align-items: center;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`

const StyledList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin-top: 10px;
`

const StyledListItem = styled.li`
  position: relative;
  padding-left: 25px;
  margin-bottom: 10px;
  
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #ff6666;
    font-size: 1.2em;
  }
`

interface TronResourceExplainerProps {
  onBack: () => void;
}

export default function TronResourceExplainer({ onBack }: TronResourceExplainerProps) {
  const navigate = useNavigate();
  
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <BackButton onClick={onBack}>← Back to Game</BackButton>
        <ScrollableContent>
          <Container>
            <Title>Understanding Tron Resources</Title>
            <Text>
              Let's explore the concepts of Bandwidth and Energy in the Tron blockchain using familiar analogies from everyday life.
            </Text>

            <Subtitle>Resource Analogies</Subtitle>

            <CardContainer>
              <Card>
                <CardTitle>
                  <Bus size={24} color="#ff6666" />
                  Bandwidth - Bus Tickets
                </CardTitle>
                <Text>
                  Bandwidth in Tron is like having a daily bus pass:
                  <StyledList>
                    <StyledListItem>You get a free allocation every day, just like free bus tickets.</StyledListItem>
                    <StyledListItem>Used for basic actions like sending TRX or querying the blockchain.</StyledListItem>
                    <StyledListItem>Once you use up your daily allocation, you either wait for the next day or pay extra (burn TRX).</StyledListItem>
                    <StyledListItem>Simple transactions use less Bandwidth, while more complex ones use more.</StyledListItem>
                  </StyledList>
                </Text>
              </Card>

              <Card>
                <CardTitle>
                  <Car size={24} color="#ff6666" />
                  Energy - Car Fuel
                </CardTitle>
                <Text>
                  Energy in Tron is comparable to fuel in your car:
                  <StyledList>
                    <StyledListItem>Required for more complex operations, like running smart contracts or DApps.</StyledListItem>
                    <StyledListItem>Unlike Bandwidth, you don't get free Energy daily.</StyledListItem>
                    <StyledListItem>You either "fill up the tank" by freezing TRX or pay as you go (burn TRX).</StyledListItem>
                    <StyledListItem>More complex operations consume more Energy, like longer trips use more fuel.</StyledListItem>
                  </StyledList>
                </Text>
              </Card>
            </CardContainer>

            <Subtitle>Detailed Resource Explanation</Subtitle>

            <CardContainer>
              <Card>
                <CardTitle>
                  <Database size={24} color="#ff6666" />
                  Bandwidth Deep Dive
                </CardTitle>
                <Text>
                  Bandwidth on Tron:
                  <StyledList>
                    <StyledListItem>Measured in bytes, represents the size of transactions you can make.</StyledListItem>
                    <StyledListItem>Free daily allocation is typically 1500 bandwidth points.</StyledListItem>
                    <StyledListItem>Used for actions like transfers, account creation, and asset issuance.</StyledListItem>
                    <StyledListItem>Can be increased by freezing TRX: 1 TRX ≈ 1000 bandwidth points for 24 hours.</StyledListItem>
                    <StyledListItem>Helps prevent network congestion and spam transactions.</StyledListItem>
                  </StyledList>
                </Text>
              </Card>

              <Card>
                <CardTitle>
                  <Cpu size={24} color="#ff6666" />
                  Energy Deep Dive
                </CardTitle>
                <Text>
                  Energy on Tron:
                  <StyledList>
                    <StyledListItem>Measured in Sun (1 TRX = 1,000,000 Sun), represents computational resources.</StyledListItem>
                    <StyledListItem>No free daily allocation - must be obtained by freezing TRX.</StyledListItem>
                    <StyledListItem>Essential for smart contract deployment and execution.</StyledListItem>
                    <StyledListItem>Freezing 1 TRX provides about 420 Energy for 24 hours (subject to network conditions).</StyledListItem>
                    <StyledListItem>Unused Energy doesn't accumulate - it resets daily.</StyledListItem>
                  </StyledList>
                </Text>
              </Card>
            </CardContainer>

            <Subtitle>Resource Management Strategies</Subtitle>

            <CardContainer>
              <Card>
                <CardTitle>
                  <Smartphone size={24} color="#ff6666" />
                  Optimal Resource Usage
                </CardTitle>
                <Text>
                  Tips for managing your Tron resources effectively:
                  <StyledList>
                    <StyledListItem>Monitor your resource usage regularly in your Tron wallet.</StyledListItem>
                    <StyledListItem>Stake TRX strategically based on your transaction patterns.</StyledListItem>
                    <StyledListItem>Use Bandwidth for simple transfers and Energy for smart contract interactions.</StyledListItem>
                    <StyledListItem>Consider the resource costs when planning complex operations on the Tron network.</StyledListItem>
                    <StyledListItem>Unstake and re-stake TRX periodically to optimize your resource allocation.</StyledListItem>
                  </StyledList>
                </Text>
              </Card>
            </CardContainer>

            <ButtonGroup>
              <Button onClick={() => navigate('/task6_continue')}>Let's do Activity</Button>
            </ButtonGroup>
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  );
}