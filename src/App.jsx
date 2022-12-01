import AppBebidas from './components/AppBebidas'
import { BebidasProvider } from './context/BebidasProvider'

function App() {
  return (
    <BebidasProvider>
      <AppBebidas/>
    </BebidasProvider>
  )
}

export default App
