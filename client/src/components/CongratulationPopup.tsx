import React, { useEffect, useState } from 'react'
import styled ,{keyframes} from 'styled-components'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import logo from '../images/logo.png'
import lighthouse from '@lighthouse-web3/sdk';
import toast, { Toaster } from 'react-hot-toast'
import { ScaleLoader } from 'react-spinners'
import {X} from 'lucide-react'

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter:blur(3px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 50;
  overflow:hidden;
`
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 100;
  padding: 10px;
  border-radius: 50%;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  svg {
    color: #fff; // Change this color to match your design
  }
`;

const StepList = styled.ol`
  text-align: left;
  margin-top: 20px;
  padding-left: 20px;
`

const StepItem = styled.li`
  margin-bottom: 10px;
`
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  top:0;
  left:0;
  pointer-events:auto;
  height: 100%;
  width:100%;
  // overflow: hidden;
`


const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`

const Wrapper = styled(motion.div)`
  background: #000000;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.3);
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  max-width: 650px;
  position:relative;
//   width: 90%;
`


const Logo = styled.img`
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
  border-radius: 8px;
`


const Title = styled.h1`
  font-size: 36px;
  color: #ffffff;
  margin-bottom: 16px;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  span {
    color: #ff0000;
  }
`


const Description = styled.p`
  font-size: 15px;
  color: #ffffff;
  margin-bottom: 32px;
  line-height: 1.5;
`


const Button = styled(motion.button)`
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 16px;
  width: 100%;
  transition: background-color 0.3s ease;


  &:hover {
    background-color: #cc0000;
  }
`


const TransactionLink = styled(motion.a)`
  color: #ff0000;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`

const List = styled.ol`
  padding-left: 20px;
  counter-reset: item;
  list-style-type: none;
  margin-bottom: 50px;
`

const slideIn = keyframes`
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const ListItem = styled.li`
  margin-bottom: 20px;
  opacity: 0;
  transform: translateX(-20px);
  animation: ${slideIn} 0.5s ease-out forwards;
  position: relative;
  padding-left: 40px;
  text-align: left;
  &::before {
    content: counter(item);
    counter-increment: item;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(45deg, #ff0000, #cc0000);
    color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(255, 0, 0, 0.3);
  }
`


const Subtitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: left;
//   color: #ff6666;
color: #ff0000;
`

const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
`

const HighlightedText = styled(Text)`
  margin-bottom: 15px;
  text-align:left;
  background-color: rgb(82 79 79 / 80%);
  padding: 20px;
  border-left: 4px solid #cc0000;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`
const CongratulationsPopup = ({ onClose }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const [showTransaction, setShowTransaction] = useState(false)
  const [isCertified, setIsCertified] = useState(false)
  const [nftHash, setNftHash] = useState(null)
  const [userAddress, setUserAddress] = useState(null)
  const [showSteps, setShowSteps] = useState(false)
  const [loading, setLoading] = useState(false);

  const progressCallback = (progressData) => {
    let total = Number(progressData?.total) || 1;  // Ensure total is a valid number and prevent division by zero
    let uploaded = Number(progressData?.uploaded) || 0; 
    let percentageDone = 100 - (uploaded / total) * 100; // Calculate percentage properly
    // console.log(`Upload Progress: ${percentageDone.toFixed(2)}%`); // Fix to two decimals
  };

   useEffect(() => {
    const load=import.meta.env;
  }, [])


  const handleMintCertificate = async () => {
    // setLoading(true)
    try {
      await uploadFileAndMint()
      setShowTransaction(true)
      setIsCertified(true)
    } catch (error) {
      // console.error('Error minting certificate:', error)
      toast.error('Failed to mint certificate. Please try again.')
      setLoading(false);
    } finally {
      setLoading(false)
    }
  }

  const uploadFileAndMint = async () => {
    try {
      // Now store the metadata (title, description, and image URL)
      setLoading(true);
      const metadata = {
        name:'TronXplore Task Master Certificate',
        description:'This NFT is awarded to users who have successfully completed all tasks related to the Tron blockchain on the TronXplore platform. It certifies the holder’s dedication, knowledge, and accomplishment in exploring and interacting with the Tron ecosystem.',
        image: 'https://gateway.lighthouse.storage/ipfs/bafkreifsm6mzjbpo3e2nmij3y2jfnbcvaiwj6gvybc77mzd2gl52izstvi',
      };

      // Create a blob for the metadata JSON object
      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: 'application/json',
      });

      const LighthouseKey=import.meta.env.VITE_LIGHTHOUSE_ID;
      if(LighthouseKey){
        console.log('TRUE');
      }
      // console.log(LighthouseKey)

      // Upload metadata JSON to Lighthouse (inside an array)
      const metadataUploadResponse = await lighthouse.upload(
        [metadataBlob], // Pass metadata as an array
        LighthouseKey, 
        undefined,
        progressCallback
      );

      // Get the CID for the metadata
      const metadataCID = metadataUploadResponse.data.Hash;
      // console.log('Metadata successfully uploaded.');

      // console.log('Metadata CID:', metadataCID);
      // console.log('Visit metadata at:', `https://gateway.lighthouse.storage/ipfs/${metadataCID}`);

      // After uploading, mint the NFT with the contract
      if(metadataCID){
         const url=`https://gateway.lighthouse.storage/ipfs/${metadataCID}`;
         await mintNFT(url);
      }
    } catch (error) {
      console.error('Error uploading file or minting NFT:', error);
      setLoading(false);
    //   setStatus('Error uploading or minting.');
    }
  };

  // Function to mint NFT using window.tronWeb
  const mintNFT = async (metadataURI:string) => {
    try {
      // Check if window.tronWeb is available

      const contractAddress = 'TFGufR9X3i3yHkdKuHJxwjyh8UD9DfXdKo';

      if (typeof window !== 'undefined' && window.tronWeb) {
        const tronWeb = window.tronWeb;
        const address=tronWeb.defaultAddress.base58;
        // console.log(address);

        // Get the contract instance
        const contract = await tronWeb.contract().at(contractAddress);

        // Mint the NFT using the safeMint function (address + metadataURI)
        const result = await contract.safeMint(
         address,// Replace with user's Tron address
          metadataURI
        ).send({ from: tronWeb.defaultAddress.base58 });

        // Set the transaction hash and display it

        const transactionHash = result.txID; // Access the transaction hash from the result
        console.log('Transaction Hash:', transactionHash);
        console.log('Transaction Hash:', result);
        setNftHash(result);
        const respose=await axios.patch('https://api.tronxplore.blockchainbytesdaily.com/api/users/user_nft',{
            address:address,
            nft_hash:result,   
        });
        if(respose.data){
            toast.success('🏆 Congrats! You’ve just earned your certificate as an NFT!',{position: 'top-center'});
        }
        setLoading(false);
        // setShowSteps(true);
        // setIsCertified(true);
        // setShowTransaction(true);
      } else {
        console.error('TronWeb is not available.');
        toast.error('TronWeb is not available. Please install TronLink.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }


    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  useEffect(() => {
    const fetchUserData = async () => {
      if (window.tronWeb && window.tronWeb.ready) {
        // console.log(import.meta.env.VITE_LIGHTHOUSE_ID)
        const address = (window as any).tronWeb.defaultAddress.base58
        try {
          setUserAddress(address)


          // Call the API to get user data
          const response = await axios.get(
            'https://api.tronxplore.blockchainbytesdaily.com/api/users/users'
          )
          // console.log(response);
          const users = response.data


          // Check if the connected user has an NFT hash
          const user = users.find((u: any) => u.address === address)


          if (user && user.NFT_hash) {
            setIsCertified(true)
            setNftHash(user.NFT_hash)
            setShowTransaction(true);
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        //   toast.error('Error fetching user!',error);
        }
      } else {
        alert('No wallet found!')
        toast.error('TronLink wallet is not installed or not logged in.', {
            position: 'top-center',
        })
      }
    }


    fetchUserData()
  }, [])

  useEffect(() => {
    // Prevent body scrolling when the popup is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Re-enable body scrolling when the popup is closed
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <PageWrapper>
    <Backdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    
        <Toaster/>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        // colors={['#ff0000', '#ffffff', '#cc0000']}
      />

      <ScrollableContent>
      <Wrapper
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <CloseButton onClick={onClose}>
        <X size={24} />
      </CloseButton>
        <Logo src={logo} alt="TronXplore Logo" />
        <Title>
          Congratulations on Your <span>Achievement!</span>
        </Title>
        <Description>
          You've successfully mastered all challenges in TronXplore. Your dedication and skill have
          earned you a special NFT certificate!
        </Description>
        {isCertified ? (
          <>
            <Button disabled>Already Certified</Button>
            {nftHash && (
              <TransactionLink
                href={`https://nile.tronscan.org/#/transaction/${nftHash}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                View your NFT transaction →
              </TransactionLink>
            )}
          </>
        ) : (
          <Button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMintCertificate}
          >
            {loading ? <ScaleLoader height={15} width={4} color="white" /> : 'Mint Certificate'}
          </Button>
        )}
        {/* {showTransaction && nftHash && (
              <AnimatePresence>
                <TransactionLink
                  href={`https://nile.tronscan.org/#/transaction/${nftHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  View your NFT transaction →
                </TransactionLink>
              </AnimatePresence>
            )} */}


         {(isCertified || showTransaction) && (
              <>
                <Subtitle>How to show your NFT certificate in your wallet:</Subtitle>
                <List>
                  <ListItem>Go to your TronLink wallet and click on the "Collectibles" section.</ListItem>
                  <ListItem>Make sure your network is set to the Nile Testnet.</ListItem>
                  <ListItem>You will see an option labeled "TXN".</ListItem>
                  <ListItem>Click on the "TXN" option to view your certificate.</ListItem>
                  <ListItem>
                    If you don't see your certificate in the Collectibles section, look for the
                    plus (+) icon located at the right-center of the screen.
                  </ListItem>
                  <ListItem>
                    Click the plus icon and enter the contract address:
                    <span className='text-[#ff0000] font-semibold'>
                      TFGufR9X3i3yHkdKuHJxwjyh8UD9DfXdKo
                    </span>
                  </ListItem>
                  <ListItem>Select "TXN" from the list to view your certificate.</ListItem>
                  <ListItem>
                    Please be patient as the certificate image may take some time to load
                    completely.
                  </ListItem>
                </List>
                <HighlightedText>
                  Note: NFTs may take some time to load into your wallet. Please check back after a few moments if your certificate doesn't appear immediately.
                  Once loaded, your TronXplore certificate should be visible in your wallet.
                </HighlightedText>
              </>
            )}
          
      

      </Wrapper>
      </ScrollableContent>
    </Backdrop>
    </PageWrapper>
  )
}


export default CongratulationsPopup
