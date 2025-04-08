import {React} from 'react'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fade } from '@mui/material';

const AlertMessage = ({body, type, openAlert, setOpenAlert}) => {

  if ( openAlert === true) {

    console.log(0)

    setTimeout( () => setOpenAlert(false), 2000);

  }

  return (
    <Box sx={{ zIndex:10000000000 }}>
        <Fade in={openAlert} timeout={1000} >
            <Alert 
                sx={{ width: 'auto', 
                    margin: '10px' }} 
                variant="filled" 
                severity={type}
            >
                <Typography sx={{ fontSize: "16px"}} variant="h4">
                    {body}
                </Typography>
            </Alert>
        </Fade>
    </Box>
    
  )
}

export default AlertMessage
