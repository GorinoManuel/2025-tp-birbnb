import axios from "axios"

export const getAllReservasByIdusuario = async (idUsuario) => {
    return axios.get(`http://localhost:4000/usuarios/${idUsuario}/reservas`).then(r => r.data)
}

export const modificarReserva = async ({idReserva, cantHuespedes, fechaInicio, fechaFin}) => {
    return axios.put(`http://localhost:4000/reservas/${idReserva}`).then(r => r.data)
}

export const hacerReserva = async ({huespedReservador, alojamiento, fechaInicio, fechaFin, cantHuespedes}) => {
    return axios.post(`http://localhost:4000/reservas`, {data : { idUsuario: huespedReservador, idAlojamiento: alojamiento, fechaInicio: fechaInicio, fechaFin: fechaFin, cantHuespedes: cantHuespedes}}).then(r => r.data)
}

export const cancelarReserva = async ({idReserva, motivo}) => {
    return axios.patch(`http://localhost:4000/reservas/${idReserva}`, {data: {motivo: motivo} }).then(r => r.data)
}