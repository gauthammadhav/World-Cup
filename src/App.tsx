import { Layout } from './components/layout/Layout'
import { Hero } from './features/hero/Hero'
import { Atmosphere } from './features/atmosphere/Atmosphere'
import { GlobalCanvas } from './components/layout/GlobalCanvas'

function App() {
  return (
    <Layout>
      <GlobalCanvas>
        <Hero />
        <Atmosphere />
      </GlobalCanvas>
    </Layout>
  )
}

export default App
