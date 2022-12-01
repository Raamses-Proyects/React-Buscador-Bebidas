import { useState, useEffect, createContext } from 'react'
import { sincronizarStorage } from '../helpers/sincronizarStorage'

const BebidasContext = createContext()
const BebidasProvider = ({children}) => {
    
    // States
    const [categoriasArray, setCategoriasArray] = useState([])
    const [bebidasArray, setBebidasArray] = useState( JSON.parse(localStorage.getItem('bebidas')) || [] )
    const [bebidaID, setBebidaID] = useState('')
    const [detallesReceta, setDetallesReceta] = useState({})
    const [pagina, setPagina] = useState(false)
    const [favoritosArray, setFavoritosArray] = useState( JSON.parse(localStorage.getItem('favoritos')) || [] )
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState( localStorage.getItem('categoria') || '')

    
    // Categorias de bebidas (para el select)
    useEffect(() => {
        const categoriasAPI = async () => {
            try {
                const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
                const respuesta = await fetch(url)
                const categorias = await respuesta.json()
                setCategoriasArray(categorias.drinks)
            } catch (error) {
                console.error(error)
            }
        }
        categoriasAPI()
    }, [])

    // Obtener receta de bebida por id
    useEffect(() => {
        const detallesDeCoctelPorId = async () => {
            if(!bebidaID) return
            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaID}`
                const respuesta = await fetch(url)
                const detalles = await respuesta.json()
                setDetallesReceta(detalles.drinks[0])
            } catch (error) {
                console.error(error)
            }
        }
        detallesDeCoctelPorId()
    }, [bebidaID])

    // Funciones
    const listaBebidas = async (datos) => {
        // (Obtener datos que se muestran en el HTML principal)
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${datos.categoria}`
            const respuesta = await fetch(url)
            const bebidas = await respuesta.json()
            setBebidasArray(bebidas.drinks)
            sincronizarStorage('bebidas', bebidas.drinks)
            setCategoriaSeleccionada(datos.categoria)
            sincronizarStorage('categoria', datos.categoria)
          } catch (error) {
            console.error(error)
        }
    }
    
    const verReceta = (id) => {
        setBebidaID(id)
        setBebidasArray([]) // Limpiando lista de bebidas
        setPagina(true) // Se requiere ver receta
    }

    const agregarFavoritos = (id, nombre) => {
        // Creando objeto
        const objeto = { id, nombre }
    
        // Verificando no repetidos
        let existe = favoritosArray.some( (dato) => dato.id === id )
        if(!existe) {
          setFavoritosArray([...favoritosArray, objeto]) // agregando datos
        }
    }

    return(
        <BebidasContext.Provider value={{
            categoriasArray, 
            listaBebidas, 
            bebidasArray,
            setBebidasArray,
            setBebidaID,
            detallesReceta,
            setDetallesReceta,
            setPagina,
            pagina,
            setFavoritosArray,
            favoritosArray,
            verReceta,
            agregarFavoritos,
            categoriaSeleccionada }}>
            { children }
        </BebidasContext.Provider>
    )
}

export {
    BebidasContext,
    BebidasProvider
}