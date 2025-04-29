# Imagify Frontend

The frontend for **Imagify**, an AI-powered image transformation platform with Web3 features. It supports advanced transformations like background removal, generative fill, and also lets users tokenize and trade transformed images as NFTs via smart contracts.

## 🚀 Features

- 🧠 AI Image Enhancements (Restoration, Recoloring, Generative Fill, Object Removal)
- 🖼️ Community Image Showcase with Infinite Scroll
- 🎨 Preview & Manage Image Transformations
- 🪙 Decentralized NFT Minting via Smart Contracts
- 🧾 On-chain Metadata for Image Provenance
- 🌐 Web3 Wallet Integration (Metamask)

## 🛠 Tech Stack

- **Frontend**: React.js
- **Styling**: Tailwind CSS, Material UI
- **API**: Tanstack Query
- **Auth**: Wallet based
- **Blockchain**: Ethers.js + Hardhat (Contract Deployment)
- **Contracts**: Solidity (ERC-721 for NFTs)
- **Payments**: decentralized

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/imagify.git
cd Imagify-SaaS-Frontend

# Install dependencies
npm install
# Deploy The Smart Contract
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
# Start development server
npm run dev
```
# Make Sure you have Metamask Wallet in your browser and connected to hardhat localhost
