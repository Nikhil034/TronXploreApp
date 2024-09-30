import { useState } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { Smartphone, Zap, Lock, Unlock, DollarSign } from 'lucide-react'

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
  max-width: 1500px;
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

const Subtitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #ff6666;
  text-align: center;
`

const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 20px;
`

const CardContainer = styled.div`
  display: flex;
  gap: 10px;
`

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(255, 0, 0, 0.2);
  }
`

const CardTitle = styled.h4`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #ff6666;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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
  margin: 20px auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
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
  margin: 20px auto 20px 20px;

  &:hover {
    background-color: #b91c1c;
  }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const SubTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  color: #ffffff;
  text-align: center;
  margin-bottom: 1.5rem;
  margin-top: 40px;
  font-size: 2rem;
`

const Scenario = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`

const ScenarioTitle = styled.h3`
  color: #ff6666;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 20px;
`

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
    transform: translateX(5px);
  }
`

const StepIcon = styled.div`
  background: #ff0000;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StepContent = styled.div`
  flex: 1;
`

const StepTitle = styled.h4`
  color: #ff6666;
  margin-bottom: 0.5rem;
  font-weight: 500;
`

const StepDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
`

const InfoBox = styled.div`
  background: rgba(255, 102, 102, 0.1);
  border-left: 4px solid #ff0000;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0 10px 10px 0;
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
const KnowledgeContainer = styled.div`
  max-width: 650px;
  margin: auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 30px;
  //   margin:auto;
`
interface TronEnergyExplainerProps {
  onBack: () => void
}

export default function TronEnergyExplainer({ onBack }: TronEnergyExplainerProps) {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      icon: <Zap size={24} color="#ffffff" />,
      title: 'Using Available Energy',
      description:
        'If you have sufficient Energy, the transaction will use it up without spending any TRX.',
    },
    {
      icon: <Lock size={24} color="#ffffff" />,
      title: 'Insufficient Energy',
      description:
        "If you don't have enough Energy, the system will burn some of your TRX to complete the transfer.",
    },
    {
      icon: <Unlock size={24} color="#ffffff" />,
      title: 'Staking for Energy',
      description:
        'To avoid burning TRX, you can stake your TRX in advance to get more Energy for future transactions.',
    },
  ]

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <BackButton onClick={onBack}>← Back to Game</BackButton>
        <ScrollableContent>
          <Container>
            <Title>Understanding Tron Energy</Title>
            <Text>
              Let's explore the concept of Energy in the Tron blockchain using a familiar analogy: a
              mobile phone data plan.
            </Text>

            <Subtitle>Mobile Data Plan Analogy</Subtitle>

            <CardContainer>
              <Card>
                <IconWrapper>
                  <Smartphone size={48} color="#ff6666" />
                </IconWrapper>
                <CardTitle>Energy is Like Mobile Data</CardTitle>
                <Text>
                  Just as you use data for browsing, streaming, or making calls, Energy is consumed
                  every time you interact with the Tron blockchain. If you run out of Energy, you'll
                  have to pay extra (burn TRX) for additional usage.
                </Text>
              </Card>

              <Card>
                <IconWrapper>
                  <Lock size={48} color="#ff6666" />
                </IconWrapper>
                <CardTitle>Staking (Freezing TRX) is Like Buying a Data Plan</CardTitle>
                <Text>
                  When you stake TRX, it's similar to prepaying for a data plan. You're allocating
                  resources upfront to use later. The more TRX you stake, the more Energy you get,
                  helping you avoid extra costs (burning TRX) in the future.
                </Text>
              </Card>

              <Card>
                <IconWrapper>
                  <Zap size={48} color="#ff6666" />
                </IconWrapper>
                <CardTitle>Burning TRX is Like Paying for Extra Data</CardTitle>
                <Text>
                  If you run out of Energy (like exceeding your data plan), the Tron blockchain will
                  charge you additional TRX to complete your transaction, similar to how a phone
                  company charges for extra data usage.
                </Text>
              </Card>
            </CardContainer>

            {/* <SubContainer> */}
            <SubTitle>Example in the Tron Blockchain</SubTitle>
            <Scenario>
              <ScenarioTitle>
                <DollarSign size={24} color="#ff6666" />
                Sending TRC-20 Tokens
              </ScenarioTitle>
              <p>
                Imagine you want to send some TRC-20 tokens to a friend. Here's how Energy comes
                into play:
              </p>
              <StepContainer>
                {steps.map((step, index) => (
                  <Step
                    key={index}
                    onMouseEnter={() => setActiveStep(index)}
                    style={{ opacity: activeStep === index ? 1 : 0.7 }}
                  >
                    <StepIcon>{step.icon}</StepIcon>
                    <StepContent>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDescription>{step.description}</StepDescription>
                    </StepContent>
                  </Step>
                ))}
              </StepContainer>
              <InfoBox>
                <strong>Pro Tip:</strong> By staking TRX, you're essentially prepaying for your
                transaction costs, which can save you money in the long run.
              </InfoBox>
            </Scenario>

            <SubTitle>Let's check your knowledge</SubTitle>

            <KnowledgeContainer>
              <CardTitle> Enter your last transaction hash</CardTitle>
              <Input
                type="text"
                placeholder="Enter transaction hash here..."
                //   value={recipient}
                //   onChange={(e) => setRecipient(e.target.value)}
              />

              <CardTitle>Enter your last transcation block number</CardTitle>
              <Input
                type="number"
                placeholder="Enter transcation block number..."
                //   value={amount}
                //   onChange={(e) => setAmount(e.target.value)}
              />

              <Button>Check it!</Button>
            </KnowledgeContainer>
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
