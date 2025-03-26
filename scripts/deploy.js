import hardhat from "hardhat";
const { ethers, artifacts } = hardhat;
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());
  
    
    // Get the ContractFactories and Signers here.
    const NFT = await ethers.getContractFactory("NFT");
    const Marketplace = await ethers.getContractFactory("Marketplace");
    // deploy contracts
    const marketplace = await Marketplace.deploy(1);
    const nft = await NFT.deploy();
    // Save copies of each contracts abi and address to the frontend.
    await saveFrontendFiles(marketplace , "Marketplace");
    await saveFrontendFiles(nft , "NFT");
  }
  
  async function saveFrontendFiles(contract, name) {
    const contractsDir = path.join(__dirname, "../contractsData");
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    const address=await contract.getAddress()
    fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address }, undefined, 2)
    );
    const contractArtifact = artifacts.readArtifactSync(name);
  
    fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(contractArtifact, null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });