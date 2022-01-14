# Final project: Peer Tutoring with Crypto Payments 

## Deployed version url:

https://stardust870.github.io/blockchain-developer-bootcamp-final-project/client/index.html

Website was tested on chrome with metamask extension installed. 
It has not been checked on other browsers.
Credits to https://github.com/jsur/blockchain-developer-bootcamp-final-project.git from which I 
learnt a lot and followed simiar structure for my project.

## How to run this project locally:

### Prerequisites

- Node.js >= v14
- Truffle and Ganache
- Yarn
- `git fetch --all --tags`
- `git checkout tags/v1.0 -b cert`

### Contracts

- Run `yarn install` in project root to install Truffle build and smart contract dependencies

- Run local testnet in port `8545` with an Ethereum client, e.g. **ganache-cli -p 8545**  

I recommend starting ganache-cli as follows:
- ganache-cli -p 8545 -m 'some random twelve words ...'
Keeping the mnemonic constant gives you the same test eth accounts and save you trouble of importing new accounts into metamask for testing

Compile and deploy the smart contract:
- `truffle migrate --network development --reset`
Open truffle console and run tests:
- `truffle console --network development`
- Run tests in Truffle console: `test`

### Frontend
Start the web server
- npm i -g serve
- serve
- open client/index.html in browser 
 
Frontend is html and pure javascript. So no special package installs needed.

### How to populate locally deployed contract with listings

- `truffle migrate --network development`
- `truffle console --network development`

When you see the "truffle(development)>" prompt, you can enter the following to initialize the contract state

- `let x = await Tutors.deployed()`
- `let accounts = await web3.eth.getAccounts()`
- `await x.registerTutor("Bob", accounts[2], web3.utils.toWei("0.002"), "Buildings", "Modern buildings", "url2")`

Alternatively, you can open the client/index.html in your browser and after connecting your wallet, register a few tutors
Make sure that the metamask localhost network in on port `8545` (should match what we gave as parameter when we ran ganache-cli.

The testnet eth accounts have 100 eth by default so that is plenty for testing purpose.


## Screencast link

https://www.youtube.com/watch?v=_cQjHZnuzkk

## Public Ethereum wallet for certification:

0xe76669291E49dE8f5819A324d1BB8E1D43f07c82

## Project description

My application is a simplified online service that connects students with tutors with all financial exchanges happening in crypto (ETH for now).

Users who wish to tutor can
- register themselves filling in a form indicating their basic info, hourly rate (in ETH) and wallet address 
- tutors can make themselves unvailable or available at anytime (in case they do not wish to take time off)

Users who wish to signup for a tutoring session can 
- view the list of available tutors
- select a tutor and book a session with them. At this point they will be charged for the session fully. 
- users can also look at the upcoming sessions 
- mark a session as completed at which point the tutor is freed up so other students can sign up with them

## Limitations/TODO items
- Clearly this is a very simplified application since there is no way to specify date/time for the session (mainly because I have yet to find a nice way to manage date/times in solidity). 
- Also, in a normal business, payment should be finalized upon completion of the session and also allow users to change their mind as to whether they want to keep or cancel or move their appointment.
- The ability for tutors to make themselves available/unavailable is currently disable in the UI (although the smart contract itself has the implementation)
- One nice addition might be to provide users who signup with the zoom passcode which is specific to a tutor (or even better to a specific session).

All of these and perhaps other features can be added in future.


## Simple workflow for users seeking tutors:

1. Enter service web site
2. Login with Metamask
3. Browse tutors 
4. Select tutor who is available and meets the subject requirement
5. Signup with the tutor. At this point the student is charge the hourly rate.
6. [for future] Receive zoom passcode provided by the tutor
 

## Workflow for users wishing to be tutors

1. Enter service web site
2. Login with Metamask
3. Fill up the "register as tutor" form
4. [for future] Make yourself available/unavailable in case for a period of days you do not wish to tutor
5. [for future] Allow tutors to distribute secret codes to users who signed up for session (zoom passcode or some such)

## Directory structure

- `client`: Project's html/javascript frontend.
- `contracts`: Solidity smart contracts
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.

## Environment variables (not needed for running project locally)

```
MNEMONIC="..."
ROPSTEN_URL=https://ropsten.infura.io/v3/...
KOVAN_URL=https://kovan.infura.io/v3/...
RINKEBY_URL=https://rinkeby.infura.io/v3/...
MAINNET_URL=https://mainnet.infura.io/v3/...
ROPSTEN_INFURA_PROJECT_ID="..."
PRIKEY="..."
GANACHE_MNEMONIC="..."
```

The GANACHE_MNEMONIC is the one you pass to `ganache-cli -p 8545 -m <>` as the argument to the -m option


