
import { useEffect } from 'react'
import './App.css'
import {searchGame} from './service/gamesService'
import BaseLayout from './layout/BaseLayout'
import Header from './components/Header'
import GameDetailsPage from './pages/GameDetailsPage'
import {BrowserRouter,Routes,Route, redirect, Navigate} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Library from './pages/Library'
import LandingPage from './pages/LandingPage'
import { useUser } from '@clerk/clerk-react'
function App() {
  const { isSignedIn } = useUser();
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/games/:id' element = {<GameDetailsPage/>}/>
      <Route path='/' element = 
      {isSignedIn ?  <Navigate to="/1" />  :  <LandingPage/> }
       />
      <Route path='/:page' element = {<BaseLayout/>}/>
      <Route protected path='/library' element = {
          <ProtectedRoute>
            <Library/>
          </ProtectedRoute>
        }/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
