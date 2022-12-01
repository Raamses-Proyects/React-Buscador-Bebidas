import { useEffect } from 'react'
import useBebidas from '../hooks/useBebidas'
import { sincronizarStorage } from '../helpers/sincronizarStorage'
import Estrella from './Estrella'

function BebidaCard({bebida}) {
  // State Global
  const { favoritosArray, verReceta } = useBebidas()
 
  // Destructuring al prop
  const { idDrink, strDrink, strDrinkThumb } = bebida

  // Funciones
  const obtenerId = (e) => { // Se obtiene el id para usarlo en la API y traer la receta
    const id = e.target.parentElement.parentElement.getAttribute('data-id')
    verReceta(id) // Para ver solo la receta
  }

  // Sincronizando favoritos al storage
  useEffect(() => {
    sincronizarStorage('favoritos', favoritosArray)
  }, [favoritosArray])

  return (
    <div className='bebidas__card' data-id={idDrink}>
      <img className='bebidas__imagen' src={strDrinkThumb} loading='lazy' width='300' height='300' alt={`Imagen de ${strDrink}`} />
      <div className='bebidas__contenido'>
        <p className='bebidas__nombre'>{strDrink}
            <Estrella
              idDrink={idDrink}
              strDrink={strDrink}
            />
        </p>
        <input className='bebidas__boton' type="button" onClick={ obtenerId } value="Ver receta" />
      </div>
    </div>
  )
}

export default BebidaCard