import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Homepage() {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center"
        sx={{ marginLeft: '20%', marginRight: '20%'}}
      >
        <Box display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between"
              sx={{ border: "none", borderRadius: 10, padding: '50px'}}>          
              <img
              alt="not found"
              width={"300px"}
              src={require("./undraw_Businessman_re_mlee.png")}
              />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
              sx={{ border: "none", borderRadius: 10, padding: '50px'}}>          
            <Typography sx={{ color: "black", fontSize: "30px", fontWeight: 500}} variant="h6" component="div">
              Добро пожаловать на сайт кафедры "Компьютерные системы и сети"!
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
              sx={{ border: "none", borderRadius: 10, padding: '50px'}}>          
            <Typography sx={{ color: "black", fontSize: "28px", fontWeight: 500}} variant="h6" component="div">
              Каждый из наших выпускников находит работу и получает в среднем 120000 рублей
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between"
              sx={{ border: "none", borderRadius: 10, padding: '50px'}}>          
              <img
              alt="not found"
              width={"300px"}
              src={require("./undraw_Freelancer_re_irh4.png")}
              />
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between"
              sx={{ border: "none", borderRadius: 10, padding: '50px'}}>          
              <img
              alt="not found"
              width={"300px"}
              src={require("./undraw_Educator_re_ju47.png")}
              />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
              sx={{ border: "none", borderRadius: 10, padding: '50px'}}>          
            <Typography sx={{ color: "black", fontSize: "30px", fontWeight: 500}} variant="h6" component="div">
              Учебные планы можно скачать по <Link sx={{ color: '#68a4cc' }} href="#">ссылке</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
  export default Homepage;