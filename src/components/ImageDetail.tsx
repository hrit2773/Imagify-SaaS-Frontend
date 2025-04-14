import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import TopBarLayout from "./Layouts/TopBarLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchImageById } from "../apis/getRequests";

const ImageDetail = () => {
  const {id}=useParams()
  const { data } = useQuery({
    queryKey: ['users',id],
    queryFn: fetchImageById,
  })
  console.log(data);
  
  return (
    <TopBarLayout>
      <div>
        Hello
      </div>
    </TopBarLayout>
  );
};

export default ImageDetail;