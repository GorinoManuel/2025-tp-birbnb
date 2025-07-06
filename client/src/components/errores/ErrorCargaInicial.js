import "./ErrorCargaInicial.css"


export const ErrorCargaInicial = ({nombreError, mensajeDeError}) => {

    return <div className="error-inicial">
            <h3 className="titulo-error-inicial" >Oh, se produjo un error!</h3>
            <p className="mensaje-error-inicial">{nombreError}: {mensajeDeError}</p>
            <img src={process.env.PUBLIC_URL + '/servidor_caido.svg'} alt="Imagen de se cayó el servidor" className="imagen-desconexion" />
    </div>
}