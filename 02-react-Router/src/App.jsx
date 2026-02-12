import { Header } from './components/Header'
import { HomePage } from "./pages/Home.jsx"
import { Footer } from './components/Footer'
import { SearchPage } from './pages/Search.jsx'
import { NotFoundPage } from './pages/404.jsx'
import { useRouter } from './hooks/useRouter.jsx'
import { Route } from './components/Route.jsx'

export function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="*" component={NotFoundPage} />
      <Footer />
    </>
  )
}