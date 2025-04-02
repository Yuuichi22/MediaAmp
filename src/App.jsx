
import { useEffect } from 'react'
import './App.css'
import {searchGame} from './service/gamesService'
import BaseLayout from './layout/BaseLayout'
import Header from './components/Header'
import GameDetailsPage from './pages/GameDetailsPage'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  useEffect(() => {
  //  searchGame("Grand")
  },[])
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/games/:id' element = {<GameDetailsPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
