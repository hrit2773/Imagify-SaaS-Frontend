import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { generativeBackground } from '../../apis/transformations';

function GenerativeBackgroundForm(props:any) {
    const mutation = useMutation({
        mutationFn: generativeBackground,
        onSuccess: (data) => {
          console.log('Post created!', data);
        },
        onError: (error) => {
          console.error('Error creating post:', error);
        },
      });
    const handleClose = () => {
        props.setGbOpen(false);
    };
    return (
        <Dialog
            open={props.gbOpen}
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
            <DialogTitle>Generative Background</DialogTitle>
            <DialogContent>
            <DialogContentText>
                To Apply Generative Background select The following fields
            </DialogContentText>
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
                id="prompt"
                name="prompt"
                label="Prompt"
                type="text"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Transform</Button>
            </DialogActions>
        </Dialog>
    )
}

export default GenerativeBackgroundForm
