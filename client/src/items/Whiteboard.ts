import { ItemType } from '../../../types/Items'
import store from '../stores'
import Item from './Item'
import Network from '../services/Network'
import { openWhiteboardDialog } from '../stores/WhiteboardStore'

declare global {
  interface Window {
    tronWeb: any;
  }
}

const newABI = [
  {
    inputs: [
      { indexed: true, name: 'tokenAddress', type: 'address' },
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { indexed: true, name: 'owner', type: 'address' },
      { name: 'initialSupply', type: 'uint256' },
    ],
    name: 'TokenCreated',
    type: 'Event',
  },
  {
    outputs: [{ type: 'address' }],
    inputs: [{ type: 'uint256' }],
    name: 'allTokens',
    stateMutability: 'View',
    type: 'Function',
  },
  {
    outputs: [{ type: 'address' }],
    inputs: [
      { name: 'name_', type: 'string' },
      { name: 'symbol_', type: 'string' },
      { name: 'initialOwner', type: 'address' },
      { name: 'initialSupply', type: 'uint256' },
    ],
    name: 'createToken',
    stateMutability: 'Nonpayable',
    type: 'Function',
  },
  {
    outputs: [{ type: 'address[]' }],
    name: 'getAllTokens',
    stateMutability: 'View',
    type: 'Function',
  },
]

export default class Whiteboard extends Item {
  id?: string
  currentUsers = new Set<string>()

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.itemType = ItemType.WHITEBOARD
  }

  private updateStatus() {
    if (!this.currentUsers) return
    const numberOfUsers = this.currentUsers.size
    this.clearStatusBox()
    if (numberOfUsers === 1) {
      this.setStatusBox(`${numberOfUsers} user`)
    } else if (numberOfUsers > 1) {
      this.setStatusBox(`${numberOfUsers} users`)
    }
  }

  addCurrentUser(userId: string) {
    if (!this.currentUsers || this.currentUsers.has(userId)) return
    this.currentUsers.add(userId)
    this.updateStatus()
  }

  removeCurrentUser(userId: string) {
    if (!this.currentUsers || !this.currentUsers.has(userId)) return
    this.currentUsers.delete(userId)
    this.updateStatus()
  }
}
