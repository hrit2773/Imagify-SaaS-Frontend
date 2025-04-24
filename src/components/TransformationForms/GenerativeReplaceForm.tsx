import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { generativeReplace } from '../../apis/transformations';

function GenerativeReplaceForm(props:any) {
    const [replace,setReplace]=useState("true")
    const mutation = useMutation({
    mutationFn: generativeReplace,
        onSuccess: (data) => {
            console.log('Post created!', data);
        },
        onError: (error) => {
            console.error('Error creating post:', error);
        },
    });
    const handleClose = () => {
        props.setGrepOpen(false);
    };
    return (
        <Dialog
            open={props.grepOpen}
            onClose={handleClose}
            slotProps={{
            paper: {
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    const data={...formJson,replace_all:Boolean(replace)}
                    console.log(data)
                    mutation.mutate({id:props.id,data})
                    handleClose();
                },
            },
            }}
        >
            <DialogTitle>Generative Replace</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To Apply Generative Fill select The following fields
            </DialogContentText>
            <div className=' flex flex-col gap-4'>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="transform_from"
                    name="transform_from"
                    label="Transform From"
                    type="text"
                    fullWidth
                    variant="standard"
                />

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="transform_to"
                    name="transform_to"
                    label="Transform To"
                    type="text"
                    fullWidth
                    variant="standard"
                />

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Replace All</InputLabel>
                    <Select
                        required
                        labelId="demo-simple-select-label"
                        id="replace_all"
                        name="replace_all"
                        value={replace}
                        label="Replace All"
                        onChange={(e)=>setReplace(e.target.value)}
                    >
                        
                        <MenuItem value={"true"}>Yes</MenuItem>
                        <MenuItem value={"false"}>No</MenuItem>
                    </Select>
                </FormControl>
            </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Transform</Button>
            </DialogActions>
        </Dialog>
    )
}

export default GenerativeReplaceForm