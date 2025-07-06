import { Dialog, DialogTitle } from '@mui/material';


export const Error = ({nombreError, mensajeDeError, open, alCerrar}) => {
    return <div>
        <Dialog  aria-labelledby="titulo-error"  aria-describedby="" open={open} onClose={alCerrar} className='dialogo-error'>
            <h5 id="titulo-error">Oh, se produjo un error!</h5>
            <p id="mensaje-error">{nombreError}: {mensajeDeError}</p>
        </Dialog>
    </div>
}