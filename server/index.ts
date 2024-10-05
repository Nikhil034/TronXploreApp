import http from 'http'
import https from 'https'
import express from 'express'
import cors from 'cors'
import { Server, LobbyRoom } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import { RoomType } from '../types/Rooms'
import { SkyOffice } from './rooms/SkyOffice'
import fs from 'fs'
import userRoutes from './api/routes/user.routes'
import connectDB from './api/config/db'

const port = Number(process.env.PORT || 2567)
const app = express()

connectDB();

const corsOptions = {
  origin: "*",
  methods: ['GET', 'POST','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization',],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/users', userRoutes);

let server;

if (process.env.NODE_ENV === 'production') {
  // HTTPS server for production
  const privateKey = fs.readFileSync('/path/to/privkey.pem', 'utf8')
  const certificate = fs.readFileSync('/path/to/cert.pem', 'utf8')
  const credentials = { key: privateKey, cert: certificate }
  server = https.createServer(credentials, app)
} else {
  // HTTP server for development
  server = http.createServer(app)
}

const gameServer = new Server({
  server,
})

// register room handlers
gameServer.define(RoomType.LOBBY, LobbyRoom)
gameServer.define(RoomType.PUBLIC, SkyOffice, {
  name: 'Public Lobby',
  description: 'Prepare to embark on an exciting journey where fun meets tron blockchain!',
  password: null,
  autoDispose: false,
})
gameServer.define(RoomType.CUSTOM, SkyOffice).enableRealtimeListing()

app.use('/colyseus', monitor())

gameServer.listen(port)

console.log(`Listening on ${process.env.NODE_ENV === 'production' ? 'wss' : 'ws'}://localhost:${port}`)