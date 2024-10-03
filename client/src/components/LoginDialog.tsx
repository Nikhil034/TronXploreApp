import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

import Adam from '../images/login/Adam_login.png'
import Ash from '../images/login/Ash_login.png'
import Lucy from '../images/login/Lucy_login.png'
import Nancy from '../images/login/Nancy_login.png'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setLoggedIn } from '../stores/UserStore'

import phaserGame from '../PhaserGame'
import Game from '../scenes/Game'
import axios from 'axios';
import Cookies from 'js-cookie';

const Wrapper = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000000;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  font-family: 'Poppins', sans-serif;

  &:hover {
    box-shadow: 0px 0px 25px rgba(255, 0, 0, 0.5);
  }
`

const Title = styled.p`
  margin: 7px;
  font-size: 30px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
`

const RoomDescription = styled.div`
  max-width: 500px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-size: 16px;
  color: #ffffff;
  display: flex;
  justify-content: center;
`

const SubTitle = styled.h3`
  width: 160px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
`

const Content = styled.div`
  display: flex;
  margin: 15px 0 36px 0;
  flex-direction: column;
  align-items: center;
`

const Left = styled.div`
  --swiper-navigation-size: 24px;
  --swiper-navigation-color: #ff0000;

  .swiper {
    width: 160px;
    height: 220px;
    border-radius: 8px;
    overflow: hidden;
  }

  .swiper-slide {
    width: 160px;
    height: 220px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
  }

  .swiper-slide img {
    display: block;
    width: 95px;
    height: 136px;
    object-fit: contain;
  }
`

const Right = styled.div`
  margin-top: 20px;
  width: 300px;
  font-family: 'Poppins', sans-serif;

  .MuiTextField-root {
    .MuiOutlinedInput-root {
      fieldset {
        border-color: #ffffff;
      }
      &:hover fieldset {
        border-color: #ff0000;
      }
      &.Mui-focused fieldset {
        border-color: #ff0000;
      }
    }
    .MuiInputLabel-root {
      color: #ffffff;
      &.Mui-focused {
        color: #ff0000;
      }
    }
    input {
      color: #ffffff;
    }
  }
`

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled(Button)`
  &.MuiButton-contained {
    background-color: #ff0000;
    color: #ffffff;
    &:hover {
      background-color: #cc0000;
    }
  }
`

const avatars = [
  { name: 'adam', img: Adam },
  { name: 'ash', img: Ash },
  { name: 'lucy', img: Lucy },
  { name: 'nancy', img: Nancy },
]

// shuffle the avatars array
for (let i = avatars.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1))
  ;[avatars[i], avatars[j]] = [avatars[j], avatars[i]]
}

export default function LoginDialog() {
  const [name, setName] = useState<string>('')
  const [avatarIndex, setAvatarIndex] = useState<number>(0)
  const [nameFieldEmpty, setNameFieldEmpty] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const roomJoined = useAppSelector((state) => state.room.roomJoined)
  const roomDescription = useAppSelector((state) => state.room.roomDescription)
  const game = phaserGame.scene.keys.game as Game

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name === '') {
      setNameFieldEmpty(true)
    } 

      else if (roomJoined) {
      console.log('Join! Name:', name, 'Avatar:', avatars[avatarIndex].name)
      const response = await axios.post('https://api.tronxplore.blockchainbytesdaily.com/api/users/create', { username: name });
      const { tasksStatus, message } = response.data;
      // If the user exists, store the tasksStatus in localStorage
      if (tasksStatus) {
        localStorage.setItem('tasks_status', JSON.stringify(tasksStatus));
        // console.log('User exists, tasksStatus saved to localStorage:', tasksStatus);
      }
      // console.log(message);
      Cookies.set('username', name, { expires: 10 });
      game.registerKeys()
      game.myPlayer.setPlayerName(name)
      game.myPlayer.setPlayerTexture(avatars[avatarIndex].name)
      game.network.readyToConnect()
      dispatch(setLoggedIn(true))
    }
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Title>Create Your Learning Profile</Title>
      <RoomDescription>
        <ArrowRightIcon style={{ color: '#ff0000' }} /> {roomDescription}
      </RoomDescription>
      <Content>
        <Left>
          <SubTitle>Choose your avatar</SubTitle>
          <Swiper
            modules={[Navigation, EffectFade]}
            navigation
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setAvatarIndex(swiper.activeIndex)
            }}
          >
            {avatars.map((avatar) => (
              <SwiperSlide key={avatar.name}>
                <img src={avatar.img} alt={avatar.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Left>
        <Right>
          <TextField
            autoFocus
            fullWidth
            label="Name Must be unique"
            variant="outlined"
            error={nameFieldEmpty}
            helperText={nameFieldEmpty && 'Name is required'}
            onInput={(e) => {
              setName((e.target as HTMLInputElement).value)
              setNameFieldEmpty(false) 
            }}
          />
        </Right>
      </Content>
      <Bottom>
        <StyledButton variant="contained" size="large" type="submit">
          Start Adventure
        </StyledButton>
      </Bottom>
    </Wrapper>
  )
}