import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DangerousIcon from '@mui/icons-material/Dangerous';
import "./Error.css"

export const Error = ({nombreError, mensajeDeError, open, alCerrar}) => {
    return <div>
        <Dialog  aria-labelledby="titulo-error"  aria-describedby="mensaje-error" open={open} onClose={alCerrar} className='dialogo-error' fullWidth={true} >
            <DialogTitle id="titulo-error"><DangerousIcon className='icono-error'/>Oh, se produjo un error!</DialogTitle>
            <DialogContent>
                 <p id="mensaje-error">{nombreError}: </p>
                 <p id="mensaje-error">{mensajeDeError}</p>
                 
            </DialogContent>
        </Dialog>
    </div>
}