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

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/mission" element={<Mission />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/account" element={<Account />} /> 
        <Route path="/pattern-generator" element={<PatternGenerator />} /> 
        <Route path="/saved-patterns" element={<SavedPatterns />} /> 
        <Route path="/stitch-library" element={<StitchLibrary />} /> 
        <Route path="/achievements" element={<Achievements />} /> 
        <Route path="/journal" element={<Journal />} /> 
      </Routes>
    </MainLayout>
  )
}