import React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography  from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';

const ErrorLoading = ({sx,reload,message}) => {
  const handleRefetchItems = () =>{
    reload()
  }
  return (
    <Stack spacing={2} p={1} sx={{ justifyContent: 'center',alignItems:'center',...sx }}>
      <Typography variant='h2' fontWeight={600} children={'Oops !'}/>
      <Typography variant='body1' textAlign={'center'} fontWeight={400} children={message || 'There was an error while getting Data! Please check your network or try again'}/>
      <IconButton  onClick={handleRefetchItems}>
        <RefreshIcon sx={{height:'100px',width:'100px'}}/>
      </IconButton>
    </Stack>
  )
}

export default ErrorLoading