import { Route, Routes } from 'react-router'
import { lazy, Suspense } from 'react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

const HomePage = lazy(() => import('./pages/Home.jsx'))
const LoginPage = lazy(() => import('./pages/Login.jsx'))
const RegisterPage = lazy(() => import('./pages/Register.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const JobDetail = lazy(() => import('./pages/JobDetail.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))
const ProfilePage = lazy(() => import('./pages/Profile.jsx'))


export function App() {

  return (
    <>
      <Header />
      <Suspense fallback={<p>Cargando...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path='/jobs/:id' element={<JobDetail />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}