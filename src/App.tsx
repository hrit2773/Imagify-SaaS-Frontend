import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import DisplayImages from "./components/DisplayImages";
import ImageDetail from "./components/ImageDetail";
import { SetStateAction, useState } from "react";
import {ethers} from 'ethers';
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import { BrowserProvider, parseUnits } from "ethers";
import TopBarLayout from "./components/Layouts/TopBarLayout";
import Marketplace from "./components/Marketplace";
import MyNFTs from "./components/MyNFTs";
import MyPurchases from "./components/MyPurchases";
import { CircularProgress } from "@mui/material";

function App() {
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState<string | null>(null);
    const [nft, setNFT] = useState({})
    const [marketplace, setMarketplace] = useState({})
    // MetaMask Login/Connect
    const web3Handler = async () => {
      if (!(window as any).ethereum) {
          alert("MetaMask not detected!");
          return;
      }

      try {
        const provider = new BrowserProvider((window as any).ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        console.log("Connected account:", accounts);
        console.log(await provider.getNetwork())
        const signer = await provider.getSigner();
        await loadContracts(signer);
      } catch (err) {
          console.error("Error connecting to wallet", err);
      }
  };
    const loadContracts = async (signer: ethers.ContractRunner | null | undefined) => {
        // Get deployed copies of contracts
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
        setMarketplace(marketplace)
        const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
        setNFT(nft)
        setLoading(false)
    }

    return (
      <BrowserRouter>
        <TopBarLayout web3Handler={web3Handler} account={account}>
          {loading?(
            <div className="flex gap-2 mt-[40vh] ml-[60vh]">
              <CircularProgress size="3rem" />
              <div>Awaiting for Metamask Connection</div>
            </div>
          ):(
              <Routes>
                <Route path="/" element={<DisplayImages marketplace={marketplace} nft={nft} />}/>
                <Route path= "/image-detail/:id" element={<ImageDetail marketplace={marketplace} nft={nft}/>}/>
                <Route path="/marketplace" element={<Marketplace marketplace={marketplace} nft={nft} account={account}/>}/>
                <Route path="/my-nfts" element={<MyNFTs marketplace={marketplace} nft={nft} account={account}/>}/>
                <Route path="/my-purchases" element={<MyPurchases marketplace={marketplace} nft={nft} account={account}/>}/>
              </Routes>
          )}
        </TopBarLayout>
      </BrowserRouter>
    )
}

export default App
