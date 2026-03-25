import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import PatternGenerator from './pages/PatternGenerator'
import Achievements from './pages/Achievements'
import StitchLibrary from './pages/StitchLibrary'
import Journal from './pages/Journal'
import EcoGuide from './pages/EcoGuide'
import SavedPatterns from './pages/SavedPatterns'
import ProtectedRoute from './components/ProtectedRoute'
import PatternDetail from './pages/PatternDetail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/eco-guide" element={<EcoGuide />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} /> 
        <Route path="/register" element={<Register />} />

        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>} /> 

        <Route path="/pattern-generator" element={
          <ProtectedRoute>
            <PatternGenerator />
          </ProtectedRoute>
          } /> 
        <Route path="/saved-patterns" element={
          <ProtectedRoute>
            <SavedPatterns />
          </ProtectedRoute>
        } /> 
        <Route path="/patterns/:id" element={<PatternDetail />} />

        <Route path="/stitch-library" element={
          <ProtectedRoute>
            <StitchLibrary />
          </ProtectedRoute>
        } /> 
        <Route path="/achievements" element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        } /> 
        <Route path="/journal" element={
          <ProtectedRoute>
            <Journal />
          </ProtectedRoute>
        } /> 
      </Routes>
    </MainLayout>
  )
}