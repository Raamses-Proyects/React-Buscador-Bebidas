import React from 'react'
import Header from './Header'
import Formulario from './Formulario'
import ListadoBebidas from './ListadoBebidas'
import useBebidas from '../hooks/useBebidas'
import RecetaBebidas from '../pages/RecetaBebidas'

function AppBebidas() {
  const { pagina } = useBebidas()
  return (
    <>
      <Header/>
      <Formulario/>
      <main className='contenedor mt-5'>
        <ListadoBebidas/>
        <>
          { pagina && <RecetaBebidas/> }
        </>
      </main>
    </>
  )
}

export default AppBebidas