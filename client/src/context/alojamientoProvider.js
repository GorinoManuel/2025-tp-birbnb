import {createContext, useEffect, useState} from "react";
import { getAlojamientos } from "../api/alojamientosAPI";


export const AlojamientosContext = createContext()

export const AlojamientosProvider = ({children}) => {

  const [alojamientos, setAlojamientos] = useState([]);
  const [errorAlojamientos, setErrorAlojamientos] = useState(undefined)
  const parseFotos = (alojamiento) => {
    return alojamiento.fotos.length === 0 
    ? {...alojamiento, fotos: mockFotosAlojamiento()} 
    : alojamiento
  }

  const mockFotosAlojamiento = () => {
      return [{
        descripcion: "",
        path: ""
      }]
  }

  const parseIdYFotos = (alojamientos) => {
    let i = 0
    const alojamientosFront = alojamientos.map(alojamiento => {
      return {...alojamiento, idFront: ++i}
    }).map(alojamiento => {
      return parseFotos(alojamiento)
    })
    setAlojamientos(alojamientosFront)
  }

  const findAlojamientoById = (idAlojamiento) => {
    return alojamientos.find(alojamiento => alojamiento.id === idAlojamiento)
  }

  const cargaInicial = async () => {
    try {
      const alojamientos = await getAlojamientos()
      parseIdYFotos(alojamientos)
      setErrorAlojamientos(undefined)
    } catch (error) {
      setErrorAlojamientos(error.message)
      await new Promise((resolve) => { setTimeout(() => {}, 5000) })
    }
  } 

  useEffect(() => {
    const cargarAlojamientos = async () => cargaInicial()
    cargarAlojamientos()
  }, [])

  const contextValue = {
    alojamientos,
    setAlojamientos,
    findAlojamientoById,
    errorAlojamientos,
    setErrorAlojamientos,
    cargaInicial
  }



  return <AlojamientosContext value={contextValue}>
    {children}
  </AlojamientosContext>
}