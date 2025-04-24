import { ethers } from 'ethers'

const jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0YmUyYmU3Yy0zZmY2LTQ2NDQtYWI5Mi0wNWIyZTExNDliMzIiLCJlbWFpbCI6InNoYW50eS5ocml0ZXNoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiMGJhZGNkMjFiNzc3NmUzYWM5NyIsInNjb3BlZEtleVNlY3JldCI6Ijk3Y2U3ZDhjYzYyN2E4MjFhMmJkYWNiMDlkNTFhYzE3MGExZGUxNDEzN2YyYmJkZTU2Y2E0ODRlYTdkMTZmNDkiLCJleHAiOjE3NzY3NTg0Mzh9.Fh2At5nzDGOVPHWfpxe_MwzyFlYu9qCYskFFZMcZ96M"

export const uploadToIPFS = async (imageUrl:string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("file", blob);

    const result = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`
      },
      body: formData
    });

    const data = await result.json();
    console.log(data);

    // Use your custom gateway
    return `https://peach-urban-duck-99.mypinata.cloud/ipfs/${data.IpfsHash}`
  } catch (error) {
    console.log("Pinata image upload error: ", error);
  }
}

export const createNFT = async ({ image, price, name, description,nft,marketplace }: any) => {
    if (!image || !price || !name || !description) return;
  
    try {
      const metadata = {
        name,
        description,
        image
      };
  
      const result = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pinataContent: metadata
        })
      });
  
      const data = await result.json();
      console.log("Metadata pinned to IPFS:", data);
  
      await mintThenList({ result: data, price,nft,marketplace });
    } catch (error) {
      console.log("Pinata metadata upload error: ", error);
    }
  };
  
  const mintThenList = async ({ marketplace, nft, result, price }: any) => {
    const uri = `https://peach-urban-duck-99.mypinata.cloud/ipfs/${result.IpfsHash}`;
  
    // mint nft 
    await (await nft.mint(uri)).wait();
  
    // get tokenId of new nft 
    const id = await nft.tokenCount();
  
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.target, true)).wait();
  
    // add nft to marketplace
    const listingPrice = ethers.parseEther(price.toString());
    await (await marketplace.makeItem(nft.target, id, listingPrice)).wait();
  };
