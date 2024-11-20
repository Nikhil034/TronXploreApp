import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast'
import { ScaleLoader } from 'react-spinners'
import extension from '../images/extension.png'
import wallet from '../images/wallet.png'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;400;600&display=swap');

  body {
    font-family: "Poppins", sans-serif;
    background-color: #000000;
    color: #ffffff;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
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
  width: 90%;
  background-color: rgba(36, 36, 36, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(255, 0, 0, 0.2), 0 0 0 1px rgba(255, 0, 0, 0.1);
  position: relative;
  margin: auto;
`

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const GuideImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 0, 0, 0.2);
`

const GuideText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
`

const ButtonGroup = styled.div`
  display:flex;
  gap:10px;
`

const ButtonAddLink = styled.button`
  background: linear-gradient(45deg, #ff0000, #cc0000);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;  
  width: fit-content;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`

const ButtonReload = styled(ButtonAddLink)`
    &::after {
    content:"Wallet not detected. Please refresh the page and try again.";
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
    display: block;
    opacity: 0; // Start with opacity 0
    transition: opacity 0.2s ease; // Smooth transition for opacity
  }

  &:hover::after {
    display: block;// Show only when disabled
    opacity: 0.8;// Make it fully visible only when disabled
  }
`

const Title = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  margin-top: 0;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3), 0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 30px;
  text-align:center;
`

// const OrderedList = styled.ol`
//   padding-left: 0;
//   counter-reset: item;
//   list-style-type: none;
// `

// const ListItem = styled.li`
//   margin-bottom: 20px;
//   position: relative;
//   padding-left: 50px;
//   font-size: 16px;

//   &::before {
//     content: counter(item);
//     counter-increment: item;
//     position: absolute;
//     left: 0;
//     top: 50%;
//     transform: translateY(-50%);
//     background-color: #ff0000;
//     color: #fff;
//     width: 30px;
//     height: 30px;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-weight: bold;
//     font-family: 'Orbitron', sans-serif;
//   }
// `

// const Link = styled.a`
//   color: #ff6666;
//   text-decoration: none;
//   position: relative;
//   transition: color 0.3s ease;

//   &:hover {
//     color: #ff9999;
//   }
// `

// const Note = styled.div`
//   background-color: rgba(82, 79, 79, 0.8);
//   padding: 20px;
//   border-left: 4px solid #ff0000;
//   margin: 30px 0;
//   border-radius: 0 10px 10px 0;
//   font-size: 14px;
// `


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

const ContinueButton = styled.button`
  background: linear-gradient(45deg, #4caf50, #388e3c);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-transform: uppercase;
  width: fit-content;

  &:hover {
    background: linear-gradient(45deg, #66bb6a, #43a047);
    transform: translateY(-2px);
  }
`

const LevelUpText = styled.p`
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
  color: #ff6666;
  text-shadow: 0 0 10px rgba(255, 102, 102, 0.5);
  letter-spacing: 1px;
  line-height: 1.4;
`

interface TronLinkGuideProps {
  onBack: () => void
}

const TronLinkGuide: React.FC<TronLinkGuideProps> = ({ onBack }) => {
  const navigate = useNavigate()
  const [taskCompleted, setTaskCompleted] = useState(false)
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false) // Track task status
  const [loading, setLoading] = useState(false)
  const [tronLinkDetected, setTronLinkDetected] = useState(false)

  useEffect(() => {
    // Check for TronLink availability every 2 seconds
    const checkTronLinkAvailability = setInterval(() => {
      if (window.tronWeb && window.tronWeb.ready) {
        setTronLinkDetected(true)
        clearInterval(checkTronLinkAvailability)
      }
    }, 2000)

    return () => clearInterval(checkTronLinkAvailability)
  }, [])

 
    const handleReload = () => {
      window.location.reload();
    };

  useEffect(() => {
    // Fetch the task status when the component loads
    const fetchTaskStatus = async () => {
      try {
        const username = Cookies.get('username')
        // console.log(username);
        const response = await axios.get(
          `https://api.tronxplore.blockchainbytesdaily.com/api/users/${username}/tasks-status`
        )
        const taskStatus = response.data.is_create_wallet_task1 // Adjust based on the actual response structure
        setIsTaskCompleted(taskStatus) // Update the state based on the task status
      } catch (error) {
        console.error('Error fetching task status:', error)
        toast.error('Failed to fetch task status.')
      }
    }
    fetchTaskStatus()
  }, []) // Empty dependency array to run only on component mount

  useEffect(() => {
    // Check if the task is already completed when component mounts
    const taskStatus = getTaskStatus()
    if (taskStatus['is_create_wallet_task1']) {
      setTaskCompleted(true)
    }
  }, [])

  const getTaskStatus = (): Record<string, boolean> => {
    const taskStatus = localStorage.getItem('tasks_status')
    // console.log(taskStatus)
    return taskStatus ? JSON.parse(taskStatus) : {}
  }

  const updateTaskStatus = (taskKey: string) => {
    const taskStatus = getTaskStatus()
    taskStatus[taskKey] = true
    localStorage.setItem('tasks_status', JSON.stringify(taskStatus))
  }

  const handleTaskCompletion = async () => {
    const username = Cookies.get('username');
    // Check if TronLink is installed
    if (window.tronWeb) {
      try {
        await window.tronWeb.request({ method: 'tron_requestAccounts' });
        
        // Check if TronWeb is ready after requesting access
        if (window.tronWeb.ready) {
        setLoading(true);
          try {
            const response = await axios.patch(
              'https://api.tronxplore.blockchainbytesdaily.com/api/users/user_task1',
              { username: username }
            );
  
            updateTaskStatus('is_create_wallet_task1');
            toast.success('Congratulations on completing your task! 🎉', {
              position: 'top-center',
            });
            setIsTaskCompleted(true);
            setLoading(false);
          } catch (error) {
            toast.error('Failed to complete task. Please try again.', {
              position: 'top-center',
            });
            setLoading(false);
            console.error(error);
          }
        } else {
          toast.error('TronLink is not ready. Please unlock your wallet and try again!', {
            position: 'top-center',
          });
          setLoading(false);

        }
      } catch (error) {
        toast.error('Failed to connect to TronLink. Please try again!', {
          position: 'top-center',
        });
        setLoading(false);
        console.error(error);
      }
      finally{
        setLoading(false);
      }
    } else {
      toast.error('TronLink not detected. Please install TronLink wallet!', {
        position: 'top-center',
      });
      setLoading(false);
    }
  
    setLoading(false);
  };

  return (
    <>
      <GlobalStyle />
      <Toaster />
      <PageWrapper>
        <BackButton onClick={onBack}>← Back</BackButton>
        <ScrollableContent>
          <Container>
        
            <Title>Install and Unlock TronLink Wallet</Title>
            <GuideContainer>
              <GuideText>
                Before proceeding, make sure you have the TronLink wallet installed and unlocked. Follow these steps:
              </GuideText>
              <GuideImage src={extension} alt="TronLink Installation" />
              <GuideText>
                1. Install the TronLink wallet extension from the Chrome Web Store.
              </GuideText>
              <GuideImage src={wallet} alt="TronLink Unlock" />
              <GuideText>
                2. Once installed, click on the TronLink icon in your browser and unlock your wallet.
              </GuideText>
              <GuideText>
                After completing these steps, click the "Check Wallet" button below to verify your wallet status.
              </GuideText>

              <ButtonGroup>              
                <ButtonAddLink onClick={handleTaskCompletion} disabled={isTaskCompleted}>
                {loading ? (
                  <ScaleLoader height={15} width={4} color="white" />
                ) : isTaskCompleted ? (
                  'Wallet Verified'
                ) : (
                  'Check Wallet'
                )}
              </ButtonAddLink>
              <ButtonReload onClick={handleReload} disabled={isTaskCompleted}>Reload</ButtonReload>
              </ButtonGroup>

            </GuideContainer>
            {isTaskCompleted && (
              <div className="w-full flex items-center flex-col">
                <LevelUpText>
                  Ready to level up? 🚀 Check out the next challenges and continue your blockchain
                  adventure! 💡🔗
                </LevelUpText>
                <ContinueButton onClick={() => navigate('/')}>Continue Your Journey</ContinueButton>
              </div>
            )}
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}

export default TronLinkGuide