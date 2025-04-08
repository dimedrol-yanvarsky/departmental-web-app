import * as React from "react";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

function User({setBodyAlert, setTypeAlert, setOpenAlert, login, name, surname, patronymic, userType, avatar, blockUser, denyUser, accessUser}) {
    return (
      <>
        <Box
          display="flex" flexDirection="row" alignItems="start"
          sx={{ borderTop: '2px solid grey', 
            maxWidth: '100%', paddingTop: "10px"
          }}
          my={1}
        >
          <Box gap={1} display="flex" flexDirection="column" alignItems="start" justifyContent='space-evenly'>
            <Box gap={1}  sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
              <Typography sx={{ fontSize: "17px", fontWeight: 600}} variant="h6" component="div"  >
                Фамилия:
              </Typography>
              <Typography sx={{ fontSize: "17px"}} variant="h5" component="div"  >
                {surname}
              </Typography>
            </Box>
            <Box gap={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
              <Typography sx={{ fontSize: "17px", fontWeight: 600}} variant="h6" component="div"  >
                Имя:
              </Typography>
              <Typography sx={{ fontSize: "17px"}} variant="h5" component="div"  >
                {name}
              </Typography>
            </Box>
            <Box gap={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
              <Typography sx={{ fontSize: "17px", fontWeight: 600}} variant="h6" component="div"  >
                Отчество:
              </Typography>
              <Typography sx={{ fontSize: "17px"}} variant="h5" component="div"  >
                {patronymic}
              </Typography>
            </Box>
            <Box gap={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
              <Typography sx={{ fontSize: "17px", fontWeight: 600}} variant="h6" component="div"  >
                Почта:
              </Typography>
              <Typography sx={{ fontSize: "17px" }} variant="h5" component="div"  >
                {login}
              </Typography>
            </Box>
            {
              userType === "registered"
              ?
              

                <Button size="small" variant="outlined" color="error" 
                  sx={{ fontSize:'14px', textTransform: 'none'}}
                  onClick={() => { blockUser(surname); setBodyAlert('Пользователь заблокирован'); setTypeAlert('success'); setOpenAlert(true) }}>
                  Заблокировать
                </Button>

              :
                userType === "giveMeRoots"
                ?
                  <Box sx={{ display: 'flex', minWidth: 300, justifyContent: 'space-evenly'}}>
                    <Button size="small" variant="outlined" color="success" 
                      sx={{ fontSize:'14px', textTransform: 'none'}}
                      onClick={ () => { accessUser(surname); setBodyAlert('Заявка принята'); console.log("зашел сюда дальше"); setTypeAlert('success'); setOpenAlert(true) }}>
                      Принять
                    </Button>
                    <Button size="small" variant="outlined" color="error" 
                      sx={{ fontSize:'14px', textTransform: 'none'}}
                      onClick={ () => { console.log(userType); denyUser(surname); setBodyAlert('Заявка отклонена'); setTypeAlert('success'); setOpenAlert(true) }}>
                      Отклонить
                    </Button>
                  </Box>
                :
                  <></> 
            }
          </Box>
          <Box
            display="flex"
            alignItems="start"
            justifyContent="end"
            flexDirection="row"
            gap={3}
            sx={{ 
              border: 'none', 
              borderRadius: '10px', 
              width: '100%',
              height: '3rem',
            }}
          >
            {
              userType === "registered" || userType === "Blocked"
              ?
                <Avatar
                  alt="Avatar"
                  src={avatar}
                //   src={avatar}
                  sx={{ width: 50, height: 50 }}
                />
              :
                <></>
            }

          </Box>
        </Box>    
      </>
    );
  }
  export default User;
