import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast'
import { ScaleLoader } from 'react-spinners'

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

const Title = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  margin-top: 0;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3), 0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 30px;
`

const OrderedList = styled.ol`
  padding-left: 0;
  counter-reset: item;
  list-style-type: none;
`

const ListItem = styled.li`
  margin-bottom: 20px;
  position: relative;
  padding-left: 50px;
  font-size: 16px;

  &::before {
    content: counter(item);
    counter-increment: item;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ff0000;
    color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-family: 'Orbitron', sans-serif;
  }
`

const Link = styled.a`
  color: #ff6666;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #ff9999;
  }
`

const Note = styled.div`
  background-color: rgba(82, 79, 79, 0.8);
  padding: 20px;
  border-left: 4px solid #ff0000;
  margin: 30px 0;
  border-radius: 0 10px 10px 0;
  font-size: 14px;
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
    setLoading(true);
  
    const checkTronLink = () => {
      return new Promise((resolve) => {
        if (window.tronWeb && window.tronWeb.ready) {
          resolve(true);
        } else {
          // If TronLink is not detected or not ready, we'll wait for a short time and check again
          setTimeout(() => {
            if (window.tronWeb && window.tronWeb.ready) {
              resolve(true);
            } else {
              resolve(false);
            }
          }, 2000); // Wait for 2 seconds before rechecking
        }
      });
    };
  
    try {
      const tronLinkDetected = await checkTronLink();
  
      if (tronLinkDetected) {
        try {
          // Request account access
          await window.tronWeb.request({ method: 'tron_requestAccounts' });
          
          // Double-check if TronWeb is still ready after requesting access
          if (window.tronWeb && window.tronWeb.ready) {
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
            } catch (error) {
              toast.error('Failed to complete task. Please try again.', {
                position: 'top-center',
              });
              console.error('API Error:', error);
            }
          } else {
            throw new Error('TronLink became unavailable');
          }
        } catch (error:any) {
          if (error.message === 'TronLink became unavailable') {
            toast.error('TronLink became unavailable. Please check if it\'s enabled and try again.', {
              position: 'top-center',
            });
          } else {
            toast.error('Failed to connect to TronLink. Please try again!', {
              position: 'top-center',
            });
          }
          console.error('TronLink Error:', error);
        }
      } else {
        toast.error('TronLink not detected or not ready. Please install TronLink wallet, ensure it\'s enabled, and refresh the page!', {
          position: 'top-center',
        });
        // Offer a button to reload the page
        if (confirm('TronLink not detected or need to unlock. please reload the page to check again?')) {
          window.location.reload();
        }

        
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please refresh the page and try again.', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Toaster />
      <PageWrapper>
        <BackButton onClick={onBack}>← Back</BackButton>
        <ScrollableContent>
          <Container>
            <Title>HOW TO CREATE A TRONLINK ACCOUNT</Title>
            <OrderedList>
              <ListItem>
                Visit the official TronLink wallet page:{' '}
                <Link href="https://www.tronlink.org/" target="_blank">
                  TronLink
                </Link>
              </ListItem>
              <ListItem>
                Click on{' '}
                <Link
                  href="https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec"
                  target="_blank"
                >
                  Add TronLink Extension
                </Link>{' '}
                to add the TronLink extension to your browser.
              </ListItem>
              <ListItem>Click on 'Add to Chrome' to install the TronLink extension.</ListItem>
              <ListItem>
                Once installed, click on the TronLink icon in your browser toolbar.
              </ListItem>
              <ListItem>
                Click on 'Create Account' and follow the steps to set up your new account, including
                backing up your private key.
              </ListItem>
              <ListItem>You're now ready to use TronLink with the Tron blockchain!</ListItem>
            </OrderedList>
            <Note>
              <strong>Note:</strong> Always keep your private key secure and never share it with
              anyone.
            </Note>
            <div className="w-full flex justify-center">
              <ButtonAddLink onClick={handleTaskCompletion}  disabled={isTaskCompleted}>
                {loading ? (
                  <ScaleLoader height={15} width={4} color="white" />
                ) : isTaskCompleted ? (
                  'Task Completed'
                ) : (
                  'Check Wallet'
                )}
              </ButtonAddLink>
            </div>
            {isTaskCompleted && (
              <div className="w-full flex items-center flex-col">
                <LevelUpText>
                  Ready to level up? 🚀 Check out the next challenge and continue your blockchain
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
