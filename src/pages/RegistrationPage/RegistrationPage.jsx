import {React, useState} from "react";
import cl from './RegistrationPage.module.css'
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function RegistrationPage({bodyAlert, setBodyAlert, typeAlert, setTypeAlert, openAlert, setOpenAlert, personalData, setPersonalData}) {

  const options = ['Выпускник', 'Сотрудник'];

    const navigate = useNavigate()

    let [fixedType, setFixedType] = useState(options[0])

    // let [openAlert, setOpenAlert] = useState(false)

    // let [bodyAlert, setBodyAlert] = useState('')

    // let [typeAlert, setTypeAlert] = useState('')

    const validation = (e) => {

      e.preventDefault();

      if (!(surname.length && name.length && patronymic.length && email.length && fixedType.length && password.length)) {

        setOpenAlert(true)

        setBodyAlert('Есть пустые поля')

        setTypeAlert("error")

        console.log(1)

        return 0

      }

      console.log(email.includes("@"))

      if (email.indexOf("@") === -1) {

        setOpenAlert(true)

        setBodyAlert('Неверный формат почты')

        setTypeAlert("error")

        console.log(2)
        
        return 0

      }


      if (personalData.find( f => f.login === email)) {

        setOpenAlert(true)

        setBodyAlert( 'Почта уже находится в БД')

        setTypeAlert("error")

        console.log(3)
        
        return 0

      }

      let newUser = {
        id: Date.now(), 
        login: email, 
        password: password, 
        patronymic: patronymic,
        status: "Запрос-" + fixedType, 
        name: name,
        surname: surname, 
        avatar: require("./kartinki-nyashnye-kotiki-16.jpg")
      }

      setPersonalData([...personalData, newUser])

      console.log(newUser)

      setOpenAlert(true)

      setBodyAlert( 'Заявка отправлена')

      setTypeAlert("success")

      navigate('/login')

    }

    let [surname, setSurname] = useState('')

    let [name, setName] = useState('')

    let [patronymic, setPatronymic] = useState('')

    let [email, setEmail] = useState('')

    let [status, setStatus] = useState('')

    let [password, setPassword] = useState('')

    return (
      <Box className={cl.bg}>
        <Box display="flex" alignItems="center" justifyContent="start" sx={{  
            height: "100px", }}>
            <AlertMessage body={bodyAlert} openAlert={openAlert} setOpenAlert={setOpenAlert} type={typeAlert}/>
        </Box>
          <section>
            <div className={cl.formBox}>
              <form action="">
                  <h2>Регистрация</h2>
                  <div className={cl.inputbox}>
                      <ion-icon name="person-outline"></ion-icon>
                      <input value={surname} onChange={e => setSurname(e.target.value)} type="text" required />
                      <label htmlFor="">Фамилия</label>
                  </div>
                  <div className={cl.inputbox}>
                      <ion-icon name="person-outline"></ion-icon>
                      <input value={name} onChange={e => setName(e.target.value)} type="text" required />
                      <label htmlFor="">Имя</label>
                  </div>
                  <div className={cl.inputbox}>
                      <ion-icon name="person-outline"></ion-icon>
                      <input value={patronymic} onChange={e => setPatronymic(e.target.value)} type="text" required />
                      <label htmlFor="">Отчество</label>
                  </div>
                  <div className={cl.inputbox}>
                      <ion-icon name="mail-outline"></ion-icon>
                      <input value={email} onChange={e => setEmail(e.target.value)} type="text" required />
                      <label htmlFor="">Почта</label>
                  </div>
                  <Autocomplete
                      // className={cl.inputbox}
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
                      // sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Тип встречи" />}
                    />
                  {/* <div className={cl.inputbox}>
                      <ion-icon name="phone-portrait-outline"></ion-icon>
                      <input value={status} onChange={e => setStatus(e.target.value)} type="text" required />
                      <label htmlFor="">Кафедральный статус</label>
                  </div> */}
                  <div className={cl.inputbox}>
                      <ion-icon name="lock-closed-outline"></ion-icon>
                      <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
                      <label htmlFor="">Пароль</label>
                  </div>
                
                  <button onClick={(e) => validation(e) }className={cl.buttonRegister}>Зарегистрироваться</button>
                  
                  <div className={cl.register}>
                      <p>Есть аккаунт? <Link to="/login"> Авторизоваться</Link></p>
                  </div>

              </form>
            </div>
          </section>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>  
      </Box>
    );
  }
  export default RegistrationPage;