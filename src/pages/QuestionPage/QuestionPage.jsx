import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Question from "../../components/Question";
import AlertMessage from '../../components/AlertMessage';
import Typography from '@mui/material/Typography';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const QuestionPage = ({questions, setQuestions, answers, setAnswers, currentUser, isAuth}) => {
    
    let [fixedBody, setFixedBody] = useState('')

    let [userName, setUserName] = useState('')

    let [userSurname, setUserSurname] = useState('')
      
    let [saveBodyVar, setSaveBodyVar] = useState(false)

    let [openAlert, setOpenAlert] = useState(false);
  
    let [bodyAlert, setBodyAlert] = useState('');

    let [typeAlert, setTypeAlert] = useState('');
  
    // let [questions, setQuestions] = useState([
    //   { id: 1, name: "Григорий Громыко", body: "Значимость этих проблем настолько очевидна, что реализация намеченного плана развития требует определения и уточнения модели развития. Дорогие друзья, новая модель организационной деятельности требует определения и уточнения системы масштабного изменения ряда параметров. Равным образом социально-экономическое развитие требует от нас анализа экономической целесообразности принимаемых решений.", avatar: require("./kartinki-nyashnye-kotiki-16.jpg") },
    //   { id: 2, name: "Екатерина Орлова", body: "Практический опыт показывает, что повышение уровня гражданского сознания обеспечивает широкому кругу специалистов участие в формировании дальнейших направлений развитая системы массового участия! Повседневная практика показывает, что дальнейшее развитие различных форм деятельности играет важную роль в формировании модели развития. Повседневная практика показывает, что сложившаяся структура организации способствует повышению актуальности направлений прогрессивного развития.", avatar: require("./kartinki-nyashnye-kotiki-16.jpg") },
    // ])

    // let [answers, setAnswers] = useState([
    //   { id: 1, question_id: 1, name: "Дмитрий", surname: "Голубев", body: "Здравствуйте, Григорий! Все так и есть! Вы правильно разобрались в предметной области!", avatar: require("./avatar.jpg") },
    //   { id: 2, question_id: 2, name: "Дмитрий", surname: "Голубев", body: "Здравствуйте, Екатерина! Все так и есть! Вы правильно разобрались в предметной области!", avatar: require("./avatar.jpg") }
    // ])
  
  
    const uploadQuestion = () => {

      if (fixedBody.length === 0 || userName.length === 0) {

        setOpenAlert(true)

        setBodyAlert('Заполните все поля')

        setTypeAlert("error")

        return 0

      }

      let newQuestion = {
        id: Date.now(),
        name: userName + " " + userSurname,
        body: fixedBody,
        avatar:  require("./kartinki-nyashnye-kotiki-16.jpg")
      }

      setQuestions([...questions, newQuestion])

      setOpenAlert(true)

      setBodyAlert('Вопрос добавлен')

      setTypeAlert("success")

      setFixedBody('')

      setUserName('')

      setUserSurname('')

    }
  
    const deleteQuestion = (ident) => {
      console.log('Отзыв удален', questions, ident)
      setQuestions(questions.filter(f => f.id !== ident))
    }
  
        return (
      
          <>
      
            <Box display="flex" alignItems="center" 
              justifyContent="space-between" sx={{  height: "100px"}}>
              <AlertMessage body={bodyAlert} openAlert={openAlert} setOpenAlert={setOpenAlert} type={typeAlert}/>
            </Box>
            <TransitionGroup>
            {questions.map(question => 
              <CSSTransition key={question.key} timeout={500} classNames="item">
              <Question
                key={question.key}
                id={question.id}
                currentUser={currentUser}
                isAuth={isAuth}
                deleteQuestion={deleteQuestion}
                name={question.name}
                body={question.body}
                avatar={question.avatar}
                fixedBody={fixedBody}
                setFixedBody={setFixedBody}
                questions={questions}
                setQuestions={setQuestions} 
                saveBodyVar={saveBodyVar}
                setSaveBodyVar={setSaveBodyVar}
                answers={answers}
                setAnswers={setAnswers}
              />
              </CSSTransition>
            )}
            </TransitionGroup>
            {
      
                isAuth === false?

                <Box my={5} display="flex" flexDirection="column" justifyContent="center" gap={3} p={1}
                  sx={{
                    border: 'none', borderRadius: '10px', width: '1100px', marginLeft: '20%',
                    marginRight: '20%', padding: "20px"
                  }}
                >
                  <Typography sx={{ fontSize: "30px", fontWeight: 500}} variant="h1"> Остались вопросы? Задайте их по форме ниже!</Typography>

                    <Box display="flex" flexDirection="row" gap={5}>
                      <TextField
                          id="outlined-multiline-flexible" label="Введите имя" multiline
                          rows={1} value={userName} onChange={e => setUserName(e.target.value)}
                      />

                      <TextField
                          id="outlined-multiline-flexible" label="Введите фамилию" multiline
                          rows={1} value={userSurname} onChange={e => setUserSurname(e.target.value)}
                      />
                    
                    </Box>

                    <TextField
                        id="outlined-multiline-flexible"  label="Добавить вопрос" multiline
                        rows={6} value={fixedBody} onChange={e => setFixedBody(e.target.value)}
                    />
        
                    <Button  size="small" variant="outlined" color="primary" 
                      sx={{ width: '20%', textTransform: 'none' }}
                      onClick={ () => uploadQuestion()}  
                    >
                        Опубликовать вопрос
                    </Button>
           
      
                </Box>
              :
                <></>
      
            }
      
          </>
      
        );
      
}

export default QuestionPage