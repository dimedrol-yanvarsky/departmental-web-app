import React, { useState} from "react";
import Meeting from "../../components/Meeting";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AlertMessage from '../../components/AlertMessage';
import GroupsIcon from '@mui/icons-material/Groups';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function MeetingsPage({meetings, setMeetings, currentUser, isAuth}) {

  const [meetingStatus, setMeetingStatus] = useState('')

  let [openAlert, setOpenAlert] = useState(false);
  
  let [bodyAlert, setBodyAlert] = useState('');

  let [typeAlert, setTypeAlert] = useState('');

  const addMeeting = (e) => {
    e.preventDefault()
    // console.log(feedbackBody)
    const newMeeting = {
      id: Date.now(),
      name: "Дмитрий",
      surname: "Голубев",
      date: "10.06.2024",
      status: "Встреча запланирована",
      avatar: require("./avatar.jpg"),
      body: 'Введите информацию о встрече'
    }
    setMeetings( [...meetings, newMeeting])
    // setFeedbacks( [...feedbacks].push(newFeedback))
    setMeetingStatus('')

    
    setBodyAlert('Встреча добавлена')

    setTypeAlert('success')
    
    setOpenAlert(true)
  }

  const deleteMeeting = (ident) => {
    // e.preventDefault()
    setMeetings(meetings.filter(f => f.id !== ident))

    setBodyAlert('Встреча удалена')

    setTypeAlert('success')
      
    setOpenAlert(true)
  }

    return (
      <>
          <Box display="flex" alignItems="center" 
          justifyContent="space-between" sx={{  height: "100px"}}>
          <AlertMessage body={bodyAlert} openAlert={openAlert} setOpenAlert={setOpenAlert} type={typeAlert}/>
          {
            isAuth === true && currentUser.status === "Администратор"
            ?
              <Button 
                onClick={ (e) => addMeeting(e) } 
                component="label"
                size="medium" variant="outlined" color="primary" 
                endIcon={<GroupsIcon/>}
                sx={{ textTransform: 'none', marginRight: "100px"}}
              >
                Новая встреча
              </Button>
            :
              <></>
          }
        </Box>
        <TransitionGroup>
          {meetings.map((meeting) =>
            <CSSTransition key={meeting.key} timeout={500} classNames="item">
            <Meeting
              key={meeting.key}
              id={meeting.id}
              name={meeting.name}
              avatar={meeting.avatar}
              surname={meeting.surname}
              status={meeting.status}
              deleteMeeting={deleteMeeting}
              date={meeting.date}
              body={meeting.body}
              currentUser={currentUser}
              meetings={meetings}
              setMeetings={setMeetings}
              setBodyAlert={setBodyAlert}
              setOpenAlert={setOpenAlert}
              setTypeAlert={setTypeAlert}            
            />
            </CSSTransition>
          )}
        </TransitionGroup>
     </>
    );
  }
  export default MeetingsPage;