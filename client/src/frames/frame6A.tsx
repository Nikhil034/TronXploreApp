import { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const Container = styled.div`
  max-width: 600px;
  background-color: rgba(36, 36, 36, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(255, 0, 0, 0.2), 0 0 0 1px rgba(255, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out forwards;
  backdrop-filter: blur(10px);
  margin: 40px auto;
`;

const Title = styled.h2`
  font-family: "Orbitron", sans-serif;
  font-weight: 700;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3), 0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  margin-top: 0;
`;

const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 20px;
`;

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
`;

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
`;

const CheckButton = styled(Button)`
  background: linear-gradient(45deg, #ff0000, #cc0000);
`;

const VerifyButton = styled(Button)`
  background: linear-gradient(45deg, #4CAF50, #45a049);
`;

const ContinueButton = styled(Button)`
  background: linear-gradient(45deg, #4CAF50, #45a049);
`;

const AlertBox = styled.div<{ type: 'error' | 'success' }>`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: ${props => props.type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)'};
  border: 1px solid ${props => props.type === 'error' ? '#ff0000' : '#00ff00'};
`;

const AlertIcon = styled.span`
  margin-right: 10px;
`;

const ResourceDisplay = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;

`;

const ResourceItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface TronResourceCheckerProps {
  onBack: () => void;
}

export default function TronResourceChecker({ onBack }: TronResourceCheckerProps) {
  const [transactionHash, setTransactionHash] = useState('');
  const [resources, setResources] = useState<{ bandwidth: number; energy: number } | null>(null);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const navigate=useNavigate();

  const handleCheck = () => {
    if (!transactionHash) {
      setError('Please enter a transaction hash');
      return;
    }
    // Simulating resource check
    setResources({
      bandwidth: Math.floor(Math.random() * 1000),
      energy: Math.floor(Math.random() * 1000)
    });
    setError('');
  };

  const handleVerify = () => {
    // Simulating verification process
    setIsVerified(true);
  };

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
      <BackButton onClick={onBack}>← Back</BackButton>
        <ScrollableContent>
          <Container>
            <Title>Check Your Resources</Title>
            <Text>Enter your transaction hash to check your Tron resources.</Text>
            
            <Input
              type="text"
              placeholder="Enter transaction hash"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
            />
            
            <CheckButton onClick={handleCheck}>Check Your Resources</CheckButton>
            
            {error && (
              <AlertBox type="error">
                <AlertIcon><AlertCircle size={18} /></AlertIcon>
                {error}
              </AlertBox>
            )}
            
            {resources && (
              <>
                <ResourceDisplay>
                  <ResourceItem>
                    <span>Bandwidth:</span>
                    <span>{resources.bandwidth}</span>
                  </ResourceItem>
                  <ResourceItem>
                    <span>Energy:</span>
                    <span>{resources.energy}</span>
                  </ResourceItem>
                </ResourceDisplay>
                
                <VerifyButton onClick={handleVerify} disabled={isVerified}>
                  {isVerified ? 'Verified' : 'Verify'}
                </VerifyButton>
              </>
            )}
            
            {isVerified && (
              <ContinueButton onClick={()=>navigate('/')}>Continue Your Journey</ContinueButton>
            )}
            
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  );
}