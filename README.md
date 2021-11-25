# LejArt
Arts on the blockchain

### blockchain-developer-bootcamp-final-project

## Final Project Idea

For my final project I want to create, deploy and sell an art collection as NFTs. For this project, my focus is not on the actual art itself. These are the main components of my project:
1. Create a solidity smart contract to mint my art pieces. This contract will be based on the ERC1155 standard. 
2. My art collection and the metadata will be deployed to IPFS
3. I will create a simple website to display my art collection and their various attributes.
4. Patrons who acquire my art can also visit the website to view their acquisitions or the prevenance of their acquired pieces

Initially I will try to build the smart contract from scratch to implement ERC 721 to learn the details and later switch to OpenZeppelin to make it robust and also learn about benefits of using OpenZeppelin. 

If time permits I will display my collection for view on OpenSea

My project will be based on either ethereum or matic testnet.

## Background

The ERC-1155 multi-token standard is a generalization of the ERC standards 20 and 721. It allows the creation of fungible (ERC-20) and non-fungible tokens (ERC-721) in a single smart contract. Each token ID can represent its own metadata and supply parameters. Some advantages of this standard are
* we can create non-fungible tokens which can be used to represent unique items such as art work, land titles, personal identities etc
* we can create distinct fungible token collections. This feature can be used to represent preset number of copies of uique items. For example, artist releasing limited edition prints of a specific piece, assets in games (4 dragons, 200 swords, 2000 jewels etc).

Further details of the ERC 1155 multi-token standard can be found [here](https://eips.ethereum.org/EIPS/eip-1155).
