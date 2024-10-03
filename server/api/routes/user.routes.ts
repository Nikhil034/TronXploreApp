
import express from 'express'
import { createUser } from '../controllers/user.controller'
import { CreateWallet_Task1 } from '../controllers/user.controller'
import { Connectwalletaddress_Task2 } from '../controllers/user.controller'
import { SignMessage_Task3 } from '../controllers/user.controller'
import { GetTrx_Task4 } from '../controllers/user.controller'
import { SendTrx_Task5 } from '../controllers/user.controller'
import { CheckBandwidth_Task6 } from '../controllers/user.controller'
import { StakeTrxAndEnergy_Task7 } from '../controllers/user.controller'
import { Trc20Mint_Task8 } from '../controllers/user.controller'
import { Trc20Send_Task9 } from '../controllers/user.controller'
import { ViewTransaction_Task10 } from '../controllers/user.controller'
import getRoutes from "./user.get.routes";



const router = express.Router()

router.post('/create', createUser)
router.patch('/user_task1', CreateWallet_Task1)
router.patch('/user_task2', Connectwalletaddress_Task2)
router.patch('/user_task3', SignMessage_Task3)
router.patch('/user_task4', GetTrx_Task4)
router.patch('/user_task5', SendTrx_Task5)
router.patch('/user_task6', CheckBandwidth_Task6)
router.patch('/user_task7', StakeTrxAndEnergy_Task7)
router.patch('/user_task8', Trc20Mint_Task8)
router.patch('/user_task9', Trc20Send_Task9)
router.patch('/user_task10', ViewTransaction_Task10)

router.use(getRoutes)


export default router
