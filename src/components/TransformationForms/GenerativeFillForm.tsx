import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { generativeFill } from '../../apis/transformations';

const aspect_types={
    'square':'Square',
    'portrait':'Portrait',
    'landscape':'Landscape'
}
const aspects=Object.keys(aspect_types)

function GenerativeFillForm(props:any) {
    const [aspect,setAspect]=useState('square')
    const mutation = useMutation({
        mutationFn: generativeFill,
        onSuccess: (data) => {
          console.log('Post created!', data);
        },
        onError: (error) => {
          console.error('Error creating post:', error);
        },
      });
    const handleClose = () => {
        props.setGfOpen(false);
    };
    return (
        <Dialog
            open={props.gfOpen}
            onClose={handleClose}
            slotProps={{
            paper: {
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData as any).entries());
                console.log(formJson);
                mutation.mutate({id:props.id,data:formJson})
                handleClose();
                },
            },
            }}
        >
            <DialogTitle>Generative Fill</DialogTitle>
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
                
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Aspect Ratio</InputLabel>
                    <Select
                        required
                        labelId="demo-simple-select-label"
                        id="aspect_ratio"
                        name="aspect_ratio"
                        value={aspect}
                        label="Aspect Ratio"
                        onChange={(e)=>setAspect(e.target.value)}
                    >
                        {aspects.map((aspect)=>(
                            <MenuItem value={aspect}>{aspect_types[aspect as keyof typeof aspect_types]}</MenuItem>
                        ))}
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

export default GenerativeFillForm