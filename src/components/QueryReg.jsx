import * as React from "react";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

function QueryReg({login, name, surname, patronymic}) {
    return (
      <>
        <Box
          my={5}
          display="flex"
          flexDirection="column"
          gap={2}
          p={1}
          sx={{ 
            border: '2px solid grey', 
            borderRadius: '10px', 
            maxWidth: '100%',
            // height: '15rem',
            padding: "20px"
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="start"
            flexDirection="row"
            gap={3}
            sx={{ 
              border: 'none', 
              borderRadius: '10px', 
              width: '100%',
              height: '3rem',
            }}
          >
            <Avatar
              alt="Avatar"
              src={require("./kartinki-nyashnye-kotiki-16.jpg")}
            //   src={avatar}
              sx={{ width: 50, height: 50 }}
            />
            <Typography sx={{ fontSize: "20px"}} variant="h6" component="div">
              {name + " " +
              surname + " " + patronymic}
            </Typography>

          </Box>
          
          
          <Box
            display="flex"
            alignItems="start"
            justifyContent="end"
            gap={3}
            sx={{ 
              border: 'none ', 
              borderRadius: '10px', 
              width: '100%',
              height: '2rem',
              textAlign: 'justify'
            }}
          >
            {/* <Button variant="outlined" color="primary" sx={{ textTransform: 'none'}}>
              Редактировать отзыв
            </Button> */}
            <Button variant="outlined" color="success" sx={{ textTransform: 'none'}}>
              Принять
            </Button>
            <Button variant="outlined" color="error" sx={{ textTransform: 'none'}}>
              Отклонить
            </Button>
          </Box>  
        </Box>    
      </>
    );
  }
  export default QueryReg;
