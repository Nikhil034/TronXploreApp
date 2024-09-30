import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, IconButton, Tooltip, LinearProgress, Alert, Snackbar } from '@mui/material'
import { HelpOutline, ArrowBack } from '@mui/icons-material'
import { CustomRoomTable } from './CustomRoomTable'
import { CreateRoomForm } from './CreateRoomForm'
import { useAppSelector } from '../hooks'
import phaserGame from '../PhaserGame'
import Bootstrap from '../scenes/Bootstrap'
import logo from '../images/logo.png'

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled(motion.div)`
  background: #000000;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.3);
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
`

const CustomRoomWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  .tip {
    font-size: 18px;
    color: #ffffff;
  }
`

const TitleWrapper = styled.div`
  display: grid;
  width: 100%;

  .back-button {
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
    align-self: center;
    color: #ffffff;
  }

  h1 {
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
    align-self: center;
  }
`

const Title = styled.h1`
  font-size: 26px;
  color: #ffffff;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;

  img {
    border-radius: 8px;
    height: 120px;
  }
`

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #ff0000;
  }
`

const ProgressBar = styled(LinearProgress)`
  width: 360px;
  .MuiLinearProgress-bar {
    background-color: #ff0000;
  }
`

const StyledButton = styled(Button)`
  &.MuiButton-contained {
    background-color: #ff0000;
    color: #ffffff;
    &:hover {
      background-color: #cc0000;
    }
  }
  &.MuiButton-outlined {
    color: #ff0000;
    border-color: #ff0000;
    &:hover {
      border-color: #cc0000;
      color: #cc0000;
    }
  }
`

export default function RoomSelectionDialog() {
  const [showCustomRoom, setShowCustomRoom] = useState(false)
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined)

  const handleConnect = () => {
    if (lobbyJoined) {
      const bootstrap = phaserGame.scene.keys.bootstrap as Bootstrap
      bootstrap.network
        .joinOrCreatePublic()
        .then(() => bootstrap.launchGame())
        .catch((error) => console.error(error))
    } else {
      setShowSnackbar(true)
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false)
        }}
      >
        <Alert
          severity="error"
          variant="outlined"
          style={{ background: '#fdeded', color: '#ff0000' }}
        >
          Trying to connect to server, please try again!
        </Alert>
      </Snackbar>
      <Backdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Wrapper
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <AnimatePresence mode="wait">
            {showCreateRoomForm ? (
              <CustomRoomWrapper key="create-room">
                <TitleWrapper>
                  <IconButton className="back-button" onClick={() => setShowCreateRoomForm(false)}>
                    <ArrowBack />
                  </IconButton>
                  <Title>Create Custom Room</Title>
                </TitleWrapper>
                <CreateRoomForm />
              </CustomRoomWrapper>
            ) : showCustomRoom ? (
              <CustomRoomWrapper key="custom-room">
                <TitleWrapper>
                  <IconButton className="back-button" onClick={() => setShowCustomRoom(false)}>
                    <ArrowBack />
                  </IconButton>
                  <Title>
                    Custom Rooms
                    <Tooltip
                      title="We update the results in realtime, no refresh needed!"
                      placement="top"
                    >
                      <IconButton>
                        <HelpOutline className="tip" />
                      </IconButton>
                    </Tooltip>
                  </Title>
                </TitleWrapper>
                <CustomRoomTable />
                <StyledButton
                  variant="contained"
                  onClick={() => setShowCreateRoomForm(true)}
                >
                  Create new room
                </StyledButton>
              </CustomRoomWrapper>
            ) : (
              <motion.div
                key="main-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Title>Welcome to Tron<span className='text-red-600 font-semibold'>X</span>plore</Title>
                <Content>
                  <motion.img
                    src={logo}
                    alt="logo"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                  <StyledButton variant="contained" onClick={handleConnect}>
                    Connect to public lobby
                  </StyledButton>
                </Content>
              </motion.div>
            )}
          </AnimatePresence>
        </Wrapper>
        {!lobbyJoined && (
          <ProgressBarWrapper>
            <h3> Connecting to server...</h3>
            <ProgressBar color="secondary" />
          </ProgressBarWrapper>
        )}
      </Backdrop>
    </>
  )
}