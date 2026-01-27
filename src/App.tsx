import { Layout } from './components/layout/Layout'
import { Hero } from './features/hero/Hero'
import { Atmosphere } from './features/atmosphere/Atmosphere'
import { Teams } from './features/teams/Teams'
import { GlobalCanvas } from './components/layout/GlobalCanvas'

function App() {
  return (
    <Layout>
      <GlobalCanvas>
        <Hero />
        <Atmosphere />
        <Teams />
      </GlobalCanvas>
    </Layout>
  )
}

export default App
