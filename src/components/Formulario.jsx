import { useState } from 'react'
import useBebidas from '../hooks/useBebidas'
import Alerta from './Alerta'

function Formulario() {
  // State Global
  const { categoriasArray, listaBebidas, setBebidaID, setPagina, setDetallesReceta } = useBebidas()

  // States Local
  const [busquedas, setBusquedas] = useState({categoria: ''})
  const [error, setError] = useState(false)

  // Funciones  
  const handleSubmit = (e) => {
    e.preventDefault()
    if( Object.values(busquedas).includes('') ) {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 3000);
        return
    }

    // Restableciendo error y consultando API
    setError(false)
    listaBebidas(busquedas)

    // Limpiando/reestableciendo datos de la pagina de receta
    setBebidaID('') // limpiando id del state
    setDetallesReceta({}) // Limpiando el objeto de receta buscado por id
    setPagina(false) // ya no se requiere ver la receta
  }
  
  return (
    <section className='contenedor mt-5'>
      <form className='formulario' onSubmit={ handleSubmit }>
          <div className='formulario__contenido'>
              {/* <div className='formulario__bloque'>
                  <label className='formulario__label' htmlFor="nombre">Nombre de bebida:</label>
                  <input className='formulario__input' 
                          id='nombre' name='nombre'
                          type="text" placeholder='Ej: Tequila, Vodka, etc.'
                          value={busquedas.nombre}
                          onChange={(e) => setBusquedas({
                          ...busquedas,
                          [e.target.name]: e.target.value
                          })} />
              </div> */}

              <div className='formulario__bloque'>
                  <label className='formulario__label' htmlFor="categoria">Categorías de bebidas:</label>
                  <select className='formulario__select' 
                          id="categoria" 
                          name="categoria"
                          value={busquedas.categoria}
                          onChange={(e) => setBusquedas({
                            ...busquedas,
                            [e.target.name]: e.target.value
                          })}
                          >
                      <option value="">--Seleccione la categoría--</option>
                      { categoriasArray.map((categoria) => (
                          <option
                              key={categoria.strCategory} 
                              value={categoria.strCategory}>{categoria.strCategory}</option>)
                      )}
                  </select>
              </div>
          </div>
          <input className='formulario__boton' type="submit" value="Buscar bebidas" />
      </form>
      { error ? <Alerta mensaje='Seleccione una categoría'/> : null }
  </section>
  )
}

export default Formulario