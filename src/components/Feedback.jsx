import React, { useState } from "react";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Feedback({key, size, id, currentUser, 
  userID, name, surname, date, body, avatar, 
  deleteFeedback, fixedBody, setFixedBody,
  feedbacks, setFeedbacks, setSaveBodyVar, setOpenAlert, setBodyAlert, setTypeAlert}) {
  
  
  let [fixBodyVar, setFixBodyVar] = useState(false)


  let fixBody = () => {
    setFixBodyVar(fixBodyVar = true)
    setFixedBody(fixedBody = body)
  }

  let saveBody = () => {
    setSaveBodyVar(true)
    setFixBodyVar(fixBodyVar = false)

    if (fixedBody.length !== 0) {

      feedbacks = feedbacks.map( feedback => {
        if (feedback.id === id) {
          feedback.body = fixedBody
        }
        return feedback
        } 
      )
  
      setFeedbacks( [...feedbacks] )

      setBodyAlert('Отзыв изменен')

      setTypeAlert('success')
        
      setOpenAlert(true)
  
    }
    else {

      setBodyAlert('Не оставляйте поле пустым')

      setTypeAlert('error')
        
      setOpenAlert(true)

    }

  }
  
    return (
      <>

        <Box key={key} id={id} display="flex" flexDirection="column" gap={2} p={1}
          sx={{
            boxShadow: '4px 4px 8px 4px rgba(34, 60, 80, 0.2)', 
            border: 'none', borderRadius: '10px', maxWidth: '100%', marginLeft: size.mrg,
            marginRight: size.mrg, marginBottom: '3%', padding: "20px"
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="start"
            flexDirection="row" gap={3}
            sx={{ 
              border: 'none', borderRadius: '10px', width: '100%', height: size.h,
            }}
          >
            <Avatar
              alt="Avatar"
              src={avatar}
              sx={{ width: size.avatar-5, height: size.avatar-5 }}
            />
            <Typography sx={{ fontSize: size.font, fontWeight: 600}} variant="h6" component="div">
              {name + " " +
              surname}
            </Typography>
            
            <Typography sx={{ fontSize: size.font, fontWeight: 600 }} variant="h5" component="div">
              {date}
            </Typography>

          </Box>
          
          <Box display="flex" alignItems="start" justifyContent="start"
            sx={{ 
              border: 'none ', borderRadius: '10px', width: '100%', textAlign: 'justify',
              paddingBottom: '10px'    
            }}
          >
          {
            fixBodyVar === true
            ?
              <TextField
                id="outlined-multiline-flexible" label="Редактировать отзыв" fullWidth  multiline
                rows={5}  value={fixedBody} onChange={e => setFixedBody(e.target.value) }
              />
            :
              <Typography sx={{ fontSize: size.font, lineHeight: size.line}} variant="h4" component="div">
                {'\u00A0\u00A0\u00A0' + body}
              </Typography>
          }
          
          </Box>

          { 
            userID === currentUser.id
            ?


              <Box display="flex" alignItems="start" justifyContent="end" gap={4}
                sx={{ 
                  border: 'none ', borderRadius: '10px', width: '100%', height: '2rem',
                }}
              >
                {
                  fixBodyVar === true 
                  ?
                    <Button onClick={ () => saveBody() } size={size.btn} variant="outlined" color="primary" 
                      sx={{ textTransform: 'none'}}
                    >
                      Сохранить отзыв
                    </Button>
                  :
                    <Button onClick={ () => fixBody() } size={size.btn} variant="outlined" color="primary" 
                      sx={{ textTransform: 'none'}}
                    >
                      Редактировать отзыв
                    </Button>
                }
                
                <Button onClick={() => deleteFeedback(id) } size={size.btn} variant="outlined" color="error" 
                  sx={{ textTransform: 'none'}}
                >
                  Удалить отзыв
                </Button>
              
              </Box> 

            :
              <></> 
          }

          {
            currentUser.status === 'Администратор'
            ?
              <Box display="flex" alignItems="start" justifyContent="end" gap={4}
                sx={{ 
                  border: 'none ', borderRadius: '10px', width: '100%', height: '2rem',
                }}
              >
                <Button onClick={ () => deleteFeedback(id)} size={size.btn} variant="outlined" color="error" 
                  sx={{ textTransform: 'none'}}
                >
                  Удалить отзыв
                </Button>
              
              </Box> 
            :
              <></>
          }
        </Box>    
      </>
    );
  }
  export default Feedback;
