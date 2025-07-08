import { TextField } from "@mui/material";
import "./FiltroInput.css"


export const FiltrosInput = ({ parametros, modificarInput}) => {

    return (
        <>
            {parametros.map(parametro =>  <Input nombre={parametro.nombreParam} nombreLabel={parametro.nombreLabel} modificarInput={modificarInput} input={parametro.input} key={parametro.nombreParam}/>)}
        </>
    )
}

const Input = ({ nombre, modificarInput, input, nombreLabel }) => {
    return (
        <div key={nombre} className="input">
             <TextField
                label={nombreLabel}
                variant="outlined"
                onChange={(e) => modificarInput(e.target.value, nombre)}
                value={input}
                className="text-field-input"
            />
        </div>
    )
}