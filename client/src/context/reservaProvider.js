import {createContext, useEffect, useState} from "react";
import { getAllReservasByIdusuario } from "../api/reservasAPI";


export const ReservasContext = createContext()

export const ReservasProvider = ({children}) => {

  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const cargarReservas = async () => setReservas(await getAllReservasByIdusuario('682fe41a0754c921b38b2897')) //hardcodeado
    cargarReservas()
  }, [])

  const contextValue = {
    reservas,
    setReservas
  }



  return <ReservasContext value={contextValue}>
    {children}
  </ReservasContext>
}