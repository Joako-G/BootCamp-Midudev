import { Route, Routes } from 'react-router'
import { lazy, Suspense } from 'react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const JobDetail = lazy(() => import('./pages/JobDetail.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))

export function App() {

  return (
    <>
      <Header />
      <Suspense fallback={<p>Cargando...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path='/jobs/:id' element={<JobDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}