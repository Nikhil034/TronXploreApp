import React from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;400;600&display=swap');

  body {
    font-family: "Poppins", sans-serif;
    background-color: #000000;
    color: #ffffff;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    overflow: hidden;
    background-image: radial-gradient(
        circle at 10% 20%,
        rgba(255, 0, 0, 0.1) 0%,
        transparent 20%
      ),
      radial-gradient(
        circle at 90% 80%,
        rgba(255, 0, 0, 0.1) 0%,
        transparent 20%
      );
  }
`

const fadeIn = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`

const Container = styled.div`
  max-width: 650px;
  background-color: rgba(36, 36, 36, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 20px 50px rgba(255, 0, 0, 0.2), 0 0 0 1px rgba(255, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.5s ease-out forwards;
  backdrop-filter: blur(10px);
  margin: auto;
`

const Title = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  margin-top: 0;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(255, 51, 51, 0.3), 0 0 10px rgba(255, 51, 51, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`

const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
  //   margin-bottom: 20px;
`

const CodeBlock = styled.pre`
  background-color: #1e1e1e;
  padding: 10px;
  border: 1px solid #333;
  white-space: pre-wrap;
  color: #d4d4d4;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  overflow-x: auto;
`

const Code = styled.code`
  color: #d4d4d4;
`

const StrongText = styled.p`
  color: #ff6666;
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: 500;
`

const SmallText = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
`

const Button = styled.button`
  background: linear-gradient(45deg, #ff0000, #cc0000);
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 10px 5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(220, 53, 69, 0.3);
  }
`

const HighlightedText = styled.p`
  background-color: rgb(82 79 79 / 80%);
  padding: 20px;
  border-left: 4px solid #cc0000;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  font-size: 14px;
`

const BackButton = styled.button`
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  z-index: 10;
  background-color: #dc2626;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 20px auto 0 20px;

  &:hover {
    background-color: #b91c1c;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

interface UnderstandingTRC20Props {
  onBack: () => void
}

export default function UnderstandingTRC20({ onBack }: UnderstandingTRC20Props) {
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <BackButton onClick={onBack}>← Back to Game</BackButton>
        <ScrollableContent>
          <Container>
            <Title>Understanding TRC-20 Tokens</Title>
            <Text>
              Learn the basics of TRC-20, a token standard on the Tron blockchain. TRC-20 tokens are
              used across various dApps and services.
            </Text>

            <div>
              <StrongText>TRC-20 Smart Contract Example:</StrongText>
              <SmallText>Below is an example of a basic TRC-20 token smart contract:</SmallText>
              <CodeBlock>
                <Code>
                  {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyTRC20Token {
    string public name = "My TRC-20 Token";
    string public symbol = "MT20";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10**18; // 1,000,000 tokens

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}`}
                </Code>
              </CodeBlock>
            </div>

            <div>
              <StrongText>Token Name:</StrongText>{' '}
              <HighlightedText>
                Represents the unique identifier, e.g., "Tron Energy Token" for Tron's energy
                economy.
              </HighlightedText>
              <StrongText>Token Symbol:</StrongText>{' '}
              <HighlightedText>
                The shorthand of the token name, e.g., "TET" for Tron Energy Token.
              </HighlightedText>
              <StrongText>Total Supply:</StrongText>{' '}
              <HighlightedText>
                Maximum number of tokens that can ever be issued, e.g., 1,000,000 TET tokens.
              </HighlightedText>
              <StrongText>Real-World Scenario:</StrongText>{' '}
              <HighlightedText>
                Imagine launching a loyalty program with a token called "StoreCoin" (SCOIN) with a
                total supply of 1,000,000, which users collect and redeem for rewards.
              </HighlightedText>
            </div>

            <ButtonGroup>
              <Button>Continue</Button>
              <Button>Exit</Button>
            </ButtonGroup>
          </Container>
        </ScrollableContent>
      </PageWrapper>
    </>
  )
}
