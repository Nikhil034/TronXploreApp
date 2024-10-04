import { Request, Response } from 'express'
import Tronweb, { TronWeb } from 'tronweb';
import User from '../models/user.model'
import dotenv from 'dotenv';

dotenv.config();

//  // Initialize TronWeb for the Nile Testnet
 const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io',  // Nile Testnet RPC URL
  privateKey: process.env.PRIVATE_KEY  
});


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
    // Fetch users and sort by user_score (desc) and completed_at (asc)
    const users = await User.find(
      {}, 
      { address: 1, user_score: 1, NFT_hash: 1, completed_at: 1 }
    ).sort({ 
      user_score: -1, // Sort by user_score in descending order (higher score first)
      completed_at: 1 // Sort by completed_at in ascending order (earlier completion first)
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Server error' });
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

//fetch symbol of trc20 token address
export const TRC20tokenAddress = async (req: Request, res: Response) => {

  // ABI for TRC-20 functions to fetch token details
  const abi = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "string" }],
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "string" }],
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      type: "function"
    }
  ];

  try {
    // Extract TRC-20 contract address from request parameters
    const { trc20address } = req.params;

    // Validate the token address (Tron addresses usually start with "T")
    if (!tronWeb.isAddress(trc20address)) {
      return res.status(400).json({ message: 'Invalid TRC-20 token address' });
    }
    
    const defaultAddress = await tronWeb.defaultAddress.base58;
    if (!defaultAddress) {
      throw new Error('No default address set');
    }

    // Create a contract instance
    const contract = await tronWeb.contract(abi, trc20address);

    // Fetch token details
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    const decimals = await contract.methods.decimals().call();
    const supply = await contract.methods.totalSupply().call();

    // Send the response
    res.status(200).json({
      name,
      symbol,
      decimals: decimals.toString(),
      supply:supply.toString() // Convert to string
    });
  } catch (error) {
    console.error('Error fetching token details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


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
