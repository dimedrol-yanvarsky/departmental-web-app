import React from "react";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

const PhotoComment = ({id, userID, name, surname, body, avatar, currentUser, modalComments, setModalComments, comments, setComments}) => {
        

        let deleteComment = (id) => {

            setModalComments( modalComments.filter( f => f.id !== id))

            setComments( comments.filter( f => f.id !== id))

        }

          return (
            <>
      
              <Box id={id}
                display="flex" flexDirection="column" alignItems="start"
                sx={{ borderBottom: '2px solid grey', 
                  maxWidth: '100%', padding: "10px", margin: '0px'
                }}
                my={1}
              >
                <Box display="flex" alignItems="center" justifyContent="start"
                  flexDirection="row" gap={3}
                  sx={{ 
                    border: 'none', width: '100%', 
                  }}
                >
                  <Avatar
                    alt="Avatar"
                    src={avatar}
                    sx={{ width: 35, height: 35 }}
                  />
                  <Typography sx={{ fontSize: "16px", fontWeight: 600}} variant="h6" component="div">
                    {surname + " " +
                    name}
                  </Typography>
      
                </Box>
                
                <Box display="flex" alignItems="start" justifyContent="start"
                  sx={{ 
                    border: 'none', width: '100%', textAlign: 'justify',
                    paddingTop: '20px', paddingBottom: '10px'    
                  }}
                >

                    <Typography sx={{ fontSize: "16px", lineHeight: '1.5'}} variant="h4" component="div">
                      {'\u00A0\u00A0\u00A0' + body}
                    </Typography>
                
                </Box>
      
                { 
                  userID === currentUser.id || currentUser.status === "Администратор"
                  ?
      
      
                    <Box display="flex" alignItems="start" justifyContent="end" gap={4}
                      sx={{ 
                        border: 'none ', borderRadius: '10px', width: '100%', height: '2rem',
                      }}
                    >

                      <Button onClick={() => deleteComment(id) } size="small" variant="outlined" color="error" 
                        sx={{ textTransform: 'none', marginRight: '30px'}}
                      >
                        Удалить комментарий
                      </Button>
                    
                    </Box> 
      
                  :
                    <></> 
                }

              </Box>    
            </>
          );
        }

export default PhotoComment