import { useEffect } from 'react'
import Modal from './Modal'
import useBebidas from '../hooks/useBebidas'

function Header() {
  const { favoritosArray } = useBebidas()

  const left = () => {
    if(favoritosArray.length > 9) {
      document.querySelector('.favoritos__texto').classList.add('left-145')
    }
    else {
      document.querySelector('.favoritos__texto').classList.remove('left-145')
    }
  }

  useEffect(() => {
    left()
  }, [favoritosArray])

  return (
    <header className='header'>
      <div className='header-contenido contenedor'>
        <h1 className='header__heading'>Buscador de Bebidas<span className='icono-bebida'>&#127865;</span></h1>
        <details className='favoritos'>
          <summary className='favoritos__texto'>{`Favoritos (${favoritosArray.length})`}</summary>
          <Modal/>
        </details>
      </div>
    </header>
  )
}

export default Header