import { Box, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Tooltip, Typography } from '@mui/material'
import { ItemInterface } from './Marketplace'
import { ethers } from 'ethers'

function ItemCard(props:ItemInterface) {
    console.log(props.account)
    console.log(props.seller)
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={props.name}
            />
            <CardMedia
                component="img"
                image={props.image}
                alt="NFT"
            />
            <CardContent>
                <Button variant="outlined" onClick={props.buyMarketItem} className=' text-2xl text-black'>
                  {ethers.formatEther(props.totalPrice)} ETH
                </Button>
                <Typography className=' text-2xl text-black truncate'>
                    {props.seller}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ItemCard
