import { useContext } from 'react';
import { AlojamientosContext } from '../../context/alojamientoProvider';
import "./AlojamientoDetail.css"
import { Button, FormControl, Input, InputLabel, TextField} from '@mui/material';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'react-router';
import LinearProgress from '@mui/material/LinearProgress';
import { ChipBoxCaracteristicas } from '../../components/chipBoxCaracteristicas/ChipBoxCaracteristicas';
import { huespedID } from '../../mockData/user';
import { hacerReserva } from '../../api/reservasAPI';

 const fechaFinal = () => {
        var fecha = new Date()
        fecha.setDate(fecha.getDate() + 5)
        return fecha.toISOString().split('T')[0]
    }

const inicializarCampos = () => {
    return { fechaInicio: {valor: new Date().toISOString().split('T')[0]}, fechaFinal: {valor: fechaFinal()}, cantHuespedes: {valor: 1}}
}

const Formulario = ()=> {
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


    return <form onSubmit={(e) => e.preventDefault()}>
                <FormControl className='separador-inputs'>
                    <InputLabel htmlFor='cant-huespedes'>Cantidad de Huespedes</InputLabel>
                    <Input type='number' aria-label='Cantidad de huespedes' id='cant-huespedes' name='Cantidad de huespedes' required
                    value={valorDe('cantHuespedes')} onChange={setValorDe('cantHuespedes')} inputProps={({'min':'1'})}/>
                </FormControl>
                <FormControl className='separador-inputs'>
                    <TextField type='date' label='Fecha de Inicio'  aria-label='Fecha de Inicio' id='fecha-inicio' name='fecha-inicio' required 
                    value={valorDe('fechaInicio')} onChange={setValorDe('fechaInicio')}/>
                </FormControl>
                <FormControl className='separador-inputs'>
                    <TextField type='date' label='Fecha de Finalización' defaultValue={fechaFinal()} aria-label='Fecha de Finalizacion' id='fecha-fin' name='fecha-fin' required
                    alue={valorDe('fechaFinal')} onChange={setValorDe('fechaFinal')}/>
                </FormControl>
                    <Button variant='contained' className='boton-reservar'>Reservar</Button>
            </form>
} 


const AlojamientoDetailLoaded = ({alojamientoDetallado, fillFotos}) => {
    
    const [showedFoto, setShowed] = useState(fillFotos(alojamientoDetallado))
    const [errorReserva, setErrorReserva] = useState(undefined)
    const handleLeft = () => {
        setShowed(prev => {
            const nuevoIndice = prev.indice === 0 ? prev.indice : prev.indice - 1
            return { ...prev, indice: nuevoIndice};
        });
    }
    const crearReserva = async (datosReserva) => {
        try {
           datosReserva.huespedReservador = huespedID
           const reservaNueva = await hacerReserva(datosReserva)

        }catch (error) {
            setErrorReserva(error)

        }
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
                    <p>Precio por noche: {alojamientoDetallado.precioPorNoche} {alojamientoDetallado.moneda}</p>
                    <p>Horario de Check In: {alojamientoDetallado.horarioCheckIn}</p>
                    <p>Horario de Check Out: {alojamientoDetallado.horarioCheckOut}</p>
                    <p>Hasta {alojamientoDetallado.cantHuespedesMax} huesped/es</p>
                </div>
                <div className="buying-section">
                    <Formulario/>
                </div>
            </div>
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