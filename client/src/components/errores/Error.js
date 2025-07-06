import Modal from '@mui/material/Modal';
import { useState } from "react"


export const Error = ({nombreError, mensajeDeError}) => {
    const [open, setOpen] = useState(false)

    const alCerrar = () => {
        setOpen(false)
    }

    return <div>
        <Modal  aria-labelledby="titulo-error"  aria-describedby="" open={open} onClose={alCerrar}>
            <h5 id="titulo-error" >Oh, se produjo un error!</h5>
            <p id="mensaje-error" >{nombreError}: {mensajeDeError}</p>
        </Modal>
    </div>
}