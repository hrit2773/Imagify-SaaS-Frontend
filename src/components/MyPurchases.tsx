
import { useState, useEffect } from 'react'
import ItemCard from './ItemCard'
import { CircularProgress } from '@mui/material'
import { ItemInterface } from './Marketplace'

export default function MyPurchases({ marketplace, nft, account }:any) {
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState<any>([])
  const loadPurchasedItems = async () => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter =  marketplace.filters.Bought(null,null,null,null,null,account)
    const results = await marketplace.queryFilter(filter)
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(results.map(async (i:any) => {
      // fetch arguments from each result
      i = i.args
      // get uri url from nft contract
      const uri = await nft.tokenURI(i.tokenId)
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri)
      const metadata = await response.json()
      // get total price of item (item price + fee)
      const totalPrice = await marketplace.getTotalPrice(i.itemId)
      // define listed item object
      let purchasedItem = {
        totalPrice,
        price: i.price,
        itemId: i.itemId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image
      }
      return purchasedItem
    }))
    setLoading(false)
    setPurchases(purchases)
  }
  useEffect(() => {
    loadPurchasedItems()
  }, [])

  if (loading) return (
    <div className='mt-[50vh] ml-[50vh]'>
        <CircularProgress size="3rem" />
    </div>
)

if (!purchases || purchases.length===0) return (
    <div className='ml-[80vh] text-4xl'>No Assets Found</div>
)

return (
    <div className='flex flex-wrap gap-10 mx-2'>
        {purchases.map((item:ItemInterface)=>(
            <ItemCard 
                totalPrice={BigInt(item.totalPrice)} 
                itemId={item.itemId} 
                seller={item.seller} 
                name={item.name} 
                description={item.description} 
                image={item.image}
                account={account}
            />
        ))}
    </div>
)
}

