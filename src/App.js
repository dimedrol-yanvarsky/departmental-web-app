import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Homepage from './pages/Homepage/Homepage';
import PA from './pages/PA/PA';
import AutorizationPage from './pages/AutorizationPage/AutorizationPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Photogallery from './pages/Photogallery/Photogallery';
import FeedbackPage from './pages/FeedbackPage/FeedbackPage';
import MeetingsPage from './pages/MeetingsPage/MeetingsPage';
import QuestionPage from './pages/QuestionPage/QuestionPage';
import React, { useState } from 'react';  

function App() {
  
  let [personalData, setPersonalData] = useState([
    {id: 1, login: "dima@mail.ru", password: "qwerty", patronymic: "Викторович", 
    status: "Администратор", name: "Дмитрий", surname: "Голубев", avatar: require("./avatar.jpg")},
    {id: 2, login: "ignat@mail.ru", password: "qwerty", patronymic: "Андреевич",
    status: "Выпускник", name: "Игнат", surname: "Роменский", avatar: require("./kartinki-nyashnye-kotiki-16.jpg")}, 
    {id: 3, login: "liza@mail.ru", password: "qwerty", patronymic: "Игоревна",
    status: "Выпускник", name: "Елизавета", surname: "Полухина", avatar: require("./kartinki-nyashnye-kotiki-16.jpg")},
    {id: 4, login: "kirill_vip@mail.ru", password: "qwerty", patronymic: "Дмитриевич",
    status: "Запрос", name: "Кирилл", surname: "Разворотнев", avatar: require("./kartinki-nyashnye-kotiki-16.jpg")},
    {id: 5, login: "andrei@mail.ru", password: "qwerty", patronymic: "Александрович",
    status: "Запрос", name: "Андрей", surname: "Сафонов", avatar: require("./kartinki-nyashnye-kotiki-16.jpg")},
    {id: 6, login: "igor@mail.ru", password: "qwerty", patronymic: "Павлович",
    status: "Блокировка", name: "Игорь", surname: "Лабекин", avatar: require("./kartinki-nyashnye-kotiki-16.jpg")},
    {id: 7, login: "ivan@mail.ru", password: "qwerty", patronymic: "Иванович",
    status: "Блокировка", name: "Иван", surname: "Иванов", avatar: require("./kartinki-nyashnye-kotiki-16.jpg")}
  ]);

  const deleteAccount = (ident) => {

    setPersonalData(personalData.filter( f => f.id !== ident))

    setFeedbacks( feedbacks.filter( f => f.userID !== ident))

    setIsAuth(false)

    setOpenAlert(true)

    setBodyAlert( 'Аккаунт удален')

    setTypeAlert("success")

  }

  let [feedbacks, setFeedbacks] = useState([
    { id: 1, userID: 2, name: "Игнат", surname: "Роменский", date: "16.04.2024, 18:33", body: "Значимость этих проблем настолько очевидна, что реализация намеченного плана развития требует определения и уточнения модели развития. Дорогие друзья, новая модель организационной деятельности требует определения и уточнения системы масштабного изменения ряда параметров. Равным образом социально-экономическое развитие требует от нас анализа экономической целесообразности принимаемых решений.", avatar: require("./kartinki-nyashnye-kotiki-16.jpg") },
    // { id: 2, userID: 3, name: "Елизавета", surname: "Полухина", date: "16.04.2024, 20:52", body: "Практический опыт показывает, что повышение уровня гражданского сознания обеспечивает широкому кругу специалистов участие в формировании дальнейших направлений развитая системы массового участия! Повседневная практика показывает, что дальнейшее развитие различных форм деятельности играет важную роль в формировании модели развития. Повседневная практика показывает, что сложившаяся структура организации способствует повышению актуальности направлений прогрессивного развития.", avatar: require("./kartinki-nyashnye-kotiki-16.jpg") },
  ])

  let [galleryPhotos, setGalleryPhotos] = useState([
    {
      id: 1,
      userID: 2,
      img: require("./photo1.jpg"),
    },
    {
      id: 2,
      userID: 2,
      img: require("./photo2.jpg"),
    },
    {
      id: 3,
      userID: 2,
      img: require("./photo3.jpg"),
    },
    {
      id: 4,
      userID: 2,
      img: require("./photo4.jpg"),
    },
    {
      id: 5,
      userID: 2,
      img: require("./photo5.jpg"),
    },
    {
      id: 6,
      userID: 2,
      img: require("./photo6.jpg"),
    },
    {
      id: 7,
      userID: 3,
      img: require("./photo7.jpg"),
    },
    {
      id: 8,
      userID: 3,
      img: require("./photo8.jpg"),
    },
    {
      id: 9,
      userID: 3,
      img: require("./photo9.jpg"),
    },
  ]);


  let [comments, setComments] = useState([{
    id: 1,
    userID: 3,
    photoID: 1,
    body: "В своей практике постоянно сталкиваюсь с тем, что мы совершенно не умеем хвалить, подбадривать друг друга! Это касается и партнеров и детей и коллег по работе!"
  },
  {
    id: 2,
    userID: 2,
    photoID: 6,
    body: "Хвалить надо искренне, обман все чувствуют. Не манипулировать похвалой. А говорить ее от чистого сердца, вкладывая в слова любовь."
  },
  {
    id: 3,
    userID: 3,
    photoID: 6,
    body: "В своей практике постоянно сталкиваюсь с тем, что мы совершенно не умеем хвалить, подбадривать друг друга! Это касается и партнеров и детей и коллег по работе!"
  }])

  let [questions, setQuestions] = useState([
    { id: 1, name: "Григорий Громыко", body: "Значимость этих проблем настолько очевидна, что реализация намеченного плана развития требует определения и уточнения модели развития. Дорогие друзья, новая модель организационной деятельности требует определения и уточнения системы масштабного изменения ряда параметров. Равным образом социально-экономическое развитие требует от нас анализа экономической целесообразности принимаемых решений.", avatar: require("./kartinki-nyashnye-kotiki-16.jpg") },
    // { id: 2, name: "Екатерина Орлова", body: "Практический опыт показывает, что повышение уровня гражданского сознания обеспечивает широкому кругу специалистов участие в формировании дальнейших направлений развитая системы массового участия! Повседневная практика показывает, что дальнейшее развитие различных форм деятельности играет важную роль в формировании модели развития. Повседневная практика показывает, что сложившаяся структура организации способствует повышению актуальности направлений прогрессивного развития.", avatar: require("./kartinki-nyashnye-kotiki-16.jpg") },
  ])

  let [answers, setAnswers] = useState([
    { id: 1, question_id: 1, name: "Дмитрий", surname: "Голубев", body: "Здравствуйте, Григорий! Все так и есть! Вы правильно разобрались в предметной области!", avatar: require("./avatar.jpg") },
    { id: 2, question_id: 2, name: "Дмитрий", surname: "Голубев", body: "Здравствуйте, Екатерина! Все так и есть! Вы правильно разобрались в предметной области!", avatar: require("./avatar.jpg") }
  ])

  const [meetings, setMeetings] = useState([
    {id: 1, name: "Дмитрий", surname: "Голубев", 
    status: "Встреча закончена", date: "10.06.2022",
    avatar: require("./avatar.jpg"),  body: "Уважаемые выпускники кафедры ИУ6! Приглашаем вас посетить очередную встречу выпускников нашей кафедры! Место встречи: проходная №1. Время указано в шапке!"},
    {id: 2, name: "Дмитрий", surname: "Голубев", 
    status: "Встреча запланирована", date: "10.06.2023",
    avatar: require("./avatar.jpg"),  body: "Уважаемые выпускники кафедры ИУ6! Приглашаем вас посетить очередную встречу выпускников нашей кафедры! Место встречи: проходная №1. Время указано в шапке!"},
  ])

  const [currentUser, setCurrentUser] = useState('');
  console.log(currentUser)

  let [blind, setBlind] = useState(false)

  let size;

  if (blind === false) {

    size = {font: '18px', btn: 'small', mrg: '20%', link: '16px', avatar: 50, vip: '17px', line: 1.5, h: '3rem'}

  }

  else {

    size = {font: '21px', btn: 'medium', mrg: '12%', link: '18px', avatar: 60, vip: '19px', line: 1.6, h: '4rem'}

  }

  let [inter, setInter] = useState(false)


  let [isAuth, setIsAuth] = useState(false);

  const exitFromAccount = () => {
    setIsAuth(isAuth = false)
    setCurrentUser('')
  }

  let [bodyAlert, setBodyAlert] = useState('');

  let [typeAlert, setTypeAlert] = useState('');

  let [openAlert, setOpenAlert] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar size={size} inter={inter} setInter={setInter} blind={blind} setBlind={setBlind} avatar={currentUser.avatar} isAuth={isAuth}/>
        <Routes>
          <Route path="/" element={<Homepage />} />
            <Route path="personal" element={<PA openAlert={openAlert} setOpenAlert={setOpenAlert} bodyAlert={bodyAlert} setBodyAlert={setBodyAlert} typeAlert={typeAlert} setTypeAlert={setTypeAlert} isAuth={isAuth} deleteAccount={deleteAccount} exitFromAccount={exitFromAccount} currentUser={currentUser} personalData={personalData} setPersonalData={setPersonalData} setCurrentUser={setCurrentUser}/>} />
            <Route path="register" element={<RegistrationPage openAlert={openAlert} setOpenAlert={setOpenAlert} bodyAlert={bodyAlert} setBodyAlert={setBodyAlert} typeAlert={typeAlert} setTypeAlert={setTypeAlert} personalData={personalData} setPersonalData={setPersonalData}/>} />
            <Route path="login" element={<AutorizationPage openAlert={openAlert} setOpenAlert={setOpenAlert} bodyAlert={bodyAlert} setBodyAlert={setBodyAlert} typeAlert={typeAlert} setTypeAlert={setTypeAlert} setCurrentUser={setCurrentUser} setIsAuth={setIsAuth} currentUser={currentUser} personalData={personalData} isAuth={isAuth}/>} />
            <Route path="gallery" element={<Photogallery comments={comments} setComments={setComments} galleryPhotos={galleryPhotos} setGalleryPhotos={setGalleryPhotos} personalData={personalData} currentUser={currentUser} isAuth={isAuth}/>} />
            <Route path="feedbacks" element={<FeedbackPage feedbacks={feedbacks} setFeedbacks={setFeedbacks} inter={inter} size={size} blind={blind} setBlind={setBlind} currentUser={currentUser} isAuth={isAuth}/>} />
            <Route path="meetings" element={<MeetingsPage meetings={meetings} setMeetings={setMeetings} currentUser={currentUser} isAuth={isAuth}/>} />
            <Route path="questions" element={<QuestionPage questions={questions} setQuestions={setQuestions} answers={answers} setAnswers={setAnswers} currentUser={currentUser} isAuth={isAuth}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
