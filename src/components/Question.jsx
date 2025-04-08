import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Question = ({key, id, currentUser, deleteQuestion, name, body, avatar, answers, setAnswers}) => {


    let [saveVar, setSaveVar] = useState(false)

    let [answerBody, setAnswerBody] = useState('')

    let [currentAnswers, setCurrentsAnswers] = useState([]);

    useEffect( () => { viewAnswers(id) }, [] );

    let viewAnswers = (ident) => {

        setCurrentsAnswers(answers.filter( a => a.question_id === ident));

    }

    const createAnswer = (body) => {

        let newAnswer = {
            id: Date.now(),
            question_id: id,
            name: currentUser.name,
            surname: currentUser.surname,
            body: body,
            avatar: currentUser.avatar
        }

        setCurrentsAnswers([...currentAnswers, newAnswer])

        setAnswers([...answers, newAnswer])

    }

    const deleteAnswer = (ident) => {

        setCurrentsAnswers(currentAnswers.filter(f => f.id !== ident))

        setAnswers(answers.filter(f => f.id !== ident))

    }
    
      return (
        <>
  
          <Box key={key} id={id} display="flex" flexDirection="column" gap={2} p={1}
            sx={{
              boxShadow: '4px 4px 8px 4px rgba(34, 60, 80, 0.2)', 
              border: 'none', borderRadius: '10px', maxWidth: '100%', marginLeft: '20%',
              marginRight: '20%', marginBottom: '4%', padding: "20px"
            }}
          >
            <Box display="flex" alignItems="center" justifyContent="start"
              flexDirection="row" gap={4}
              sx={{ 
                border: 'none', borderRadius: '10px', width: '100%', height: '3rem',
              }}
            >
              <Avatar
                alt="Avatar"
                src={avatar}
                sx={{ width: 45, height: 45 }}
              />
              <Typography sx={{ fontSize: "18px", fontWeight: 600}} variant="h6" component="div">
                {name}
              </Typography>
  
            </Box>
            
            <Box display="flex" alignItems="start" justifyContent="start"
              sx={{ 
                border: 'none ', borderRadius: '10px', width: '100%', textAlign: 'justify',
                 
              }}
            >
                <Typography sx={{ fontSize: "18px", lineHeight: '1.5'}} variant="h4" component="div">
                  {'\u00A0\u00A0\u00A0' + body}
                </Typography>

            </Box>
  
            <Box display="flex" alignItems="center" flexDirection="row" 
                justifyContent="space-between"
                sx={{ paddingRight: '20px', paddingLeft: '20px' }}
            >
                { 
                    (currentUser.status === 'Администратор' || currentUser.status === 'Выпускник')
                    ?
    
                        saveVar === false
                        ?
                    
                            <Button onClick={() => { setSaveVar(true) }} size="small" variant="outlined" color="primary" 
                                sx={{ textTransform: 'none'}}
                            >
                                Ответить
                            </Button>

                        :
                            <>
                                <Box width="60%">

                                    <TextField
                                        fullWidth label="Добавить ответ" multiline
                                        rows={2} value={answerBody} onChange={e => setAnswerBody(e.target.value)}
                                    />

                                </Box>

                                <Button onClick={ () => {createAnswer(answerBody); setSaveVar(false) }} size="small" variant="outlined" color="primary" sx={{ width: '20%', textTransform: 'none' }}>
                                    Добавить ответ
                                </Button>
                            </>
 
                :
                    <></> 
                }
    
                {
                currentUser.status === 'Администратор'
                ?
                    
                    <Button onClick={ () => deleteQuestion(id)} size="small" variant="outlined" color="error" 
                        sx={{ textTransform: 'none'}}
                    >
                        Удалить вопрос
                    </Button>
                    
                :
                    <></>
                }


                </Box>
            
                { currentAnswers.map( c =>

                        <Box id={c.id}
                            display="flex" flexDirection="column" alignItems="start"
                            sx={{ borderTop: '2px solid grey', 
                            maxWidth: '100%', paddingRight: "10px", paddingLeft: "10px" , paddingTop: '20px', margin: '0px'
                            }}
                            
                        >
                            <Box display="flex" alignItems="center" justifyContent="start"
                                flexDirection="row" gap={3}
                                sx={{ 
                                    border: 'none', width: '100%', 
                            }}
                            >
                                <Avatar
                                    alt="Avatar"
                                    src={c.avatar}
                                    sx={{ width: 35, height: 35 }}
                                />
                                <Typography sx={{ fontSize: "16px", fontWeight: 600}} variant="h6" component="div">
                                    { c.surname + " " +
                                    c.name}
                                </Typography>
                
                            </Box>
                            
                            <Box display="flex" alignItems="start" justifyContent="start"
                                sx={{ 
                                    border: 'none', width: '100%', textAlign: 'justify',
                                    paddingTop: '20px' 
                                }}
                            >

                                <Typography sx={{ fontSize: "16px", lineHeight: '1.5'}} variant="h4" component="div">
                                {'\u00A0\u00A0\u00A0' + c.body}
                                </Typography>
                            
                            </Box>

                            { currentUser.status === 'Администратор'
                                ?

                                <Box display="flex" justifyContent="end" sx={{ 
                                        border: 'none', width: '100%', textAlign: 'justify',
                                        paddingTop: '10px',   
                                    }}>

                                    <Button onClick={ () => deleteAnswer(c.id)} size="small" variant="outlined" color="error" 
                                        sx={{ textTransform: 'none', fontSize: '13px'}}
                                    >
                                        Удалить ответ
                                    </Button>
                                </Box>
                                :
                                 <></>
                                }
                        </Box>
                )}               
            </Box>   
        </>
      );
    
}

export default Question