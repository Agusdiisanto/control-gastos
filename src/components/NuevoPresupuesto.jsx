import React from 'react'
import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValid}) => {

    // Validacion De Presupuesto

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();
        
        if(!presupuesto || presupuesto < 0){
            setMensaje('No Es Un Presupuesto Valido')
            return
        }
        setMensaje('')
        setIsValid(true)
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form onSubmit= {handlePresupuesto} className='formulario'>
                <div className='campo'>
                    <label>Definir Presupuesto</label>
                    <input type="number" 
                        className='nuevo-presupuesto'
                        placeholder='Añade tu presupuesto'
                        value={presupuesto}
                        onChange={e=> setPresupuesto(Number(e.target.value))}
                    />
                </div>
                <input type="submit" value="Añádir" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            </form>
        </div>
    )
}

export default NuevoPresupuesto