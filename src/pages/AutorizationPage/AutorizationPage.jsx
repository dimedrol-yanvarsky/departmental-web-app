import React, { useState } from "react";
import cl from './AutorizationPage.module.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import AlertMessage from "../../components/AlertMessage";
import Box from '@mui/material/Box';

function AutorizationPage({bodyAlert, setBodyAlert, typeAlert, setTypeAlert, openAlert, setOpenAlert, setCurrentUser, setIsAuth, isAuth, personalData, currentUser}) {

    
    const navigate = useNavigate()
    
    // let [bodyAlert, setBodyAlert] = useState('')

    // let [typeAlert, setTypeAlert] = useState('')

    const [loginBody, setLoginBody] = useState('');
    const [passwordBody, setPasswordBody] = useState('');
    // let [openAlert, setOpenAlert] = useState(false);

    const sendData = (e) => {
        e.preventDefault()

        setLoginBody('')
        setPasswordBody('')

        // const url = "http://localhost:8083/api/auth"

        // axios({
        //     method: 'post',
        //     url: url,
        //     data: {
        //         loginBody,
        //         passwordBody
        //     }
        //   });

        if (!(loginBody.length && passwordBody.length)) {

            setOpenAlert(true)
    
            setBodyAlert('Есть пустые поля')
    
            setTypeAlert("error")
    
            console.log(1)
    
            return 0
    
          }


        let logins = []

        personalData.map(d => 
            logins.push(d.login)
        )

        if (logins.includes(loginBody)) {

            if (personalData.find(f => f.login === loginBody).status === 'Блокировка') {
                setOpenAlert(true)
    
                setBodyAlert('Учетная запись заблокирована')
        
                setTypeAlert("error")
        
                console.log(1)
        
                return 0
            }
            
            if (personalData.find(f => f.login === loginBody).status.split('-')[0] === 'Запрос') {
                setOpenAlert(true)
    
                setBodyAlert('Заявка все ещё на рассмотрении')
        
                setTypeAlert("error")
        
                console.log(1)
        
                return 0
            }

            if (personalData.find(f => f.login === loginBody).status === 'Отклонена') {
                setOpenAlert(true)
    
                setBodyAlert('Неверный пароль')
        
                setTypeAlert("error")
        
                console.log(1)
        
                return 0
            }
            
            if (personalData.find(f => f.login === loginBody).password !== passwordBody) {
                setOpenAlert(true)
    
                setBodyAlert('Неверный пароль')
        
                setTypeAlert("error")
        
                console.log(1)
        
                return 0
            }

            setIsAuth(isAuth = true)
            setCurrentUser(currentUser = personalData.find( d => d.login === loginBody))
            console.log(currentUser)
            console.log(isAuth)

            setOpenAlert(true)
    
            setBodyAlert('Пользователь авторизован')
    
            setTypeAlert("success")
    
            console.log(1)

            navigate('/personal')

            return true
        }
        else {
            setOpenAlert(true)
    
            setBodyAlert('Такого пользователя нет')
    
            setTypeAlert("error")
    
            return false
        }

        setLoginBody('')
        setPasswordBody('')

        navigate('/login')


    }
    return (
      <Box className={cl.bg}>
        <Box display="flex" alignItems="center" justifyContent="start" sx={{  
            height: "100px", }}>
            <AlertMessage body={bodyAlert} openAlert={openAlert} setOpenAlert={setOpenAlert} type={typeAlert}/>
        </Box>
        <section>
            <div className={cl.formBox}>
                <form action="">
                    <h2>Авторизация</h2>
                    <div className={cl.inputbox}>
                        <ion-icon name="mail-outline"></ion-icon>
                        <input 
                            value={loginBody}
                            onChange={e => setLoginBody(e.target.value)} 
                            type="text" 
                            required 
                        />
                        <label htmlFor="">Почта</label>
                    </div>
                    <div className={cl.inputbox}>
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input
                            value={passwordBody}
                            onChange={e => setPasswordBody(e.target.value)}  
                            type="password" 
                            required 
                        />
                        <label htmlFor="">Пароль</label>
                    </div>
                    <div className={cl.forget}>
                        <Link to="/">Забыли пароль?</Link>
                    </div>
                    
                    <button onClick={sendData} className={cl.buttonLogin}>Войти
                        
                        {/* {
                            isRedirect === true
                            ?
                                <Link style={{ textDecoration: 'none', color: "#000"}} to="/personal">
                                    Войти
                                </Link>
                            :
                                <Link style={{ textDecoration: 'none', color: "#000"}} to="/personal">
                                    Войти
                                </Link>     
                        } */}
                    </button>
                    
                    <div className={cl.register}>
                        <p>Нет аккаунта? <Link to="/register"> Зарегистрироваться</Link></p>
                    </div>
                </form>
            </div>
        </section>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </Box>
    );
  }
  export default AutorizationPage;