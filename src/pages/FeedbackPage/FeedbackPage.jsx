import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Feedback from "../../components/Feedback";
import AlertMessage from '../../components/AlertMessage';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


// {key: "1", name: "Дмитрий", surname: "Голубев", date: "16.04.2024, 18:52", body: "\u00A0\u00A0\u00A0Практический опыт показывает, что повышение уровня гражданского сознания обеспечивает широкому кругу специалистов участие в формировании дальнейших направлений развитая системы массового участия! Повседневная практика показывает, что дальнейшее развитие различных форм деятельности играет важную роль в формировании модели развития. Повседневная практика показывает, что сложившаяся структура организации способствует повышению актуальности направлений прогрессивного развития.", avatar: require("./avatar.jpg")},

function FeedbackPage({ feedbacks, setFeedbacks, size, inter, currentUser, isAuth }) {

  
  let [fixedBody, setFixedBody] = useState('')

  let [saveBodyVar, setSaveBodyVar] = useState(false)

  
  let [feedbacksEn, setFeedbacksEn] = useState([
    { id: 1, userID: 2, name: "Ignat", surname: "Romensky", date: "16.04.2024, 18:33", body: "The significance of these problems is so obvious that the implementation of the planned development plan requires the definition and refinement of the development model. Dear friends, the new model of organizational activity requires the definition and refinement of a system of large-scale changes in a number of parameters. Similarly, socio-economic development requires us to analyze the economic feasibility of our decisions.", avatar: require("./kartinki-nyashnye-kotiki-16.jpg") },
    // { id: 2, userID: 3, name: "Elizabeth", surname: "Polukhina", date: "16.04.2024, 20:52", body: "Practical experience shows that increasing the level of civic consciousness provides a wide range of specialists with participation in the formation of further directions of a developed system of mass participation! Everyday practice shows that the further development of various forms of activity plays an important role in shaping the development model. Everyday practice shows that the established structure of the organization contributes to increasing the relevance of the directions of progressive development.", avatar: require("./kartinki-nyashnye-kotiki-16.jpg") },
  ])

  let [openAlert, setOpenAlert] = useState(false);
  
  let [bodyAlert, setBodyAlert] = useState('');

  let [typeAlert, setTypeAlert] = useState('');

  const [checked, setChecked] = React.useState(false);

  const hideButton = () => {

    let arrayOfUserID = []

    feedbacks.map(feedback =>
      arrayOfUserID.push(feedback.userID)
    )

    if (arrayOfUserID.includes(currentUser.id)) {
      return true
    }
    else {
      return false
    }

  }

  const [feedbackBody, setFeedbackBody] = useState('')

  const deleteFeedback = (ident) => {
    console.log('Отзыв удален', feedbacks, ident)

    setChecked(false)
    setFeedbacks(feedbacks.filter(f => f.id !== ident))

    setBodyAlert('Отзыв удален')

    setTypeAlert('success')
      
    setOpenAlert(true)

  }

  let currentdate = new Date();
  let datetime = currentdate.getDate() + ".0"
    + (currentdate.getMonth() + 1) + "."
    + currentdate.getFullYear() + ", "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes();

  const addFeedback = (e) => {
    e.preventDefault()
    const newFeedback = {
      // id: feedbacks.length + 1,
      id: Date.now(),
      userID: currentUser.id,
      name: currentUser.name,
      surname: currentUser.surname,
      date: "0" + datetime,
      body: feedbackBody,
      avatar: currentUser.avatar
    }

    
    setFeedbacks([...feedbacks, newFeedback])

    setChecked(!checked)
    setFeedbackBody('')

    setBodyAlert('Отзыв добавлен')

    setTypeAlert('success')
      
    setOpenAlert(true)
  }

  // useEffect( () => {
  //   setFeedbacks([...feedbacks])
  //   }, [fixedBody]
  // )

  return (

    <>

      <Box display="flex" alignItems="center" 
          justifyContent="space-between" sx={{  height: "100px"}}>
          <AlertMessage body={bodyAlert} openAlert={openAlert} setOpenAlert={setOpenAlert} type={typeAlert}/>
      </Box>
       
        {

          inter === false?
          <TransitionGroup>
            {feedbacks.map((feedback) =>
              <CSSTransition key={feedback.key}  classNames="feedback">
                <Feedback
                  key={feedback.key}
                  id={feedback.id}
                  currentUser={currentUser}
                  userID={feedback.userID}
                  deleteFeedback={deleteFeedback}
                  name={feedback.name}
                  surname={feedback.surname}
                  date={feedback.date}
                  body={feedback.body}
                  avatar={feedback.avatar}
                  fixedBody={fixedBody}
                  setFixedBody={setFixedBody}
                  feedbacks={feedbacks}
                  setFeedbacks={setFeedbacks} 
                  saveBodyVar={saveBodyVar}
                  setSaveBodyVar={setSaveBodyVar}
                  setOpenAlert={setOpenAlert}
                  setBodyAlert={setBodyAlert}
                  setTypeAlert={setTypeAlert}
                  size={size}
                />
              </CSSTransition>
            )}
          </TransitionGroup>
          :
          <>
          {feedbacksEn.map((feedback) =>
            <Feedback
              key={feedback.key}
              id={feedback.id}
              currentUser={currentUser}
              userID={feedback.userID}
              deleteFeedback={deleteFeedback}
              name={feedback.name}
              surname={feedback.surname}
              date={feedback.date}
              body={feedback.body}
              avatar={feedback.avatar}
              fixedBody={fixedBody}
              setFixedBody={setFixedBody}
              feedbacks={feedbacks}
              setFeedbacks={setFeedbacks} 
              saveBodyVar={saveBodyVar}
              setSaveBodyVar={setSaveBodyVar}
              setOpenAlert={setOpenAlert}
              setBodyAlert={setBodyAlert}
              setTypeAlert={setTypeAlert}
              size={size}
            />
          )}
          </>
        }
    
    <TransitionGroup>
     <CSSTransition classNames="feedback">
      {
        
        (hideButton() === false) && (isAuth === true) && (currentUser.status !== 'Администратор')
        ?
      
          
          <Box my={5} display="flex" flexDirection="column" gap={3} p={1}
            sx={{
              border: 'none', borderRadius: '10px', maxWidth: '100%', marginLeft: size.mrg,
              marginRight: size.mrg, padding: "20px"
            }}
          >

            <TextField
              id="outlined-multiline-flexible" label="Добавить отзыв" multiline
              rows={6} value={feedbackBody} onChange={e => setFeedbackBody(e.target.value)}
            />

            <Button onClick={addFeedback} size={size.btn} variant="outlined" color="primary" sx={{ width: '20%', textTransform: 'none' }}>
              Добавить отзыв
            </Button>

          </Box>
          
            
        :
          <></>
          
      }
      </CSSTransition>
    </TransitionGroup>
    </>
   

  );

}
export default FeedbackPage;