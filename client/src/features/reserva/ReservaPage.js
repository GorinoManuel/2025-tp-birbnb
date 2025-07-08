import { useContext } from "react";
import { ReservasContext } from "../../context/reservaProvider";
import { LinearProgress } from "@mui/material";
import { ReservasList } from "../../components/reservasList/ReservasList";
import './Reserva.css'

export const Reserva = () => {
    const {reservas} = useContext(ReservasContext); 

    return(
        <div class="reservas">
            {reservas.length !== 0 ? <ReservasList reservas={reservas}></ReservasList> : <LinearProgress color="secondary" />}
        </div>
    )
}