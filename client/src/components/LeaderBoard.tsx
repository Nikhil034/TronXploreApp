import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Snackbar from '@mui/material/Snackbar'
import Tooltip from '@mui/material/Tooltip'

const fadeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%); }
  to { opacity: 1; transform: translate(-50%, -50%); }
`

const LeaderBoardWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1a1a1a;
  border-radius: 20px;
  padding: 32px;
  color: #ffffff;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-out;
  font-family: "Poppins", sans-serif;
  
  @media (min-width: 768px) {
    max-width: 80%;
    max-height: 80%;
  }

  &::-webkit-scrollbar {
  }

  &::-webkit-scrollbar-track {
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
`

const LeaderBoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ff4545;
`

const LeaderBoardTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #ff4545;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const LeaderBoardTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
`

const TableHeader = styled.th`
  text-align: left;
  padding: 16px;
  background-color: #2a2a2a;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

const TableRow = styled.tr`
    
  background-color: #2a2a2a;
  transition: all 0.3s ease-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(255, 69, 69, 0.2);
  }
`

const TableCell = styled.td`
  padding: 16px;
  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

const ActionButton = styled(IconButton)`
  color: #ffffff !important;
  transition: all 0.2s ease-out !important;
  
  &:hover {
    background-color: rgba(255, 69, 69, 0.1) !important;
    color: #ff4545 !important;
  }
`

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
`

const Address = styled.span`
  font-family: 'Roboto Mono', monospace;
`

const RankCell = styled(TableCell)`
 display:flex;
 justify-content: center;
 align-items:center;
//  padding:2px;
`
const Rank= styled.div`
color: #fff;
  background-color: #ff0000;
  border-radius:999px;
   font-weight: 700;
  font-size: 12px;
  width:30px;
  height:30px;
  display:flex;
  justify-content: center;
 align-items:center;
`

const ScoreCell = styled(TableCell)`
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
`

const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

interface LeaderBoardEntry {
  rank: number
  address: string
  score: number
  nftHash: string
}

interface LeaderBoardProps {
  onClose: () => void
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ onClose }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderBoardEntry[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    // Simulated data fetch - replace with actual API call
    const fetchData = async () => {
      const mockData: LeaderBoardEntry[] = [
        { rank: 1, address: '0x1234567890123456789012345678901234567890', score: 1000, nftHash: 'QmA1B2C3D4' },
        { rank: 2, address: '0x2345678901234567890123456789012345678901', score: 950, nftHash: 'QmB2C3D4E5' },
        { rank: 3, address: '0x3456789012345678901234567890123456789012', score: 900, nftHash: 'QmC3D4E5F6' },
        { rank: 4, address: '0x4567890123456789012345678901234567890123', score: 850, nftHash: 'QmD4E5F6G7' },
        { rank: 5, address: '0x5678901234567890123456789012345678901234', score: 800, nftHash: 'QmE5F6G7H8' },
        { rank: 6, address: '0x3456789012345678901234567890123456789012', score: 900, nftHash: 'QmC3D4E5F6' },
        { rank: 7, address: '0x4567890123456789012345678901234567890123', score: 850, nftHash: 'QmD4E5F6G7' },
        { rank: 9, address: '0x5678901234567890123456789012345678901234', score: 800, nftHash: 'QmE5F6G7H8' },
      ]
      setLeaderboardData(mockData)
    }
    fetchData()
  }, [])

  const handleCopy = (text: string, type: 'address' | 'nftHash') => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(`${type === 'address' ? 'Address' : 'NFT Hash'} copied to clipboard`)
      setSnackbarOpen(true)
    })
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <LeaderBoardWrapper>
      <LeaderBoardHeader>
        <LeaderBoardTitle>Leader Board</LeaderBoardTitle>
        <ActionButton onClick={onClose} size="small">
          <CloseIcon />
        </ActionButton>
      </LeaderBoardHeader>
      <LeaderBoardTable>
        <thead>
          <tr>
            <TableHeader>Rank</TableHeader>
            <TableHeader>User Address</TableHeader>
            <TableHeader>Score</TableHeader>
            <TableHeader>NFT Hash</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry) => (
            <TableRow key={entry.rank}>
              <RankCell><Rank>{entry.rank}</Rank></RankCell>
              <TableCell>
                <AddressContainer>
                  <Address>{truncateAddress(entry.address)}</Address>
                  <Tooltip title="Copy Address">
                    <ActionButton onClick={() => handleCopy(entry.address, 'address')}>
                      <ContentCopyIcon fontSize="small" />
                    </ActionButton>
                  </Tooltip>
                  
                </AddressContainer>
              </TableCell>
              <ScoreCell>{entry.score}</ScoreCell>
              <TableCell>
                <AddressContainer>
                  <Address>{truncateAddress(entry.nftHash)}</Address>
                  <Tooltip title="Copy NFT Hash">
                    <ActionButton size="small" onClick={() => handleCopy(entry.nftHash, 'nftHash')}>
                      <ContentCopyIcon fontSize="small" />
                    </ActionButton>
                  </Tooltip>
                </AddressContainer>
              </TableCell>
              <TableCell>
                <Tooltip title="View Details">
                  <ActionButton size="small">
                    <VisibilityIcon />
                  </ActionButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </LeaderBoardTable>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </LeaderBoardWrapper>
  )
}

export default LeaderBoard