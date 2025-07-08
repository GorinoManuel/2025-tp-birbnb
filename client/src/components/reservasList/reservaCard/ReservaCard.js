import { Card, CardContent } from "@mui/material"
import './ReservaCard.css'
import { useState } from "react"

export const ReservaCard = ({reserva}) => {

    const [estado, setEstado] = useState(reserva.estado)

    return <div class={'reserva ' + (estado === 'CANCELADA' ? 'reserva-cancelada' : 'reserva-default')}>
        <Card>
            <CardContent>
                <p><strong>Alojamiento:</strong> {reserva.alojamiento}</p>
                <p><strong>Huésped reservador:</strong> {reserva.huespedReservador}</p>
                <p><strong>Cantidad de huéspedes:</strong> {reserva.cantHuespedes}</p>
                <p><strong>Estado:</strong> {estado}</p>
                <p><strong>Fecha de inicio:</strong> {new Date(reserva.fechaInicio).toLocaleDateString()}</p>
                <p><strong>Fecha de fin:</strong> {new Date(reserva.fechaFin).toLocaleDateString()}</p>
                <p><strong>Precio por noche:</strong> ${reserva.precioPorNoche}</p>
            </CardContent>
        </Card>
    </div>
}