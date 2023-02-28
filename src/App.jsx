import { useState , useEffect } from 'react'
import Header from './components/Header'
import FiltroCategoria from './components/FiltroCategoria';
import  IconoNueoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import {generarID} from './helpers'

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValid, setIsValid] = useState(false);
  const [modal,setModal] = useState(false);
  const [animarModal,setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {

    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
  
      setTimeout(() => {
        setAnimarModal(true)
      },300);
    }

  },[gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto',presupuesto ?? 0)
  },[presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  },[gastos])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  useEffect(() =>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0 ){
      setIsValid(true)
    }
  },[])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({}) 

    setTimeout(() => {
      setAnimarModal(true)
    },300);
  }

  const guardarGasto = gasto => {

    if(gasto.id){

      // Actualizo 
      const gastosActualizados = gastos.map(gastosState => gastosState.id === gasto.id ? gasto : gastosState)
      setGastos(gastosActualizados)
      setGastoEditar({})

    }else{

      // Nuevo Gasto

      gasto.id = generarID();
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setTimeout(() => {
      setModal(false)
    },400);

    setAnimarModal(false)

  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    setGastos(gastosActualizados)
    
  }

    return (
      <div className= {modal ? 'fijar' : ''}>
        <Header
          gastos = {gastos}
          setGastos = {setGastos}
          presupuesto={presupuesto} 
          setPresupuesto={setPresupuesto}
          isValid={isValid}
          setIsValid={setIsValid}
        />


        { isValid && (
          <>
            <main>

              <FiltroCategoria 

                filtro = {filtro}
                setFiltro={setFiltro}  
              /> <br />

              <ListadoGastos

                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto = {eliminarGasto}
                filtro = {filtro}
                gastosFiltrados = {gastosFiltrados}
    
              />
            </main>

            <div className='nuevo-gasto'>
                  <img src={IconoNueoGasto} alt= "Icono nuevo gasto" onClick = {handleNuevoGasto}/>
            </div>

          </>
        )}

        {
          modal && 
                <Modal
                setModal = {setModal}
                animarModal = {animarModal}
                setAnimarModal = {setAnimarModal}
                guardarGasto = {guardarGasto}
                gastoEditar = {gastoEditar}
                setGastoEditar = {setGastoEditar}
                />       
        }

      </div> 
    )
}

export default App
