import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard';

export interface ItemInterface{
    totalPrice:bigint;
    itemId:string;
    seller:string;
    name:string;
    description:string;
    image: string;
    buyMarketItem?: ()=> void;
    account?:string;
}

function Marketplace({marketplace, nft,account}:any) {
    const [items,setItems]=useState<ItemInterface[]>();
    const [loading,setLoading]=useState(false)
    const loadMarketplaceItems=async ()=>{
        setLoading(true)
        const itemCount=await marketplace.getItemCount();
        let items=[]
        for (let i=1;i<=itemCount;i++){
            const item= await marketplace.items(i)
            if (!item.sold){
                console.log(item.tokenId)
                const uri=await nft.tokenURI(item.tokenId)
                const response=await fetch(uri)
                const metadata=await response.json()
                const totalPrice=await marketplace.getTotalPrice(item.itemId)
                items.push({
                    totalPrice,
                    itemId:item.itemId,
                    seller:item.seller,
                    name:metadata.name,
                    description:metadata.description,
                    image: metadata.image,
                })
            }
        }
        console.log(items)
        setItems(items);
        setLoading(false);
    }

    const buyMarketItem=async (item:ItemInterface)=>{
        await (await marketplace.purchaseItem(item.itemId,{value:item.totalPrice})).wait()
        loadMarketplaceItems()
    }

    useEffect(()=>{
        loadMarketplaceItems()
    },[])

    if (loading) return (
        <div className='mt-[50vh] ml-[50vh]'>
            <CircularProgress size="3rem" />
        </div>
    )

    if (!items || items.length===0) return (
        <div className='ml-[80vh] text-4xl'>No Assets Found</div>
    )

    return (
        <div className='flex flex-wrap gap-10 mx-2'>
            {items.map((item:ItemInterface)=>(
                <ItemCard 
                    totalPrice={BigInt(item.totalPrice)} 
                    itemId={item.itemId} 
                    seller={item.seller} 
                    name={item.name} 
                    description={item.description} 
                    image={item.image}
                    buyMarketItem={()=>buyMarketItem(item)}
                    account={account}
                />
            ))}
        </div>
    )
}

export default Marketplace
