import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({presupuesto, setPresupuesto , isValid, setIsValid, gastos, setGastos}) => {
  return (
    <header>
            <h1>Planificador De Gastos</h1>

            {isValid ? (
                
                <ControlPresupuesto
                    gastos = {gastos}
                    setGastos = {setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto = {setPresupuesto}
                    setIsValid={setIsValid}
                />

            ) :  

                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsValid={setIsValid}
                 />
            
            }
    </header>
  )
}

export default Header