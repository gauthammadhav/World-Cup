import { Layout } from './components/layout/Layout'
import { Hero } from './features/hero/Hero'
import { Atmosphere } from './features/atmosphere/Atmosphere'

function App() {
  return (
    <Layout>
      <Hero />
      <Atmosphere />
    </Layout>
  )
}

export default App
