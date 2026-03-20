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
import Mission from './pages/Mission'
import SavedPatterns from './pages/SavedPatterns'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/mission" element={<Mission />} /> 
        <Route path="/login" element={<Login />} /> 
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