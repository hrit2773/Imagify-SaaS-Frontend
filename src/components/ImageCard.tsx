import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateForm from './CreateForm';
import { formatDate } from '../lib/utils';

export default function ImageCard(props:any) {
  
  const navigate=useNavigate()
  const options=['View Details'];
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
  const handleOptionSelect=(option:string)=>{
    if (option){
      navigate(`/image-detail/${props.id}`)
    }
    setAnchorElUser(null);
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MoreVertIcon/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={()=>handleOptionSelect(option)}>
                  <Typography sx={{ textAlign: 'center' }}>{option}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        }
        title={props.title}
        subheader={formatDate(props.create_at)}
      />
      <CardMedia
        component="img"
        image={props.image}
        alt="Paella dish"
      />
      <CardContent>
        <React.Fragment>
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
      </React.Fragment>
      </CardContent>
    </Card>
  );
}
