import { Request, Response } from 'express'
import User from '../models/user.model'

// Get tasks_status by username
export const getTaskStatusByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username }, { tasks_status: 1, _id: 0 })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Return the tasks_status object
    res.status(200).json(user.tasks_status)
  } catch (error) {
    console.error('Error fetching tasks_status by username:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get all users with specific fields: address, user_score, NFT_hash, completed_at (for leaderboard)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { address: 1, user_score: 1, NFT_hash: 1, completed_at: 1 })
    res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching all users:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get send_trx_txhash_shasta by address
export const SendTrxTxhashShasta = async (req: Request, res: Response) => {
  try {
    const { address } = req.params

    const user = await User.findOne({ address }, { balance_shasta: 1, _id: 0 })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Return the send_trx_txhash_shasta field
    res.status(200).json({ balance_shasta: user.balance_shasta })
  } catch (error) {
    console.error('Error fetching send_trx_txhash_shasta by address:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get balance_shasta by address
export const getBalanceShastaByAddress = async (req: Request, res: Response) => {
  try {
    const { address } = req.params

    const user = await User.findOne({ address }, { balance_shasta: 1, _id: 0 })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Return the balance_shasta field
    res.status(200).json({ balance_shasta: user.balance_shasta })
  } catch (error) {
    console.error('Error fetching balance_shasta by address:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get trc20mint_contract_address by address
export const GetTrc20MintContract = async (req: Request, res: Response) => {
  try {
    const { address } = req.params
    const user = await User.findOne({ address }, { trc20mint_contract_address: 1, _id: 0 })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Return the trc20mint_contract_address field
    res.status(200).json({ trc20mint_contract_address: user.trc20mint_contract_address })
  } catch (error) {
    console.error('Error fetching trc20mint_contract_address by address:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get trc20_send_txhash_nile by address
export const Trc20SendTxhashNileByAddress = async (req: Request, res: Response) => {
  try {
    const { address } = req.params
    const user = await User.findOne({ address }, { trc20_send_txhash_nile: 1, _id: 0 })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Return the trc20_send_txhash_nile field
    res.status(200).json({ trc20_send_txhash_nile: user.trc20_send_txhash_nile })
  } catch (error) {
    console.error('Error fetching trc20_send_txhash_nile by address:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get trc20_send_blockno_nile and trc20_send_bandwidth_nile by address
export const Trc20SendBlockAndBandwidth = async (req: Request, res: Response) => {
  try {
    const { address } = req.params

    // Find the user by address and project only trc20_send_blockno_nile and trc20_send_bandwidth_nile
    const user = await User.findOne(
      { address },
      { trc20_send_blockno_nile: 1, trc20_send_bandwidth_nile: 1, _id: 0 }
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Return the trc20_send_blockno_nile and trc20_send_bandwidth_nile fields
    res.status(200).json({
      trc20_send_blockno_nile: user.trc20_send_blockno_nile,
      trc20_send_bandwidth_nile: user.trc20_send_bandwidth_nile,
    })
  } catch (error) {
    console.error('Error fetching trc20_send_blockno_nile and trc20_send_bandwidth_nile:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get user by address
export const getUserByAddress = async (req: Request, res: Response) => {
  try {
    const { address } = req.params
    const user = await User.findOne({ address })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching user by address:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
