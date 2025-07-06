import { BarraDeBusqueda } from "../../components/barraDeBusqueda/BarraDeBusqueda"
import "./Alojamientos.css"
import { getAlojamientosFiltrados } from "../../api/alojamientosAPI"
import { Carousel } from "../home/Carousel/Carousel"
import { useContext } from "react"
import { AlojamientosContext } from "../../context/alojamientoProvider"
import { useState } from "react"
import {Pagination, Input} from "@mui/material"
import { Error } from "../../components/errores/Error"


const mapperErroresAlojamiento = (codigo_de_estado) => {

}

export const Alojamientos = () => {
    const {setAlojamientos, alojamientos, errorAlojamientos, setErrorAlojamientos} = useContext(AlojamientosContext); 
    const [errorPropio, setErrorPropio] = useState(undefined)
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);





    const mostrarError = (mensajeError) => {
        console.error(mensajeError)
    }
    const alBuscarAlojamientos = async (queryParams) => {
        try {
            const datosObtenidos = await getAlojamientosFiltrados(queryParams)
            console.log(datosObtenidos)
            setAlojamientos( datosObtenidos.alojamientos )
            setLimit(datosObtenidos.limite)
            setPage(datosObtenidos.pagina) 
        } catch(error) {
            mostrarError(error.message)
            setErrorPropio(error.message)
        }
    }

    const gestionarBusquedaAlojamientos = () => {
        console.log("Hay errores : " + errorAlojamientos)
        if(errorPropio) {
            console.log("Porqué entra? : " + errorPropio)
            return <h5>Hay error</h5> // <Error nombreError={'Algun nombre'} mensajeDeError={errorPropio} />
        }
        return alojamientos.length  !== 0 ? <Carousel subtitulo={"Tus Alojamientos Recomendados"}></Carousel> : <h3 className="sin-alojamientos">No se encontraron los alojamientos filtrados</h3> 
    }

    return(
        <section>
            <header className="cabecera-alojamientos">
                <BarraDeBusqueda alBuscarAlojamientos={alBuscarAlojamientos}/>
            </header>
             {gestionarBusquedaAlojamientos()} 
            <div className="paginacion">
                <Input  type="number" inputProps={({ 'min': '0', 'step': '10'})} name="limiteDeElementos" />
                <Pagination count={10} variant="outlined" />
            </div>
        </section>
    )
}