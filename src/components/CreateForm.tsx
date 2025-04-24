import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, InputLabel, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { createNFT, uploadToIPFS } from "../IpfsUpload";

function CreateForm({setOpen,imageUrl,nft,marketplace}:any) {
  const [formOpen, setFormOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const [image,setImage]=useState<string | undefined>("")
  const handleClickFormOpen = () => {
    setLoading(true);
    setFormOpen(true);
    uploadToIPFS(imageUrl)
    .then((ipfsUrl)=>{
      setImage(ipfsUrl)
      setLoading(false);
    })
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setOpen(false);
  };
  const handleSubmit = (data:any)=>{
    createNFT({
      ...data,
      image,
      nft,
      marketplace
    });
    setFormOpen(false);
    setOpen(false);
  }
  return (
    <React.Fragment>
      <Button onClick={handleClickFormOpen}>
        Proceed
      </Button>
      <Dialog
        open={formOpen}
        onClose={handleFormClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              console.log(formJson);
              handleSubmit(formJson);
            },
          },
        }}
      >
        {loading?(
            <CircularProgress/>
          ):(
            <>
            <DialogTitle>Mint NFT</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To mint your NFT Enter Image Name, Description and set a Price
              </DialogContentText>
              <img
                src={image}
                alt="Loading Image"
                loading="lazy"
              /> 
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
              />
              <Input
                className="mt-4"
                autoFocus
                required
                margin="dense"
                id="price"
                name="price"
                type="number"
                inputProps={{ step: "any" }}
                placeholder="Set the Price in ETH"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleFormClose}>Cancel</Button>
              <Button type="submit">Mint</Button>
            </DialogActions>
            </>
          )}
      </Dialog>
    </React.Fragment>
  )
}

export default CreateForm