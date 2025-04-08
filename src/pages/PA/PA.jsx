import { useEffect, useState, React} from "react";
import cl from './PA.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import User from "../../components/RegUser";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { styled } from '@mui/material/styles';
import AlertMessage from "../../components/AlertMessage";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function PA({bodyAlert, setBodyAlert, typeAlert, setTypeAlert, openAlert, setOpenAlert, currentUser, deleteAccount, exitFromAccount, personalData, setPersonalData}) {

    
    
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
    
    let updateAvatar = (ph) => {
        
        let currentID = currentUser.id;

        let updatePhoto = personalData.find( f => f.id === currentID)

        updatePhoto.avatar = require(`./${ph.name}`)

        setPersonalData([...personalData])
    }

    function blockUser(surname) {
        
        let user = personalData.find((item) => item.surname === surname)

        user.status = "Блокировка";

        setPersonalData([...personalData])
    } 

    function accessUser(surname) {
        let user = personalData.find((item) => item.surname === surname)

        user.status = "Выпускник";

        setPersonalData([...personalData])

        console.log("Добавлен пользователь")
    }

    function denyUser(surname) {

        setPersonalData(personalData.filter(f => f.surname !== surname))
    }

    return (
        <>
            {currentUser.status === 'Администратор'
            ?
                <>
                    <Box display="flex" alignItems="center" justifyContent="start" sx={{  
                        height: "100px", }}>
                        <AlertMessage body={bodyAlert} openAlert={openAlert} setOpenAlert={setOpenAlert} type={typeAlert}/>
                    </Box>
                    <div className={cl.main_container}>
                        <Card sx={{ maxWidth: 345, maxHeight: 800}}>
                            <CardMedia
                                component="img"
                                height="345px"
                                image={currentUser.avatar}
                                alt="avatar"
                            />
                            <CardContent>
                                <Box gap={2} my={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <Typography sx={{ fontSize: "20px", fontWeight: 600}} variant="h6" component="div"  >
                                        Статус:
                                    </Typography>
                                    <Typography sx={{ fontSize: "20px"}} variant="h5" component="div"  >
                                        {currentUser.status}
                                    </Typography>
                                    {
                                        currentUser.status === 'Администратор'
                                        ?
                                            <CheckCircleIcon sx={{ position: 'relative', right:'10px', color: 'green'}}/>
                                        :
                                            <></>
                                    }
                                </Box>
                                <Box gap={2} my={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <Typography sx={{ fontSize: "20px", fontWeight: 600}} variant="h6" component="div"  >
                                        Фамилия:
                                    </Typography>
                                    <Typography sx={{ fontSize: "20px"}} variant="h5" component="div"  >
                                        {currentUser.surname}
                                    </Typography>
                                </Box>
                                <Box gap={2} my={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <Typography sx={{ fontSize: "20px", fontWeight: 600}} variant="h6" component="div"  >
                                        Имя:
                                    </Typography>
                                    <Typography sx={{ fontSize: "20px"}} variant="h5" component="div"  >
                                        {currentUser.name}
                                    </Typography>
                                </Box>
                                <Box gap={2} my={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <Typography sx={{ fontSize: "20px", fontWeight: 600}} variant="h6" component="div"  >
                                        Отчество:
                                    </Typography>
                                    <Typography sx={{ fontSize: "20px"}} variant="h5" component="div"  >
                                        {currentUser.patronymic}
                                    </Typography>
                                </Box>
                                <Box gap={2} my={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
                                    <Typography sx={{ fontSize: "20px", fontWeight: 600}} variant="h6" component="div"  >
                                        Почта:
                                    </Typography>
                                    <Typography sx={{ fontSize: "20px"}} variant="h5" component="div"  >
                                        {currentUser.login}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions sx={{ display:'flex', justifyContent:'space-evenly'}}>
                                <Button onChange={ e =>  
                                    // e.preventDefault(); 
                                    updateAvatar(e.target.files[0]) 
                                } component="label" 
                                    size="small" variant="outlined" color="primary" 
                                    sx={{ textTransform: 'none'}}
                                >
                                    Сменить фото 
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                                <Link to="/login">
                                    <Button size="small" onClick={() => exitFromAccount()} variant="outlined" color="primary" sx={{ textTransform: 'none'}}>
                                        Выйти из аккаунта
                                    </Button>
                                </Link>
                                {
                                    currentUser.status === 'Пользователь'
                                    ?
                                        <Link to="/login">
                                            <Button size="small" onClick={() => exitFromAccount()} variant="outlined" color="error" sx={{ textTransform: 'none'}}>
                                                Удалить аккаунт
                                            </Button>
                                        </Link>
                                    :
                                        <></>
                                }
                            </CardActions>
                        </Card>
                        <Box display="flex" flexDirection="column" gap={1} p={1}
                            sx={{
                                boxShadow: '4px 4px 8px 4px rgba(34, 60, 80, 0.2)', 
                                border: 'none', borderRadius: '10px', minWidth: 300, maxHeight: 700,
                                justifyContent:'start'
                            }}
                        >
                            <Typography sx={{ fontSize: "18px", fontWeight: 600 }} 
                                variant="h6" component="div"
                            >
                                Зарегистрированные пользователи
                            </Typography>
                            <TransitionGroup>
                            {
                                personalData.map(data => 
                                    data.status === 'Пользователь' || data.status === 'Выпускник'
                                    ?
                                    <CSSTransition key={data.key} timeout={500} classNames="item">
                                        <User login={data.login} 
                                        name={data.name} 
                                        surname={data.surname} 
                                        patronymic={data.patronymic} 
                                        userType={"registered"}
                                        avatar={data.avatar}
                                        blockUser={blockUser}
                                        bodyAlert={bodyAlert}
                                        setBodyAlert={setBodyAlert}
                                        setTypeAlert={setTypeAlert}
                                        setOpenAlert={setOpenAlert}                               
                                        />
                                    </CSSTransition>
                                    :
                                        <></>
                                )
                            
                            }
                            </TransitionGroup>
                        
                        </Box> 
                        
                        <Box display="flex" flexDirection="column" gap={1} p={1}
                            sx={{
                                boxShadow: '4px 4px 8px 4px rgba(34, 60, 80, 0.2)', 
                                border: 'none', borderRadius: '10px', minWidth: 300, maxHeight: 700,
                                justifyContent:'start'
                            }}
                        >
                            <Typography sx={{ fontSize: "18px", fontWeight: 600}} variant="h6" component="div">
                                Заявки на регистрацию
                            </Typography>
                            <TransitionGroup>
                            {
                                personalData.map(data => 
                                    data.status.split('-')[0] === 'Запрос'
                                    ?
                                    <CSSTransition key={data.key} timeout={500} classNames="item"> 
                                        <User login={data.login} 
                                        name={data.name} 
                                        surname={data.surname} 
                                        patronymic={data.patronymic} 
                                        userType={"giveMeRoots"}
                                        avatar={data.avatar}
                                        accessUser={accessUser}
                                        denyUser={denyUser} 
                                        setBodyAlert={setBodyAlert}
                                        setTypeAlert={setTypeAlert}
                                        setOpenAlert={setOpenAlert}    
                                        />
                                    </CSSTransition>
                                    :
                                        <></>
                                )
                            }
                            </TransitionGroup>
                        </Box>   

                        <Box display="flex" flexDirection="column" gap={1} p={1}
                            sx={{
                                boxShadow: '4px 4px 8px 4px rgba(34, 60, 80, 0.2)', 
                                border: 'none', borderRadius: '10px', minWidth: 300, maxHeight: 700,
                                justifyContent:'start'
                            }}
                        >
                            <Typography sx={{ fontSize: "18px", fontWeight: 600}} variant="h6" component="div">
                                Заблокированные пользователи
                            </Typography>
                            <TransitionGroup>
                            {
                                personalData.map(data => 
                                    data.status === 'Блокировка'
                                    ?
                                    <CSSTransition key={data.key} timeout={500} classNames="item"> 
                                        <User login={data.login} 
                                        name={data.name} 
                                        surname={data.surname} 
                                        patronymic={data.patronymic} 
                                        userType={"Blocked"}
                                        avatar={data.avatar}
                                        setBodyAlert={setBodyAlert}
                                        setTypeAlert={setTypeAlert}
                                        setOpenAlert={setOpenAlert}    
                                        />
                                    </CSSTransition>
                                    :
                                        <></>
                                )
                            }
                            </TransitionGroup>
                        </Box>     
                    </div>
                </>
            :
            <>
                <Box display="flex" alignItems="center" justifyContent="start" sx={{  
                    height: "100px", }}>
                    <AlertMessage body={bodyAlert} openAlert={openAlert} setOpenAlert={setOpenAlert} type={typeAlert}/>
                </Box>
                <div className={cl.main_container_2}>
                    <Box display="flex" flexDirection="column" justifyContent="center"
                        sx={{ border: "3px solid #68a4cc", borderRadius: 10, padding: '50px'}}>          
                        <img
                        alt="not found"
                        width={"500px"}
                        src={require("./undraw_Profile_re_4a55.png")}
                        />
                        <Typography sx={{ color: "#68a4cc", fontSize: "30px", fontWeight: 600}} variant="h6" component="div">
                            Личный кабинет
                        </Typography>

                    </Box>
                    <Card sx={{ maxWidth: 470, maxHeight: 700}}>
                        <CardMedia
                            component="img"
                            height="345px"
                            image={currentUser.avatar}
                            alt="avatar"
                        />
                        <CardContent>
                            <Box gap={3} my={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Typography sx={{ fontSize: "20px", fontWeight: 600}} variant="h6" component="div"  >
                                    Статус:
                                </Typography>
                                <Typography sx={{ fontSize: "20px"}} variant="h5" component="div"  >
                                    {currentUser.status}
                                </Typography>
                                {
                                    currentUser.status === 'Администратор'
                                    ?
                                        <CheckCircleIcon sx={{ position: 'relative', right:'10px', color: 'green'}}/>
                                    :
                                        <></>
                                }
                            </Box>
                            <Box gap={3} my={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Typography sx={{ fontSize: "20px", fontWeight: 600}} variant="h6" component="div"  >
                                    Фамилия:
                                </Typography>
                                <Typography sx={{ fontSize: "20px"}} variant="h5" component="div"  >
                                    {currentUser.surname}
                                </Typography>
                            </Box>
                            <Box gap={3} my={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Typography sx={{ fontSize: "20px", fontWeight: 600}} variant="h6" component="div"  >
                                    Имя:
                                </Typography>
                                <Typography sx={{ fontSize: "20px"}} variant="h5" component="div"  >
                                    {currentUser.name}
                                </Typography>
                            </Box>
                            <Box gap={3} my={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Typography sx={{ fontSize: "20px", fontWeight: 600}} variant="h6" component="div"  >
                                    Отчество:
                                </Typography>
                                <Typography sx={{ fontSize: "20px"}} variant="h5" component="div"  >
                                    {currentUser.patronymic}
                                </Typography>
                            </Box>
                            <Box gap={3} my={1} sx={{ display:'flex', flexDirection:'row', alignItems:'center'}}>
                                <Typography sx={{ fontSize: "20px", fontWeight: 600}} variant="h6" component="div"  >
                                    Почта:
                                </Typography>
                                <Typography sx={{ fontSize: "20px"}} variant="h5" component="div"  >
                                    {currentUser.login}
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardActions sx={{ display:'flex', justifyContent:'space-evenly'}}>
                            <Button onChange={ e =>  
                                // e.preventDefault(); 
                                updateAvatar(e.target.files[0]) 
                            } component="label" 
                                size="small" variant="outlined" color="primary" 
                                sx={{ textTransform: 'none'}}
                            >
                                Сменить фото 
                                <VisuallyHiddenInput type="file" />
                            </Button>
                            <Link to="/login">
                                <Button size="small" onClick={() => exitFromAccount()} variant="outlined" color="primary" sx={{ textTransform: 'none'}}>
                                    Выйти из аккаунта
                                </Button>
                            </Link>
                            {
                                currentUser.status === 'Выпускник'
                                ?
                                    <Link to="/login">
                                        <Button size="small" onClick={() => deleteAccount(currentUser.id)} variant="outlined" color="error" sx={{ textTransform: 'none'}}>
                                            Удалить аккаунт
                                        </Button>
                                    </Link>
                                :
                                    <></>
                            }
                        </CardActions>
                    </Card>
                    {/* <Box>          
                        <img
                        alt="not found"
                        width={"500px"}
                        src={require("./undraw_Pic_profile_re_7g2h.png")}
                        />
                    </Box> */}
                </div>
        </>
                    }
    </>
    );
  }
  export default PA;