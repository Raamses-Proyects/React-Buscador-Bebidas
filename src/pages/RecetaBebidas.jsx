import { useState, useEffect } from 'react'
import useBebidas from '../hooks/useBebidas'
import animacionStar from '../helpers/animacionStar'
import Estrella from '../components/Estrella'

function RecetaBebidas() {
  // State Global
  const { detallesReceta, setBebidasArray, setPagina, setDetallesReceta, setBebidaID, agregarFavoritos } = useBebidas()
  
  // State Local
  const [recetaArray, setRecetaArray] = useState([])

  // Funciones
  const reestablecerListado = (e) => {
    e.preventDefault()
    setBebidasArray( JSON.parse(localStorage.getItem('bebidas')) || [] )

    // Reiniciando los states para ver solo una receta individual, 
    // mostrar la ultima lista de bebidas buscada 
    setDetallesReceta({})
    setBebidaID('')
    setPagina(false)
  }

  const getReceta = (objeto) => {// filtrado objeto(detallesReceta), para mostrar ingredientes y cantidades
    let array = []
    for(let i = 1; i < 16; i++) {
      if( objeto[`strIngredient${i}`] !== null ) {
          let ingredientes = `${objeto[`strIngredient${i}`]} - ${objeto[`strMeasure${i}`]}`
          array = [ ...array, ingredientes ]
      }
    }
    return array
  }

  // Al dar click a Ver Reseta, se manda el idDrink a BebidasProvider y se llena detallesReceta
  useEffect(() => {
    if( Object.values(detallesReceta).length > 0 ) {
        setRecetaArray(getReceta(detallesReceta))
    }
  }, [detallesReceta])

  return (
    <>
      <div className='volver'>
          <a className='volver__enlace' href="#" onClick={ reestablecerListado }>⇦ Volver al listado</a>
      </div>

      <div className='receta'>
        <div className='receta-contenedor__imagen'>
          <img className='receta__imagen' src={detallesReceta['strDrinkThumb']} width='200' height='300' alt={`Imagen de ${detallesReceta['strDrink']}`} />
        </div>

        <div className='receta__contenido'>
          <h3 className='receta__titulo'>{detallesReceta['strDrink']}
             <Estrella
              idDrink={detallesReceta['idDrink']}
              strDrink={detallesReceta['strDrink']}
            />
          </h3>

          <h3 className='sub'>Instructions:</h3>
          <p className='receta__texto'>{detallesReceta['strInstructions']}</p>
          
          <h3 className='sub mt-2'>Ingredients and quantity:</h3>
          { recetaArray.map( (receta, i) => (
              <li key={i} className='receta__texto'>{receta}</li>
          )) }
        </div>
      </div>
    </>
  )
}

export default RecetaBebidas