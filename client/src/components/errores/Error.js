import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import "./Error.css"

export const Error = ({nombreError, mensajeDeError, open, alCerrar}) => {
    return <div>
        <Dialog  aria-labelledby="titulo-error"  aria-describedby="mensaje-error" open={open} onClose={alCerrar} className='dialogo-error' fullWidth={true} >
            <DialogTitle id="titulo-error">Oh, se produjo un error!</DialogTitle>
            <DialogContent>
                 <p id="mensaje-error">{nombreError}: {mensajeDeError}</p>
            </DialogContent>
        </Dialog>
    </div>
}