import { useQuery } from '@tanstack/react-query'
import { fetchImages } from '../apis/getRequests'
import ImageCard from './ImageCard'
import CardSkeleton from './Loaders/CardSkeleton';
import TopBarLayout from './Layouts/TopBarLayout';

export interface ImageDetailsInterface{
    isLoading?:boolean;
    id: string;
    author: {
        id: string;
        email: string;
        is_superuser?: boolean;
        is_staff?: boolean;
        is_active?: boolean;
        last_login?: Date;
        date_joined?: Date;
    };
    title: string;
    image: string;
    cloudinary_id?: string;
    transformation_url: string;
    is_minted_NFT: boolean;
    create_at: Date;
    update_at: Date;
}

function DisplayImages(props:any) {
    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchImages,
    })  
    return (
        <div className='flex flex-wrap gap-10 mx-2'>
            {isLoading?(
                <CardSkeleton count={8}/>
            ):data?.length===0?(
                <div>Not found</div>
            ):data.map((image:ImageDetailsInterface)=>(
                <ImageCard
                    id={image.id}
                    isLoading={isLoading}
                    image={image.image}
                    author={image.author} 
                    title={image.title} 
                    transformation_url={image.transformation_url} 
                    is_minted_NFT={image.is_minted_NFT} 
                    create_at={image.create_at} 
                    update_at={image.update_at}        
                    nft={props.nft}
                    marketplace={props.marketplace}        
                />
            ))}
        </div>
    )
}

export default DisplayImages