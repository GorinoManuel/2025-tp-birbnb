import { useContext } from 'react';
import { AlojamientosContext } from '../../context/alojamientoProvider';
import "./AlojamientoDetail.css"
import { Button, FormControl, Input, InputLabel, TextField} from '@mui/material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router';
import LinearProgress from '@mui/material/LinearProgress';
import { ChipBoxCaracteristicas } from '../../components/chipBoxCaracteristicas/ChipBoxCaracteristicas';
import { huespedID } from '../../mockData/user';
import { hacerReserva } from '../../api/reservasAPI';
import { Error } from '../../components/errores/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

 const fechaFinal = () => {
        var fecha = new Date()
        fecha.setDate(fecha.getDate() + 5)
        return fecha.toISOString().split('T')[0]
    }

const inicializarCampos = () => {
    return { fechaInicio: {valor: new Date().toISOString().split('T')[0]}, fechaFinal: {valor: fechaFinal()}, cantHuespedes: {valor: 1}}
}

const Formulario = ({crearReserva, maxHuespedes})=> {
    const [campos, setCampos] = useState(inicializarCampos())
    
    const valorDe = (nombreCampo) => campos[nombreCampo].valor

  const setValorDe = (nombreCampo) => (e) => {
    const nuevoValor = e.target.value
    setCampos({
      ...campos,
      [nombreCampo]: {
        ...campos[nombreCampo],
        valor: nuevoValor
      }
    })
  }
  const revisarValores = () => {
    const fechaInicioArevisar = new Date(campos.fechaInicio.valor)
    const fechaFinalARevisar = new Date(campos.fechaFinal.valor)
    
    if(fechaInicioArevisar < fechaFinalARevisar  && esMayorOIgualAFechaActual(fechaInicioArevisar)) {
        crearReserva({fechaInicio: campos.fechaInicio.valor, fechaFin: campos.fechaFinal.valor, cantHuespedes: campos.cantHuespedes.valor})
    } else {

    }
  }

  const esMayorOIgualAFechaActual = (fechaInicioArevisar) => {
        const fechaActual = new Date()
        return fechaActual.getFullYear() <= fechaInicioArevisar.getFullYear() 
                || (fechaActual.getFullYear() === fechaInicioArevisar.getFullYear() && 
                fechaActual.getMonth() <= fechaInicioArevisar.getMonth()) || 
                (fechaActual.getFullYear() === fechaInicioArevisar.getFullYear() && 
                fechaActual.getMonth() === fechaInicioArevisar.getMonth() && fechaActual.getDay <= fechaInicioArevisar.getDay())
  }

    return <form onSubmit={(e) => e.preventDefault()}>
                <FormControl className='separador-inputs'>
                    <InputLabel htmlFor='cant-huespedes'>Cantidad de Huespedes</InputLabel>
                    <Input type='number' aria-label='Cantidad de huespedes' id='cant-huespedes' name='Cantidad de huespedes' required
                    value={valorDe('cantHuespedes')} onChange={setValorDe('cantHuespedes')} inputProps={({'min':'1', 'max': `${maxHuespedes}`})}/>
                </FormControl>
                <FormControl className='separador-inputs'>
                    <TextField type='date' label='Fecha de Inicio'  aria-label='Fecha de Inicio' id='fecha-inicio' name='fecha-inicio' required 
                    value={valorDe('fechaInicio')} onChange={setValorDe('fechaInicio')} className='text-field-input'/>
                </FormControl>
                <FormControl className='separador-inputs'>
                    <TextField type='date' label='Fecha de Finalización' defaultValue={fechaFinal()} aria-label='Fecha de Finalizacion' id='fecha-fin' name='fecha-fin' required
                    alue={valorDe('fechaFinal')} onChange={setValorDe('fechaFinal')} className='text-field-input'/>
                </FormControl>
                    <Button variant='contained' className='boton-reservar' onClick={revisarValores}>Reservar</Button>
            </form>
} 


const AlojamientoDetailLoaded = ({alojamientoDetallado, fillFotos}) => {
    
    const [showedFoto, setShowed] = useState(fillFotos(alojamientoDetallado))
    const [errorReserva, setErrorReserva] = useState(undefined)
    const [reserva, setReserva] = useState(undefined)
    const [open, setOpen] = useState(true)
    
        const alCerrar = () => {
            setOpen(false)
            setErrorReserva(undefined)
            setReserva(undefined)
        }
    const handleLeft = () => {
        setShowed(prev => {
            const nuevoIndice = prev.indice === 0 ? prev.indice : prev.indice - 1
            return { ...prev, indice: nuevoIndice};
        });
    }
    const crearReserva = async (datosReserva) => {
        try {
           datosReserva.huespedReservador = huespedID
           datosReserva.alojamiento = alojamientoDetallado.id
           console.log(datosReserva)
           const reservaNueva = await hacerReserva(datosReserva)
           setReserva(reservaNueva)
        }catch (error) {
            setErrorReserva(error)
            console.error(error)
        }
        setOpen(true)
    }
    
    const handleRight = () => {
        setShowed(prev => {
            const nuevoIndice = prev.indice === alojamientoDetallado.fotos.length - 1 ? prev.indice : prev.indice + 1
            return { ...prev, indice: nuevoIndice};
        });
    }

    
    
    return(
        <>
        <div className="body">
            <div className="image">
                <div className="leftButton" title='boton imagen anterior'>
                    <Button onClick={() => handleLeft()}>
                        <ArrowBackIosIcon></ArrowBackIosIcon>
                    </Button>
                </div>
                    <img src={showedFoto.fotos[showedFoto.indice].path} alt={`Alojamiento con ${alojamientoDetallado.id} y nombre ${alojamientoDetallado.nombre}`}></img>
                <div className="rightButton" title='boton imagen posterior'>
                    <Button onClick={() => handleRight()}>
                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                    </Button>
                </div>
            </div>
            <div className="image-footer">
                <div className="description">
                    <ChipBoxCaracteristicas caracteristicas={alojamientoDetallado.caracteristicas}/>
                    <h1>{alojamientoDetallado.nombre}</h1>
                    <p>{alojamientoDetallado.descripcion}</p>
                    <p>Dirección: {alojamientoDetallado.direccion.calle} {alojamientoDetallado.direccion.altura}, {alojamientoDetallado.direccion.ciudad}, {alojamientoDetallado.direccion.pais}</p>
                    <p>Precio por noche: ${alojamientoDetallado.precioPorNoche} </p>
                    <p>Horario de Check In: {alojamientoDetallado.horarioCheckIn}</p>
                    <p>Horario de Check Out: {alojamientoDetallado.horarioCheckOut}</p>
                    <p>Hasta {alojamientoDetallado.cantHuespedesMax} huesped/es</p>
                </div>
                <div className="buying-section">
                    <Formulario maxHuespedes={alojamientoDetallado.cantHuespedesMax} crearReserva={crearReserva}/>
                </div>
            </div>
            {reserva ? <Dialog  aria-labelledby="titulo-reserva-concretada"  aria-describedby="mensaje-reserva-concretada" open={open} onClose={alCerrar} className='dialogo-reserva-concretada' fullWidth={true} >
            <DialogTitle id="titulo-reserva-concretada">Se ha concretado su reserva!<CheckCircleIcon className='icono-check'/></DialogTitle>
            <DialogContent>
                 <p id="mensaje-reserva-concretada">Reserva: {reserva.id}</p>
                 <p id="mensaje-reserva-concretada">Huesped Reservador: {reserva.huespedReservador}</p>
                 <p id="mensaje-reserva-concretada">Cantidad de huespedes: {reserva.cantHuespedes}</p>
                 <p id="mensaje-reserva-concretada">Alojamiento: {reserva.alojamiento}</p>
                 <p id="mensaje-reserva-concretada">Fecha de Inicio: {reserva.fechaInicio}</p>
                 <p id="mensaje-reserva-concretada">Fecha de Finalizacion: {reserva.fechaFin}</p>
                 <p id="mensaje-reserva-concretada">Precio Por Noche: {reserva.precioPorNoche}</p>
                 <p id="mensaje-reserva-concretada">Estado: {reserva.estado}</p>
            </DialogContent>
        </Dialog> : (errorReserva ? <Error open={open} alCerrar={alCerrar} mensajeDeError={errorReserva.response.data ? errorReserva.response.data.error : "Servidor Desconectado" } nombreError={'El error es'}/> : <></>)}
        </div>
        </>  
    )
}


export const AlojamientoDetail = () => {
    
    const {id} = useParams();
    const {findAlojamientoById} = useContext(AlojamientosContext)

    const fillFotos = (alojamientoDetalle) => {
        return alojamientoDetalle.fotos.path === "" ? mockFotos() : {fotos: alojamientoDetalle.fotos, indice: 0}
    }

    const mockFotos = () => {
        return {
            fotos: [{
                path: ""
            }],
            indice: 0
        }
    }

    return(
        <>
            {findAlojamientoById(id) 
            ? <AlojamientoDetailLoaded alojamientoDetallado={findAlojamientoById(id)} fillFotos={fillFotos} key={id} ></AlojamientoDetailLoaded> 
            : <LinearProgress color="secondary" />}
        </>
    )
}