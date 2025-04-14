import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ImageDetailsInterface } from './DisplayImages';
import { Box, Menu, MenuItem, Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ImageCard(props:ImageDetailsInterface) {
  const formatDate=(date:Date)=>{
    const currDate = new Date(date);
    const options:Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const formattedDate = currDate.toLocaleDateString("en-US", options);
    return formattedDate
  }
  const navigate=useNavigate()
  const options=['View Details'];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    navigate(`/image-detail/${props.id}`)
    setAnchorElUser(null);
  };
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
                <MenuItem key={option} onClick={handleCloseUserMenu}>
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
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}
