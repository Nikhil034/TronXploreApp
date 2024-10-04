import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Snackbar from '@mui/material/Snackbar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Pagination from '@mui/material/Pagination'
import axios from 'axios' 

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
  address: string | null; // Allowing null as observed in your log
  user_score: number;
  completed_at: string | null; // Allowing null as observed in your log
  NFT_hash: string | null; // Allowing null as observed in your log
  _id: string;
}

interface LeaderBoardProps {
  onClose: () => void
}

const SearchContainer = styled.div`
  margin-bottom: 20px;
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

interface LeaderBoardEntry {
  address: string | null;
  user_score: number;
  completed_at: string | null;
  _id: string;
}

interface LeaderBoardProps {
  onClose: () => void
}


const LeaderBoard: React.FC<LeaderBoardProps> = ({ onClose }) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderBoardEntry[]>([])
  const [filteredData, setFilteredData] = useState<LeaderBoardEntry[]>([])
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<LeaderBoardEntry[]>('https://api.tronxplore.blockchainbytesdaily.com/api/users/users');
      setLeaderboardData(response.data);
      setFilteredData(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    }
    fetchData()
  }, [])

  useEffect(() => {
    const filtered = leaderboardData.filter(entry => 
      entry.address && entry.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setPage(1);
  }, [searchTerm, leaderboardData]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage('Address copied to clipboard');
      setSnackbarOpen(true);
    });
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <LeaderBoardWrapper>
      <LeaderBoardHeader>
        <LeaderBoardTitle>Leader Board</LeaderBoardTitle>
        <ActionButton onClick={onClose} size="small">
          <CloseIcon />
        </ActionButton>
      </LeaderBoardHeader>
      <SearchContainer>
        <TextField
          fullWidth
          variant="outlined"
          label="Search by address"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      <LeaderBoardTable>
        <thead>
          <tr>
            <TableHeader>Rank</TableHeader>
            <TableHeader>User Address</TableHeader>
            <TableHeader>Score</TableHeader>
            <TableHeader>Completed At</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((entry, index) => (
            <TableRow key={entry._id}>
              <RankCell><Rank>#{(page - 1) * itemsPerPage + index + 1}</Rank></RankCell>
              <TableCell>
                <AddressContainer>
                  <Address>{entry.address ? truncateAddress(entry.address) : 'No Address'}</Address>
                  <Tooltip title="Copy Address">
                    <ActionButton onClick={() => entry.address && handleCopy(entry.address)} disabled={!entry.address}>
                      <ContentCopyIcon fontSize="small" />
                    </ActionButton>
                  </Tooltip>
                </AddressContainer>
              </TableCell>
              <ScoreCell>{entry.user_score}</ScoreCell>
              <TableCell>
                {entry.completed_at ? new Date(entry.completed_at).toLocaleString() : 'Not Completed'}
              </TableCell>
              <TableCell>
                {entry.completed_at ? (
                  <Tooltip title="View in Explorer">
                    <ActionButton size="small" onClick={() => window.open(`https://explorer.example.com/address/${entry.address}`, '_blank')}>
                      <OpenInNewIcon />
                    </ActionButton>
                  </Tooltip>
                ) : (
                  <span>N/A</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </LeaderBoardTable>
      <PaginationContainer>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange} 
          color="primary" 
        />
      </PaginationContainer>
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
