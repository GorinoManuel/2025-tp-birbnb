import { ReservaCard } from './reservaCard/ReservaCard'
import './ReservasList.css'

export const ReservasList = ({reservas}) => {
    return <div class="reservas-list">
        {reservas.map(reserva => {
            return (<ReservaCard reserva={reserva}></ReservaCard>)
        })}
    </div>
}