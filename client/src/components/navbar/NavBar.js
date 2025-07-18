import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Button from '@mui/material/Button';
import './NavBar.css'
import { useNavigate } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuComun } from '../menuComun/MenuComun';

const pages = ['Alojamientos', 'Reservas'];

const anchoPantalla = window.innerWidth

export default function NavBar() {
  const navigate = useNavigate();

  return (
      <AppBar position="static">
        <Toolbar className="toolbar" >
          <div className="logo" onClick={()=>navigate(`/`)} >
            <img src={process.env.PUBLIC_URL + '/birbnb_logo.png'} id="logo" alt="" />
            <h4 className='logo-text'>
              <span>ir</span>bnb
            </h4>
          </div>
          <div  className="appbar-buttons" >
            {
            
            anchoPantalla > 600 ?
            
            pages.map((page) => (
              <Button key={page} id="button" onClick={()=>navigate(`/${page.toLowerCase()}`)}>
                {page}
              </Button>
            )) : 
            <>
              <MenuComun contenidoBoton={() => <MenuIcon/>} claseMenu={"menu-navbar"} claseBoton={"boton-menu-navbar"}>
                {pages.map((page) => (
                <Button key={page} id="button" onClick={()=>navigate(`/${page.toLowerCase()}`)}>
                  {page}
                </Button>
                ))}
              </MenuComun>
              
            </>
          }
          </div>
          <div className="appbar-icons" >
            <IconButton size="large" aria-label="home" color="black" id="appbar-icon" >
              <HomeOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="black"
              id="appbar-icon"
            >
              <Badge badgeContent={1}  color='error' className='icono-notificacion'>
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="black"
              id="appbar-icon"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
  );
}