import axios from "axios"
import qs from "qs"

export const getAlojamientosFiltrados = async (id_usuario, estaLeida) => {
    const filtrosTransformados = [{nombre: 'id_usuario', valor: id_usuario}, {nombre: 'leida', valor: estaLeida}].map(filtro => `params[${filtro.nombre}]=${filtro.valor}`).join("&")
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/notificaciones`, qs.parse(filtrosTransformados)).then(r => r.data)
}

export const marcarComoLeidaLaNotificacion = async (id_notificacion) => {
    return axios.patch(`${process.env.REACT_APP_SERVER_URL}/notificaciones/${id_notificacion}`).then(r => r.data)
}