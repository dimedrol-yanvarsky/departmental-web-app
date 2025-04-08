import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Logo from "../UI/Logo/Logo";
import LinkToPA from "../UI/LinkToPA/LinkToPA";
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import TranslateIcon from '@mui/icons-material/Translate';
import NavDropdown from "./NavDropdown";
import { Flex } from 'antd';
import { Link } from "react-router-dom";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';


const items = [
  {
    key: "1",
    label: (
      <Link
        to="/feedbacks"
      >
        Отзывы выпускников
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link
        to="/meetings"
      >
        Встречи выпускников
      </Link>
    ),
  },
];

const pages = [
  {key: "1", name: "Вопрос-ответ", icon: <QuestionAnswerIcon/>, path: "/questions" },
  {key: "2", name: "Фотогалерея", icon: <InsertPhotoIcon/>, path: "/gallery" }, 
  {key: "3", name: "Сменить язык", icon: <TranslateIcon/> },
  {key: "4", name: "Слабовидящим", icon: <VisibilityIcon/> },
];

const pages_en = [
  {key: "1", name: "Question-answer", icon: <QuestionAnswerIcon/>, path: "/questions" },
  {key: "2", name: "Photogallery", icon: <InsertPhotoIcon/>, path: "/gallery" }, 
  {key: "3", name: "Change language", icon: <TranslateIcon/> },
  {key: "4", name: "Vision-impaired", icon: <VisibilityIcon/> },
];


function Navbar({inter, setInter, size, blind, setBlind, avatar, isAuth}) {
  return (
    <AppBar position="static" color="transparent" sx={{  display: "flex", justifyContent: "space-between", flexDirection: "row", paddingLeft: "24px", paddingRight: "24px" }}>
      <Logo />
        <Box sx={{display: "flex", alignItems: "center" }}>
          <Flex gap="large">
            {
              inter === false?
                <NavDropdown size={size} items={items} body={"Выпускникам"} />
              :
                <NavDropdown size={size} items={items} body={"Graduates"} />
            } 

            {
              inter === false
              ?
                <>
                  {pages.map((page) => (
                    page.name === "Фотогалерея" || page.name === "Вопрос-ответ"
                    ?
                      <Button sx={{textTransform: "none", border: "none"}} color="inherit" variant="outlined" endIcon={page.icon} onClick={ () => console.log(111)}>
                        <Link style={{ fontSize: size.link, color: '#000'}} to={page.path}>
                          {page.name}
                        </Link>
                      </Button>
                    :
                      <>
                      </>
                  ))}
                      <Button onClick={ () => setInter(!inter)} sx={{ fontSize: size.link, textTransform: "none", border: "none"}} color="inherit" variant="outlined" endIcon={pages[2].icon}>
                          {pages[2].name}
                        </Button>
                        <Button onClick={ () => setBlind(!blind)} sx={{ fontSize: size.link, textTransform: "none", border: "none"}} color="inherit" variant="outlined" endIcon={pages[3].icon}>
                          {pages[3].name}
                        </Button>
                </>
              :
                <>
                  {pages_en.map((page) => (
                    page.name === "Photogallery" || page.name === "Question-answer"
                    ?
                      <Button sx={{textTransform: "none", border: "none"}} color="inherit" variant="outlined" endIcon={page.icon} onClick={ () => console.log(111)}>
                        <Link style={{ fontSize: size.link, color: '#000'}} to={page.path}>
                          {page.name}
                        </Link>
                      </Button>
                    :
                      <>
                      </>
                  ))}
                   <Button onClick={ () => setInter(!inter)} sx={{ fontSize: size.link, textTransform: "none", border: "none"}} color="inherit" variant="outlined" endIcon={pages_en[2].icon}>
                      {pages_en[2].name}
                    </Button>
                    <Button onClick={ () => setBlind(!blind)} sx={{ fontSize: size.link, textTransform: "none", border: "none"}} color="inherit" variant="outlined" endIcon={pages_en[3].icon}>
                    {pages_en[3].name}
                  </Button>
                    
                </>  
            }
            
            <LinkToPA size={size} avatar={avatar} isAuth={isAuth} />
          </Flex> 
        </Box>
    </AppBar>
  );
}
export default Navbar;
