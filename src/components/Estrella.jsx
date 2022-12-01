import useBebidas from '../hooks/useBebidas'
import animacionStar from '../helpers/animacionStar'

function Estrella({idDrink, strDrink}) {
  const { agregarFavoritos } = useBebidas()
  return (
    <span 
        className='bebidas__estrella'
        title='Agregar a favoritos'
        onClick={ (e) => {
        agregarFavoritos(idDrink, strDrink)
        animacionStar(e)
    } }></span>
  )
}

export default Estrella