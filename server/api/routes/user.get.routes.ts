import express from 'express'
import { getAllUsers, getUserById, getUserByAddress } from '../controllers/user.get.controller'
import { getTaskStatusByUsername } from '../controllers/user.get.controller'
import { SendTrxTxhashShasta } from '../controllers/user.get.controller'
import { GetTrc20MintContract } from '../controllers/user.get.controller'
import { Trc20SendTxhashNileByAddress } from '../controllers/user.get.controller'
import { Trc20SendBlockAndBandwidth } from '../controllers/user.get.controller'

const router = express.Router()

// Get all users
router.get('/users', getAllUsers)

// Route to get tasks_status by username
router.get('/:username/tasks-status', getTaskStatusByUsername)

// Get user by ID
router.get('/user/:id', getUserById)

// Get user by wallet address
router.get('/address/:address', getUserByAddress)

// Route to get send_trx_txhash_shasta by address
router.get('/:address/send-trx-txhash-shasta', SendTrxTxhashShasta)

// Route to get trc20mint_contract_address by address
router.get('/:address/trc20mintcontract', GetTrc20MintContract)

// Route to get trc20_send_txhash_nile by address
router.get('/:address/trc20-send-txhash-nile', Trc20SendTxhashNileByAddress)

// Route to get trc20_send_blockno_nile and trc20_send_bandwidth_nile by address
router.get('/:address/trc20-send-blockno-bandwidth', Trc20SendBlockAndBandwidth)

export default router
