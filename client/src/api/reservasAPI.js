import axios from "axios"

const BACK_END_URL = 'http://localhost:4000'

export const getAllReservasByIdusuario = (idUsuario) => {
    return axios.get(`${BACK_END_URL}/usuarios/${idUsuario}/reservas`).then(r => r.data)
}

export const modificarReserva = ({idReserva, cantHuespedes, fechaInicio, fechaFin}) => {
    return axios.put(`${BACK_END_URL}/reservas/${idReserva}`).then(r => r.data)
}

export const hacerReserva = ({huespedReservador, alojamiento, fechaInicio, fechaFin, cantHuespedes}) => {
    return axios.post(`${BACK_END_URL}/reservas`, 'data : { idUsuario: idUsuario, idAlojamiento: idAlojamiento, fechaInicio: fechaInicio, fechaFin: fechaFin}').then(r => r.data)
}

export const cancelarReserva = ({idReserva, motivo}) => {
    return axios.patch(`${BACK_END_URL}/reservas/${idReserva}`).then(r => r.data)
}