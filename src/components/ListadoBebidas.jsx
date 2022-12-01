import React from 'react'
import useBebidas from '../hooks/useBebidas'
import BebidaCard from './BebidaCard'

function ListadoBebidas() {
  const { bebidasArray, categoriaSeleccionada, pagina } = useBebidas()

  const nombreCategoria = () => {
    if(bebidasArray.length) {
      return `${bebidasArray.length} results`
    }
    else {
      return 'Ingrese una categoría de bebidas para mostrar resultados'
    }
  }

  return (
    <>
    { !pagina ? <h1 className='bebidas__heading'>{`${categoriaSeleccionada.replace('"', '').replace('"', '')}`}<span className='bebidas__span'>{`${nombreCategoria()}`}</span></h1> : null }
      <div className='bebidas'>
        { bebidasArray.map((bebida) => (
            <BebidaCard
              key={bebida.idDrink}
              bebida={bebida}
            />
        )) }
    </div>
    </>
  )
}

export default ListadoBebidas