import React from 'react'
import { useState , useEffect} from 'react'
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal , setAnimarModal, guardarGasto, gastoEditar , setGastoEditar}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id,setID] = useState('')

    useEffect(() => {

        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setID(gastoEditar.id)
            setFecha(gastoEditar.fecha) 
          }
    }, [])

    const ocultarModal = () => {

        setTimeout(() => {
            setModal(false)
          },300);

        setAnimarModal(false)
        setGastoEditar({})
    }

    const handleSubmit = e => {
        e.preventDefault()
        if([nombre,cantidad,categoria].includes('')){
            setMensaje('Todos Los Campos Son Obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 400);

            return
        }

        guardarGasto({nombre, cantidad, categoria,fecha, id})

    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img src={CerrarModal} alt="cerrar modal" 
                onClick={ocultarModal}
                />
            </div>

            <form 
                onSubmit= {handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
                <legend>{gastoEditar.nombre? "Editar Gasto" : "Nuevo Gasto"}</legend>
                {mensaje && <Mensaje tipo= "error">{mensaje}</Mensaje>}

                <div className='campo'>
                        <label htmlFor="nombre">Nombre Gasto</label>
                        <input type="text" placeholder='Añade el nombre del Gasto' 
                        id='nombre' value={nombre} onChange = {e => setNombre(e.target.value)}/>
                </div>


                <div className='campo'>
                        <label htmlFor="cantidad">Cantidad</label>
                        <input type="number" placeholder='Añade la cantidad del Gasto' 
                        id='cantidad' value={cantidad} onChange = {e => setCantidad(Number(e.target.value))}/>
                </div>

            
                <div className='campo'>
                        <label htmlFor="categoria">Categoria</label>

                        <select id="categoria"
                                value={categoria} onChange = {e => setCategoria((e.target.value))}>

                            <option value="" disabled>--Selecione--</option>
                            <option value="ahorro">Ahorro</option>
                            <option value="comida">Comida</option>
                            <option value="casa">Casa</option>
                            <option value="gastos">Gastos Varios</option>
                            <option value="hobbies">Hobbies</option>
                            <option value="salud">Salud</option>
                            <option value="suscripciones">Suscripciones</option>
                            

                        </select>
                </div>

                <input type="submit" value={gastoEditar.nombre? "Guardar Cambios" : "Añadir Gasto"} />
                
            </form>

        </div>
    )
}

export default Modal