import { useContext } from "react"
import { Carousel } from "./Carousel/Carousel"
import { AlojamientosContext } from "../../context/alojamientoProvider"

import { ErrorCargaInicial } from "../../components/errores/ErrorCargaInicial"
import { useState } from "react"
export const Home = () => {
    const {errorAlojamientos, cargaInicial} = useContext(AlojamientosContext)
    const [open, setOpen] = useState(true)
        
    const alCerrar = () => {
                setOpen(false)
    }

    

    if(errorAlojamientos) {
        return <ErrorCargaInicial nombreError={'Servidor  desconectado'} mensajeDeError={errorAlojamientos} open={open} alCerrar={alCerrar} intentarRecargar={cargaInicial}/>
    }

    return(
        <>
            <Carousel subtitulo={"Alojamientos Populares"}></Carousel>           
        </>
    )

}