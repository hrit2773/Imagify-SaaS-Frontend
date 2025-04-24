import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchImageById } from "../apis/getRequests";
import { Button, Card, CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import GenerativeBackgroundForm from "./TransformationForms/GenerativeBackgroundForm";
import GenerativeFillForm from "./TransformationForms/GenerativeFillForm";
import GenerativeRestoreForm from "./TransformationForms/GenerativeRestoreForm";
import GenerativeReplaceForm from "./TransformationForms/GenerativeReplaceForm";
import EnhanceForm from "./TransformationForms/EnhanceForm";
import TransformationCard from "./TranformationCard";

const transformation_types={
  'gen_background_replace':'Generative Background',
  'gen_fill':'Generative Fill',
  'enhance':'Enhance',
  'gen_replace':'Generative Replace',
  'gen_restore':'Generative Restore'
} as const

const trans_types=Object.keys(transformation_types)

const ImageDetail = ({nft,marketplace}:any) => {
  const {id}=useParams()
  const [transType,setTransType]=useState<string>("gen_background_replace")
  const [gbOpen,setGbOpen]=useState(false)
  const [gfOpen,setGfOpen]=useState(false)
  const [gresOpen,setGresOpen]=useState(false)
  const [grepOpen,setGrepOpen]=useState(false)
  const [enOpen,setEnOpen]=useState(false)

  const { data,isLoading } = useQuery({
    queryKey: ['users',id],
    queryFn: fetchImageById,
  })
  console.log(data);

  const handleTransformClick=()=>{
    if (transType==='gen_background_replace') setGbOpen(true);
    else if (transType==='gen_fill') setGfOpen(true);
    else if (transType==='gen_restore') setGresOpen(true);
    else if (transType==='gen_replace') setGrepOpen(true);
    else setEnOpen(true)
  }

  if (isLoading) return <CircularProgress/>

  if (!data || data.length===0) return <div>Not found</div>
  return (
    <Card className="m-7 p-5">

      <div className="w-[100vw] flex justify-center">
        <div className="flex flex-col gap-5 items-center">
          <img
            src={data.image}
            className="flex object-contain mx-[20rem] border-2 border-black rounded-2xl"
            alt="img"
          />
          <div className=" text-5xl text-center font-bold">{data.title.toUpperCase()}</div>
          <div>
            <FormControl className="flex flex-col gap-3">
              <InputLabel id="demo-simple-select-label">Transform Image</InputLabel>
              <Select
                className="w-[800px] "
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={transType}
                label="Transform Image"
                onChange={(e)=>{setTransType(e.target.value)}}
              >
                {trans_types.map((trans:string)=>(
                  <MenuItem value={trans}>{transformation_types[trans as keyof typeof transformation_types]}</MenuItem>
                ))}
              </Select>
              <Button onClick={handleTransformClick} className=" w-[300px]" variant="contained">Apply Transformation</Button>
              <GenerativeBackgroundForm gbOpen={gbOpen} setGbOpen={setGbOpen} id={id}/>
              <GenerativeFillForm gfOpen={gfOpen} setGfOpen={setGfOpen} id={id}/>
              <GenerativeRestoreForm gresOpen={gresOpen} setGresOpen={setGresOpen} id={id}/>
              <GenerativeReplaceForm grepOpen={grepOpen} setGrepOpen={setGrepOpen} id={id}/>
              <EnhanceForm enOpen={enOpen} setEnOpen={setEnOpen} id={id}/>
            </FormControl>
          </div>
          <div className="flex flex-col gap-4">
            {data.transformations.length!==0 && (

              <div className="text-3xl font-semibold text-center">Transformations</div>
            )}
            {data.transformations.map((trans:any)=>(

              <TransformationCard
                image={trans.image_url}
                title={trans.title}
                transformed_at={trans.transformed_at}
                transType={transformation_types[trans.transformation_type as keyof typeof transformation_types]}
                nft={nft}
                marketplace={marketplace}
              />
            ))}
          </div> 
          
        </div>
      </div>
    </Card>
  );
};

export default ImageDetail;