import { BarraDeBusqueda } from "../../components/barraDeBusqueda/BarraDeBusqueda"
import "./Alojamientos.css"
import { getAlojamientosFiltrados } from "../../api/alojamientosAPI"
import { Carousel } from "../home/Carousel/Carousel"
import { useContext } from "react"
import { AlojamientosContext } from "../../context/alojamientoProvider"
import { useState } from "react"
import {Pagination, Input} from "@mui/material"
import { Error } from "../../components/errores/Error"



export const Alojamientos = () => {
    const {setAlojamientos, alojamientos} = useContext(AlojamientosContext); 
    const [errorPropio, setErrorPropio] = useState(undefined)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10)
    const [limit, setLimit] = useState(10);
    const [open, setOpen] = useState(true)
    
        const alCerrar = () => {
            setOpen(false)
        }

    const handleChange = (event, value) => {
    setPage(value);
  };


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
            setTotalPages(datosObtenidos.total)
            setErrorPropio(undefined) 
        } catch(error) {
            mostrarError(error)
            setErrorPropio(error)
            setOpen(true)
        }
    }

    const mapearError = (error) => {
        if(!error.response){
            return "Servidor Desconectado"
        }
        return `Error ${error.response}`
    }

    const gestionarBusquedaAlojamientos = () => {
        if(errorPropio) {
            return <Error nombreError={mapearError(errorPropio)} mensajeDeError={errorPropio.message} open={open} alCerrar={alCerrar} />
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
                <Input  type="number" inputProps={({ 'min': '0', 'step': '10'})} name="limiteDeElementos" value={limit} />
                <Pagination count={totalPages} variant="outlined" page={page} siblingCount={1} onChange={handleChange}/>
            </div>
        </section>
    )
}