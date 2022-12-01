import React from 'react'
import useBebidas from '../hooks/useBebidas'
import { sincronizarStorage } from '../helpers/sincronizarStorage'

function Modal() {
  const { favoritosArray, setFavoritosArray, verReceta } = useBebidas()

  // Funciones
  const irReceta = (id) => {
    verReceta(id)
  }
  const eliminar = (id) => {
    const arrayActualizado = favoritosArray.filter( (dato) => dato.id !== id )
    setFavoritosArray(arrayActualizado)
    sincronizarStorage('favoritos', favoritosArray)
  }

  return (
    <div className='lista-fav'>
        { favoritosArray?.length > 0 ? (
            favoritosArray?.map((datos) => {
                const { id, nombre } = datos
                return <div key={id} data-id={id} className='lista-fav__bloque'>
                <a 
                  className='lista-fav__titulo' 
                  title='Ver receta'
                  onClick={ () => irReceta(id) }
                  >{nombre}</a>
                <input 
                  className='lista-fav__button' 
                  type="button" 
                  title='Eliminar de favoritos' 
                  value="x"
                  onClick={ () => eliminar(id) }
                  />
            </div>
            }
        )
        ) : (       
            <p className='lista-fav__not'>No hay favoritos</p>
        ) }
    </div>
  )
}

export default Modal