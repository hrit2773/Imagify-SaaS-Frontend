import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { formatDate } from '../lib/utils';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CreateForm from './CreateForm';

export default function TransformationCard(props:any) {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    };

    return (
        <Card sx={{ display: 'flex', minWidth:600 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' , minWidth:600 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
                {props.title}
            </Typography>
            <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: 'text.secondary' }}
            >
                {formatDate(props.transformed_at)}
            </Typography>
            <Typography
                variant="subtitle1"
                component="div"
                sx={{ color: 'text.secondary' }}
            >
                {props.transType}
            </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Mint as NFT
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Minting action cannot be undone as it is permanent.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <CreateForm setOpen={setOpen} imageUrl={props.image} nft={props.nft} marketplace={props.marketplace}/>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
        <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={props.image}
            alt="Live from space album cover"
        />
        </Card>
    );
}
