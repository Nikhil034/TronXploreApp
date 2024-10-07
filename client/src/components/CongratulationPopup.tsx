import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import logo from '../images/logo.png'
import lighthouse from '@lighthouse-web3/sdk';
import toast, { Toaster } from 'react-hot-toast'
import { ScaleLoader } from 'react-spinners'


const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 50;
`
const StepList = styled.ol`
  text-align: left;
  margin-top: 20px;
  padding-left: 20px;
`

const StepItem = styled.li`
  margin-bottom: 10px;
`


const Wrapper = styled(motion.div)`
  background: #000000;
  border-radius: 16px;
  padding: 36px 60px;
  box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.3);
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  max-width: 550px;
  width: 90%;
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
    console.log(`Upload Progress: ${percentageDone.toFixed(2)}%`); // Fix to two decimals
  };

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
      console.log(LighthouseKey);

      // Upload metadata JSON to Lighthouse (inside an array)
      const metadataUploadResponse = await lighthouse.upload(
        [metadataBlob], // Pass metadata as an array
        LighthouseKey, 
        undefined,
        progressCallback
      );

      // Get the CID for the metadata
      const metadataCID = metadataUploadResponse.data.Hash;
      console.log('Metadata successfully uploaded.');

      console.log('Metadata CID:', metadataCID);
      console.log('Visit metadata at:', `https://gateway.lighthouse.storage/ipfs/${metadataCID}`);

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
        console.log(address);

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
        setLoading(false)
        setShowSteps(true);
      } else {
        console.error('TronWeb is not available.');
        toast.error('TronWeb is not available. Please install TronLink.');
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
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
        console.log(import.meta.env.VITE_LIGHTHOUSE_ID)
        const address = (window as any).tronWeb.defaultAddress.base58
        try {
          setUserAddress(address)


          // Call the API to get user data
          const response = await axios.get(
            'https://api.tronxplore.blockchainbytesdaily.com/api/users/users'
          )
          console.log(response);
          const users = response.data


          // Check if the connected user has an NFT hash
          const user = users.find((u: any) => u.address === address)


          if (user && user.NFT_hash) {
            setIsCertified(true)
            setNftHash(user.NFT_hash)
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


  return (
    <Backdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Toaster/>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        // colors={['#ff0000', '#ffffff', '#cc0000']}
      />
      <Wrapper
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 15 }}
      >
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
            onClick={uploadFileAndMint}
          >
            {loading ? <ScaleLoader height={15} width={4} color="white" /> : 'Mint Certificate'}
          </Button>
        )}
        <AnimatePresence>
          {showTransaction && (
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
        </AnimatePresence>
       
         <StepList>
              <StepItem>Go to your TronLink wallet and click on the "Collectibles" section.</StepItem>
              <StepItem>Make sure your network is set to the Nile Testnet.</StepItem>
              <StepItem>You will see an option labeled "TXN".</StepItem>
              <StepItem>Click on the "TXN" option to view your certificate.</StepItem>
              <StepItem>Note: NFTs may take some time to load into your wallet. Please check back after a few moments if your certificate doesn't appear immediately.</StepItem>
              <StepItem>Once loaded, your TronXplore certificate should be visible in your wallet.</StepItem>
        </StepList>

      </Wrapper>
    </Backdrop>
  )
}


export default CongratulationsPopup
