import axios from "axios"
import qs from "qs"

export const getAlojamientos = async () => {
    return axios.get(`http://localhost:4000/alojamientos`).then(r => r.data.resultados)
}

export const getAlojamientosFiltrados = async (filtros) => {
    const filtrosTransformados = filtros ? filtros.map(filtro => `params[${filtro.nombre}]=${filtro.valor}`).join("&") : ''
    const datos = await axios.get(`http://localhost:4000/alojamientos`, qs.parse(filtrosTransformados)).then(r => r.data)
    return {alojamientos: datos.resultados, pagina: datos.pagina, limite: datos.limite, total: datos.total}
}