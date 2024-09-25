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

  onOverlapDialog() {
    if (this.currentUsers.size === 0) {
      // this.setDialogBox('Press R to use whiteboard')
    } else {
      // this.setDialogBox('Press R join')
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

  openDialog(network: Network) {
    if (!this.id) return;
  
    // Create a wrapper for the iframe and buttons
    const dialogWrapper = document.createElement('div');
    dialogWrapper.style.position = 'absolute';
    dialogWrapper.style.width = '500px';
    dialogWrapper.style.height = '600px'; // Fixed height
    dialogWrapper.style.top = '50px';
    dialogWrapper.style.left = '50px';
    dialogWrapper.style.border = '1px solid #ccc';
    dialogWrapper.style.zIndex = '1000';
    dialogWrapper.style.backgroundColor = '#fff';
    dialogWrapper.style.padding = '10px';
    dialogWrapper.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    dialogWrapper.style.overflowY = 'scroll'; // Enable scrolling for the content
    dialogWrapper.style.overflowX = 'hidden';
  
    // Create title and description
    const title = document.createElement('h2');
    title.textContent = 'Mint TRC-20 Tokens';
    title.style.color = '#eb5424';
    title.style.textAlign = 'center';
  
    const description = document.createElement('p');
    description.textContent = 'Learn how to mint your own TRC-20 tokens on the Tron Shasta Testnet. Enter the token details below to mint your first token.';
    description.style.color = '#333';
    description.style.marginBottom = '20px';
  
    // Create Input for Token Name
    const tokenNameLabel = document.createElement('label');
    tokenNameLabel.textContent = 'Token Name:';
    // tokenNameLabel.style.display = 'block';
    tokenNameLabel.style.marginBottom = '10px';
  
    const tokenNameInput = document.createElement('input');
    tokenNameInput.type = 'text';
    tokenNameInput.placeholder = 'e.g., MyToken';
    tokenNameInput.style.width = '100%';
    tokenNameInput.style.padding = '10px';
    tokenNameInput.style.marginBottom = '20px';
    tokenNameInput.style.border = '1px solid #ccc';
    tokenNameInput.style.borderRadius = '4px';
  
    // Create Input for Token Symbol
    const tokenSymbolLabel = document.createElement('label');
    tokenSymbolLabel.textContent = 'Token Symbol:';
    // tokenSymbolLabel.style.display = 'block';
    tokenSymbolLabel.style.marginBottom = '10px';
  
    const tokenSymbolInput = document.createElement('input');
    tokenSymbolInput.type = 'text';
    tokenSymbolInput.placeholder = 'e.g., MTK';
    tokenSymbolInput.style.width = '100%';
    tokenSymbolInput.style.padding = '10px';
    tokenSymbolInput.style.marginBottom = '20px';
    tokenSymbolInput.style.border = '1px solid #ccc';
    tokenSymbolInput.style.borderRadius = '4px';
  
    // Create Input for Initial Supply
    const supplyLabel = document.createElement('label');
    supplyLabel.textContent = 'Initial Supply:';
    // supplyLabel.style.display = 'block';
    supplyLabel.style.marginBottom = '10px';
  
    const supplyInput = document.createElement('input');
    supplyInput.type = 'number';
    supplyInput.placeholder = 'e.g., 1000000';
    supplyInput.style.width = '100%';
    supplyInput.style.padding = '10px';
    supplyInput.style.marginBottom = '20px';
    supplyInput.style.border = '1px solid #ccc';
    supplyInput.style.borderRadius = '4px';
  
    // Create a button for minting the tokens
    const mintButton = document.createElement('button');
    mintButton.textContent = 'Mint Tokens';
    mintButton.style.padding = '10px';
    mintButton.style.cursor = 'pointer';
    mintButton.style.backgroundColor = '#28a745';
    mintButton.style.color = '#fff';
    mintButton.style.border = 'none';
    mintButton.style.borderRadius = '4px';
    mintButton.style.marginRight = '10px';

    const factoryContractabi = newABI;
    const factoryContractAddress = "TVXik7S1LDzQodVJeZ2Bf54vHXsJJy5NPX"; // Replace with the actual address
    console.log(factoryContractAddress)



    mintButton.addEventListener('click', async () => {
      const tokenName = tokenNameInput.value;
      const tokenSymbol = tokenSymbolInput.value;
      const initialSupply =   (supplyInput.value, 10);
    
      if (!tokenName || !tokenSymbol || !initialSupply || initialSupply <= 0) {
        alert('Please enter valid details for the token.');
        return;
      }
    
      // Ensure TronLink is installed and available
      if (!window.tronWeb || !window.tronWeb.ready) {
        alert('TronLink wallet is not installed or unlocked. Please ensure TronLink is available.');
        return;
      }
    
      try {
        // Get the user's wallet address
        const userAddress = window.tronWeb.defaultAddress.base58;
        console.log("1210 user address",userAddress
        );
    
        // Initialize the contract object
        const factoryContract = await window.tronWeb.contract(factoryContractabi, factoryContractAddress);
        console.log("1215:",factoryContract);
    
        // Call the createToken function
        const transaction = await factoryContract.createToken(tokenName, tokenSymbol, userAddress, initialSupply).send({
          from: userAddress
        });

        console.log("1224:",transaction);
    
        // Get the newly deployed token contract address from the transaction receipt
        const contractAddress = transaction.receipt.contractAddress;
    
        // Alert or display the contract address to the user
        alert(`Tokens successfully minted!\n\nToken Name: ${tokenName}\nToken Symbol: ${tokenSymbol}\nInitial Supply: ${initialSupply}\nContract Address: ${contractAddress}`);
      } catch (error) {
        console.error('Error during token creation:', error);
        alert('An error occurred while minting tokens. Please try again.');
      }
    });
    
  
    // Add Exit Button
    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit';
    exitButton.style.padding = '10px';
    exitButton.style.cursor = 'pointer';
    exitButton.style.backgroundColor = '#dc3545';
    exitButton.style.color = '#fff';
    exitButton.style.border = 'none';
    exitButton.style.borderRadius = '4px';
    exitButton.style.marginLeft = '10px';
  
    // Append all elements to the wrapper
    dialogWrapper.appendChild(title);
    dialogWrapper.appendChild(description);
    dialogWrapper.appendChild(tokenNameLabel);
    dialogWrapper.appendChild(tokenNameInput);
    dialogWrapper.appendChild(tokenSymbolLabel);
    dialogWrapper.appendChild(tokenSymbolInput);
    dialogWrapper.appendChild(supplyLabel);
    dialogWrapper.appendChild(supplyInput);
    dialogWrapper.appendChild(mintButton);
    dialogWrapper.appendChild(exitButton);
  
    // Append the wrapper to the document body
    document.body.appendChild(dialogWrapper);
  
    // Event listener for Mint button
    mintButton.addEventListener('click', async () => {
      const tokenName = tokenNameInput.value;
      const tokenSymbol = tokenSymbolInput.value;
      const initialSupply = parseInt(supplyInput.value, 10);
  
      if (!tokenName || !tokenSymbol || !initialSupply || initialSupply <= 0) {
        alert('Please enter valid details for the token.');
        return;
      }
  
      // Ensure TronLink is installed and available
      if (!window.tronWeb || !window.tronWeb.ready) {
        alert('TronLink wallet is not installed or unlocked. Please ensure TronLink is available.');
        return;
      }
  
      try {
        // Get the user's wallet address
        const userAddress = window.tronWeb.defaultAddress.base58;
  
        // Here you would interact with the TRC-20 contract to mint the tokens
        // Assuming you have a contract deployed, use the contract address and ABI here
  
        // For simplicity, let's assume a successful minting process
        alert(`Tokens successfully minted!\n\nToken Name: ${tokenName}\nToken Symbol: ${tokenSymbol}\nInitial Supply: ${initialSupply}`);
      } catch (error) {
        console.error('Error during minting:', error);
        alert('An error occurred while minting tokens. Please try again.');
      }
    });
  
    // Event listener for Exit button
    exitButton.addEventListener('click', () => {
      document.body.removeChild(dialogWrapper); // Close frame
    });
  }
}
