import { React, useState} from "react";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Meeting({setBodyAlert, setTypeAlert, setOpenAlert, key, id, name, surname, date, status, body, deleteMeeting, avatar, currentUser, meetings, setMeetings}) {

  let [fixBodyVar, setFixBodyVar] = useState(false)

  let [fixedBody, setFixedBody] = useState('')

  let [fixedTime, setFixedTime] = useState('')
  
  let [fixedType, setFixedType] = useState(status)

  const options = ['Встреча запланирована', 'Встреча закончена','Встреча идет сейчас'];

  const saveChanges = (body, time, type) => {

    // fixedBody = body

    // fixedTime = time

    // fixedType = type

    meetings = meetings.map( m => {

      if (m.id === id) {

        m.body = body

        m.date = time

        // if (time.split('.',3).at(-1) >= 2024) {
        //   m.status = "Встреча запланирована"
        // }
        // else {

        //   m.status = "Встреча закончена"
        // }

        m.status = type
      }

      setMeetings([...meetings])

      setBodyAlert('Встреча отредактирована')

      setTypeAlert('success')
      
      setOpenAlert(true)

    })

    

  }

  // let [saveBodyVar, setSaveBodyVar] = useState(false)

  // let [saveBody, setSaveBody] = useState()

  // let [fixBody, setFixBody] = useState()


  return (
      <>
        <Box key={key} id={id} display="flex" flexDirection="column" gap={2} p={1}
          sx={{
            boxShadow: '4px 4px 8px 4px rgba(34, 60, 80, 0.2)', 
            border: 'none', borderRadius: '10px',  maxWidth: '100%', marginLeft: '20%',
            marginRight: '20%', padding: "20px", marginBottom: '50px'
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="start"
            flexDirection="row" gap={3}
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
              {name + " " +
              surname}
            </Typography>

            {status === "Встреча запланирована"
              ?
                fixBodyVar === true
                ?
                  <>
                    <Autocomplete
                      value={fixedType}
                      onChange={(event, newValue) => {
                        setFixedType(newValue);
                      }}
                      // inputValue={inputValue}
                      // onInputChange={(event, newInputValue) => {
                      //   setInputValue(newInputValue);
                      // }}
                      id="controllable-states-demo"
                      options={options}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Тип встречи" />}
                    />
                    <TextField
                      id="standard-basic" label="Редактировать время" variant="standard"  multiline
                      rows={1}  value={fixedTime} onChange={e => setFixedTime(e.target.value) }
                    />
                  </>
                :
                  <>
                    <Typography sx={{ fontSize: "18px", fontWeight: 400, color: 'green' }} variant="h5" component="div">
                      {status + " " + date}
                    </Typography>
        
                   
                  </>
              :
                
                 fixBodyVar === true
                ?
                  <>
                    <Autocomplete
                      value={fixedType}
                      onChange={(event, newValue) => {
                        setFixedType(newValue);
                      }}
                      // inputValue={inputValue}
                      // onInputChange={(event, newInputValue) => {
                      //   setInputValue(newInputValue);
                      // }}
                      id="controllable-states-demo"
                      options={options}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Тип встречи" />}
                    />
                    <TextField
                      id="standard-basic" label="Редактировать время" variant="standard"  multiline
                      rows={1}  value={fixedTime} onChange={e => setFixedTime(e.target.value) }
                    />
                  </>
                :
                  <>
                    
                    <Typography sx={{ fontSize: "18px", fontWeight: 400, color: 'red' }} variant="h5" component="div">
                      {status + " " + date}
                    </Typography>
                  </>
            }
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
                id="outlined-multiline-flexible" label="Редактировать встречу" fullWidth  multiline
                rows={2}  value={fixedBody} onChange={e => setFixedBody(e.target.value) }
              />
            :
              body === ""
              ?
                <></>
              :
                <Typography sx={{ fontSize: "18px", lineHeight: '1.5'}} variant="h4" component="div">
                  {'\u00A0\u00A0\u00A0' + body}
                </Typography>
          }
          
          </Box>

          { 
            currentUser.status === 'Администратор'
            ?


              <Box display="flex" alignItems="start" justifyContent="space-between" gap={4}
                sx={{ 
                  border: 'none ', borderRadius: '10px', width: '100%', height: '2rem',
                }}
              >
                {
                  fixBodyVar === true
                  ?
                    <Button onClick={ () => { setFixBodyVar(false); saveChanges(fixedBody, fixedTime, fixedType) } } size="small" variant="outlined" color="primary" 
                      sx={{ textTransform: 'none'}}
                    >
                      Сохранить запись
                    </Button>
                  :
                    <Button onClick={ () => { setFixBodyVar(true); setFixedBody(body); setFixedTime(date); setFixedType(status)  }} size="small" variant="outlined" color="primary" 
                      sx={{ textTransform: 'none'}}
                    >
                      Редактировать запись
                    </Button>
                }
                
                <Button onClick={() => deleteMeeting(id) } size="small" variant="outlined" color="error" 
                  sx={{ textTransform: 'none'}}
                >
                  Удалить запись
                </Button>
              
              </Box> 

            :
              <></> 
          }

        </Box>      
      </>
    );
  }
  export default Meeting;