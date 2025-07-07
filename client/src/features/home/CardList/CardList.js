import { Card, Button} from '@mui/material'
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import {useNavigate} from "react-router";
import './CardList.css'
import PublicIcon from '@mui/icons-material/Public';
import { ChipBoxCaracteristicas } from '../../../components/chipBoxCaracteristicas/ChipBoxCaracteristicas';

const BirbnbCard = ({alojamiento}) => {

    const navigate = useNavigate();


    const alVerMas = (alojamiento) => {
        navigate(`/alojamientos/${alojamiento.id}`);
    }

    return(
        <Card className= 'cardAlojamiento' color="primary" variant='outlined' sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }} onClick={() => alVerMas(alojamiento)} >
            <div className="cardHeader">
                <section>
                    <h3 className="nombre">{alojamiento.nombre}</h3> 
                    <p className="anfitrion">Anfitrión: {alojamiento.anfitrion}</p>
                </section>
            </div>
            <CardOverflow sx={{width: '100%'}}>
                <AspectRatio sx={{ minWidth: 200, width:'100%'}}>
                <img className="imagenAlojamiento"
                    src={ alojamiento.fotos[0].path}
                    srcSet=""
                    loading="lazy"
                    alt={alojamiento.fotos[0].descripcion}
                />
                </AspectRatio>
            </CardOverflow>
            <div className="cardDescripcion">
                <div className="cardText"> 
                    <div className="ubicacion">
                        <p><PublicIcon className='icono-mundo-card'/>{alojamiento.direccion.ciudad}, {alojamiento.direccion.pais}</p>    
                    </div>
                    <div className="detalles">
                        <p>Hasta {alojamiento.cantHuespedesMax} personas</p>
                        <p>${alojamiento.precioPorNoche} por noche</p>
                        <ChipBoxCaracteristicas caracteristicas={alojamiento.caracteristicas} />
                    </div>
                </div>
                <div className="cardButton">   
                    <CardOverflow>
                        <Button variant="contained" color="primary" size="md" onClick={() => alVerMas(alojamiento)}>
                            ver mas +
                        </Button>
                    </CardOverflow>
                </div>
            </div>
        </Card>
    )
}

export const CardList = ({alojamientos}) => {

    return(
        <div className="cardlist">{
            alojamientos.map((alojamiento) => 
                <BirbnbCard alojamiento={alojamiento} key={alojamiento.idFront}>
                </BirbnbCard>
            )}
        </div>
    )
}