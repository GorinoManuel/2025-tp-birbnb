import axios from "axios"

export const getAllReservasByIdusuario = async (idUsuario) => {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/usuarios/${idUsuario}/reservas`).then(r => r.data)
}

export const modificarReserva = async ({idReserva, cantHuespedes, fechaInicio, fechaFin}) => {
    return axios.put(`${process.env.REACT_APP_SERVER_URL}/reservas/${idReserva}`).then(r => r.data)
}

export const hacerReserva = async ({huespedReservador, alojamiento, fechaInicio, fechaFin, cantHuespedes}) => {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/reservas`, { huespedReservador: huespedReservador, alojamiento: alojamiento, fechaInicio: fechaInicio, fechaFin: fechaFin, cantHuespedes: parseInt(cantHuespedes)}).then(r => r.data)
}

export const cancelarReserva = async ({idReserva, motivo}) => {
    return axios.patch(`${process.env.REACT_APP_SERVER_URL}/reservas/${idReserva}`, {motivo: motivo }).then(r => r.data)
}