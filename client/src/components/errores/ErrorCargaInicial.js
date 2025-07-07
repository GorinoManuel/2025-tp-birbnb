import { Button, Dialog } from "@mui/material"
import "./ErrorCargaInicial.css"
import ReplayIcon from '@mui/icons-material/Replay';

export const ErrorCargaInicial = ({nombreError, mensajeDeError, open, alCerrar, intentarRecargar}) => {

    return <Dialog className="error-inicial" fullScreen open={open} onClose={alCerrar} >
            <img src={process.env.PUBLIC_URL + '/servidor_caido.svg'} alt="Imagen de se cayó el servidor" className="imagen-desconexion" />
            <h3 className="titulo-error-inicial" >Oh, se produjo un error!</h3>
            <p className="mensaje-error-inicial">{nombreError}: {mensajeDeError}</p>
            <Button onClick={intentarRecargar} title="Reintentar carga inicial" className="boton-reintentar">
                <ReplayIcon/><span>Reintentar</span> 
            </Button>
    </Dialog>
}