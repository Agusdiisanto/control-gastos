import { useState, useEffect } from "react"
import  {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import  'react-circular-progressbar/dist/styles.css'


const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValid}) => { 

    const [porcentaje , setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {

        
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado;

        // Calcular Porcentaje 
        const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto * 100).toFixed(2);
        
        setGastado(totalGastado) 
        setDisponible(totalDisponible)
        
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);


    },[gastos])

    const formatearDinero = (cantidad) => {
        return cantidad.toLocaleString('en-AR', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        
        const confirmacion = confirm('¿Deseas reiniciar presupuesto y gastos?')

        if(confirmacion){
            setGastos([])
            setPresupuesto(0)
            setIsValid(false)
        }

    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

        <div>
            <CircularProgressbar 
                value = {porcentaje}
                styles = {buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                })}
                text = {`${porcentaje}% Gastado`}
            
            />
        </div>

        <div className='contenido-presupuesto'>
            <button className="reset-app" type="button" onClick={handleResetApp}>
                Resetear App
            </button>

            <p>
                <span>Presupuesto: </span> {formatearDinero(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                <span>Disponible: </span> {formatearDinero(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearDinero(gastado)}
            </p>

        </div>
    </div>
  )
}

export default ControlPresupuesto