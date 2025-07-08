import { useState } from "react";
import { Button, Menu } from "@mui/material";

export const MenuComun = ({children, contenidoBoton, claseMenu, claseBoton}) => {
     const [anchorEl, setAnchorEl] = useState(null)
      const open = Boolean(anchorEl)
      const handleClose = () => {
            setAnchorEl(null)
       }
    const clikearBoton = (elementoSeleccionado) => {
        setAnchorEl(elementoSeleccionado)
    } 
    return <>
        <Button key='abrir-menu-header' 
             aria-controls={open ? 'menu-navbar' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            onClick={(e) => clikearBoton(e.currentTarget)} 
            className={claseBoton}
            >
              {contenidoBoton()}
            </Button>
              <Menu
                  open={open}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  id='menu-navbar'
                  className={claseMenu}
                  >
                {children}
            </Menu>
    </>
}