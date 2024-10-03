import { Request, Response } from 'express'
import User, { IUser } from '../models/user.model'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // Return the existing user's tasksStatus
      res.status(200).json({
        message: 'User already exists',
        tasksStatus: existingUser.tasks_status
      });

    } else {
      // Create a new user if one doesn't exist
      const newUser: IUser = new User({
        username,
        address: null,
        is_signed_message: false,
        balance_shasta: null,
        send_trx_address_shasta: null,
        send_trx_amount_shasta: null,
        send_trx_txhash_shasta: null,
        stake_trx_amount: null,
        stake_trx_txhash: null,
        trc20mint_contract_address: null,
        trc20mint_tokensymbol: null,
        trc20mint_txhash: null,
        trc20_send_txhash_nile: null,
        trc20_send_blockno_nile: null,
        trc20_send_bandwidth_nile: null,
        user_score: 0,
        completed_at: null,
        NFT_hash: null,
        tasks_status: {
          is_create_wallet_task1: false,
          is_connect_wallet_task2: false,
          is_sign_tx_task3: false,
          is_get_trx_task4: false,
          is_send_trx_task5: false,
          is_check_bandwidth_task6: false,
          is_get_energy_task7: false,
          is_trc20_mint_task8: false,
          is_trc20_send_task9: false,
          is_view_transaction_task10: false,
        },
      });

      // Save the new user to the database
      await newUser.save();

      // Respond with success and return the created user ID
      res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    }
  } catch (error) {
    console.error('Error in user creation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//Task-1 create wallet by user
export const CreateWallet_Task1 = async (req: Request, res: Response) => {
  try {
    const { username } = req.body

    // Find the user by username and update the is_create_wallet_task1 field
    const updatedUser = await User.findOneAndUpdate(
      { username },
      {
        'tasks_status.is_create_wallet_task1': true,
        $inc: { user_score: 5 }, // Increment user_score by 5
      },
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the updated user data
    res.status(200).json({
      message: 'Wallet creation task marked complete and score updated',
      // user: updatedUser,
    })
  } catch (error) {
    console.error('Error updating task status:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//Task-2 connect wallet to site
export const Connectwalletaddress_Task2 = async (req: Request, res: Response) => {
  try {
    const { username, address } = req.body

    const updatedUser = await User.findOneAndUpdate(
      { username },
      {
        address, // Update the address field
        'tasks_status.is_connect_wallet_task2': true, // Mark task 2 as complete
        $inc: { user_score: 5 }, // Increment user_score by 5
      },
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the updated user data
    res.status(200).json({
      message: 'Address updated, wallet task complete, and score updated',
    })
  } catch (error) {
    console.error('Error updating address, task status, and score:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//Task-3 Sign message by user
export const SignMessage_Task3 = async (req: Request, res: Response) => {
  try {
    const { address, balance } = req.body

    // Find the user by address and update the necessary fields
    const updatedUser = await User.findOneAndUpdate(
      { address },
      {
        is_signed_message: true,
        balance_shasta: balance,
        'tasks_status.is_sign_tx_task3': true,
        $inc: { user_score: 5 },
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the updated user data
    res
      .status(200)
      .json({ message: 'Message signed, task 3 completed, and score updated', user: updatedUser })
  } catch (error) {
    console.error('Error updating message signing and task status:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//Task-4 to get trx by user in wallet
export const GetTrx_Task4 = async (req: Request, res: Response) => {
  try {
    const { address } = req.body

    // Find the user by address and update the necessary fields
    const updatedUser = await User.findOneAndUpdate(
      { address },
      {
        'tasks_status.is_get_trx_task4': true,
        $inc: { user_score: 5 },
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the updated user data
    res.status(200).json({ message: 'Get TRX task completed and score updated', user: updatedUser })
  } catch (error) {
    console.error('Error updating get TRX task and score:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//Task-5 send trx to another address
export const SendTrx_Task5 = async (req: Request, res: Response) => {
  try {
    const { address, recepient_address, amount, txhash } = req.body

    // Find the user by address and update the necessary fields
    const updatedUser = await User.findOneAndUpdate(
      { address },
      {
        send_trx_address_shasta: recepient_address,
        send_trx_amount_shasta: amount,
        send_trx_txhash_shasta: txhash,
        'tasks_status.is_send_trx_task5': true,
        $inc: { user_score: 5 },
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the updated user data
    res
      .status(200)
      .json({ message: 'Send TRX task completed and score updated', user: updatedUser })
  } catch (error) {
    console.error('Error updating send TRX task and score:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//Task-6 check bandwidth and energy by user
export const CheckBandwidth_Task6 = async (req: Request, res: Response) => {
  try {
    const { address } = req.body

    // Find the user by address and update the necessary fields
    const updatedUser = await User.findOneAndUpdate(
      { address },
      {
        'tasks_status.is_check_bandwidth_task6': true,
        $inc: { user_score: 5 },
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the updated user data
    res
      .status(200)
      .json({ message: 'Check bandwidth task completed and score updated', user: updatedUser })
  } catch (error) {
    console.error('Error updating check bandwidth task and score:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//Task-7 staking energy by user
export const StakeTrxAndEnergy_Task7 = async (req: Request, res: Response) => {
  try {
    const { address, txhash, amount } = req.body

    // Find the user by address and update the necessary fields
    const updatedUser = await User.findOneAndUpdate(
      { address },
      {
        stake_trx_txhash: txhash, // Update the transaction hash for staking
        stake_trx_amount: amount, // Update the staked amount
        'tasks_status.is_get_energy_task7': true, // Mark task 7 (get energy task) as complete
        $inc: { user_score: 5 }, // Increment user_score by 5
      },
      { new: true } // Return the updated document
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the updated user data
    res.status(200).json({
      message: 'Stake TRX and Get Energy task completed, score updated',
      user: updatedUser,
    })
  } catch (error) {
    console.error('Error updating staking and energy task:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//Task-8 mint TRC-20 token by user
export const Trc20Mint_Task8 = async (req: Request, res: Response) => {
  try {
    const { address, contract_address, token_symbol, txhash } = req.body

    // Find the user by address and update the necessary fields
    const updatedUser = await User.findOneAndUpdate(
      { address },
      {
        trc20mint_contract_address: contract_address,
        trc20mint_tokensymbol: token_symbol,
        trc20mint_txhash: txhash,
        'tasks_status.is_trc20_mint_task8': true,
        $inc: { user_score: 5 },
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the updated user data
    res
      .status(200)
      .json({ message: 'TRC20 mint task completed and score updated', user: updatedUser })
  } catch (error) {
    console.error('Error updating TRC20 mint task:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//Task-9 Send TRC20 mint token by user
export const Trc20Send_Task9 = async (req: Request, res: Response) => {
  try {
    const { address, txhash, blockno, bandwidth } = req.body

    // Find the user by address and update the necessary fields
    const updatedUser = await User.findOneAndUpdate(
      { address },
      {
        trc20_send_txhash_nile: txhash,
        trc20_send_blockno_nile: blockno,
        trc20_send_bandwidth_nile: bandwidth,
        'tasks_status.is_trc20_send_task9': true,
        $inc: { user_score: 5 },
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the updated user data
    res
      .status(200)
      .json({ message: 'TRC20 send task completed and score updated', user: updatedUser })
  } catch (error) {
    console.error('Error updating TRC20 send task:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//Task-10 View transaction by user
export const ViewTransaction_Task10 = async (req: Request, res: Response) => {
  try {
    const { address } = req.body

    // Find the user by address and update the necessary fields
    const updatedUser = await User.findOneAndUpdate(
      { address },
      {
        'tasks_status.is_view_transaction_task10': true,
        $inc: { user_score: 5 },
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Respond with the updated user data
    res.status(200).json({ message: 'View Transaction task completed ', user: updatedUser })
  } catch (error) {
    console.error('Error ViewTransaction TRC20', error)
    res.status(500).json({ message: 'Server error' })
  }
}

//Once user complete all task
export const updateNftAndCompleteTask = async (req: Request, res: Response) => {
  try {
    const { address, nft_hash } = req.body

    // Find the user by address and update the necessary fields
    const updatedUser = await User.findOneAndUpdate(
      { address },
      {
        NFT_hash: nft_hash,
        completed_at: new Date(),
        $inc: { user_score: 5 },
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Respond with the updated user data
    res
      .status(200)
      .json({ message: 'NFT updated, task completed, and score updated', user: updatedUser })
  } catch (error) {
    console.error('Error updating NFT and completing task:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
