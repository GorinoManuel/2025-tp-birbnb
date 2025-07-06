import { useContext } from "react"
import { Carousel } from "./Carousel/Carousel"
import { AlojamientosContext } from "../../context/alojamientoProvider"

import { ErrorCargaInicial } from "../../components/errores/ErrorCargaInicial"

export const Home = () => {
    const {errorAlojamientos} = useContext(AlojamientosContext)

    if(errorAlojamientos) {
        console.log(errorAlojamientos)
        return <ErrorCargaInicial nombreError={'Servidor  desconectado'} mensajeDeError={errorAlojamientos} />
    }

    return(
        <>
            <Carousel subtitulo={"Alojamientos Populares"}></Carousel>           
        </>
    )

}